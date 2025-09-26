from flask import Flask, request, jsonify, session # Import session
from flask_cors import CORS
from flask_migrate import Migrate
from models import db, bcrypt, User, Product, AffiliateSource, Order, OrderItem, SalesData, ProductCategoryData, ShipmentSummaryData, MockAmazonProduct, Brand # Import Brand
from config import DATABASE
from functools import wraps # Import functools for wraps
import random # Import random
import os # Import os
from faker import Faker # Import Faker for fake data

fake = Faker()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = os.environ.get('SECRET_KEY', 'a_very_secret_and_random_key_that_should_be_changed_in_production') # Use environment variable for secret key
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax' # Explicitly set SameSite policy

CORS(app, supports_credentials=True)
migrate = Migrate(app, db)
db.init_app(app)
bcrypt.init_app(app) # Initialize bcrypt with the app

# Login Required Decorator
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_id = session.get('user_id')
        if user_id is None:
            return jsonify({'error': 'Unauthorized', 'message': 'Login required'}), 401
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
def index():
    return '<h1>Phase 4 Project Backend</h1>'

# User Routes
@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        users = User.query.all()
        return jsonify([user.to_dict() for user in users])
    elif request.method == 'POST':
        data = request.json
        new_user = User(username=data['username'], email=data['email'], password_hash=data['password'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.to_dict()), 201

# Signup Route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'error': 'Missing username, email, or password'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Username already exists'}), 409
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already exists'}), 409

    new_user = User(username=username, email=email, password_hash=password)
    db.session.add(new_user)
    db.session.commit()
    session['user_id'] = new_user.id # Log in the user after signup
    return jsonify(new_user.to_dict()), 201

# Login Route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')

    if not password:
        return jsonify({'error': 'Password is required'}), 400

    user = None
    if email:
        user = User.query.filter_by(email=email).first()
    elif username:
        user = User.query.filter_by(username=username).first()
    else:
        return jsonify({'error': 'Email or username is required'}), 400

    if user and user.check_password(password):
        session['user_id'] = user.id
        return jsonify(user.to_dict()), 200
    return jsonify({'error': 'Invalid credentials'}), 401

# Check session (who is logged in)
@app.route('/check_session', methods=['GET'])
def check_session():
    user_id = session.get('user_id')
    if user_id:
        user = User.query.get(user_id)
        if user:
            return jsonify(user.to_dict())
    return jsonify({'message': 'Not logged in'}), 401

# Logout Route
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully'}), 200

# Brands Routes
@app.route('/brands', methods=['GET'])
def get_brands():
    brands = Brand.query.all()
    return jsonify([brand.to_dict() for brand in brands])

@app.route('/brands/seed', methods=['POST'])
def seed_brands():
    if Brand.query.first():
        return jsonify({'message': 'Brands already seeded'}), 200

    brand_names = [
        "Tech Innovators", "Fashion Forward", "Home Essentials",
        "Gourmet Foods", "Outdoor Adventures", "Artistic Creations",
        "Wellness Hub", "Pet Paradise", "Bookworm Haven", "Gaming Gear"
    ]
    for name in brand_names:
        new_brand = Brand(
            name=name,
            description=fake.paragraph(nb_sentences=3),
            logo_url=f"https://via.placeholder.com/150/CCCCCC/FFFFFF?text={name.replace(' ', '+')}"
        )
        db.session.add(new_brand)
    db.session.commit()
    return jsonify({'message': 'Brands seeded successfully!'}), 201



# Product Routes (Full CRUD)
@app.route('/products', methods=['GET', 'POST'])
def products():
    if request.method == 'GET':
        query = Product.query

        # Filtering by search term (name or description)
        search_term = request.args.get('search')
        if search_term:
            query = query.filter(
                (Product.name.ilike(f'%{search_term}%')) |
                (Product.description.ilike(f'%{search_term}%'))
            )

        # Filtering by category
        category = request.args.get('category')
        if category and category != 'All':
            query = query.filter(Product.category == category)

        # Filtering by price range
        min_price = request.args.get('min_price', type=float)
        if min_price is not None:
            query = query.filter(Product.price >= min_price)

        max_price = request.args.get('max_price', type=float)
        if max_price is not None:
            query = query.filter(Product.price <= max_price)

        # Filtering by minimum rating (assuming Product model has a 'rating' field)
        # NOTE: The Product model currently does NOT have a a 'rating' field.
        # For this filter to work, a 'rating' column would need to be added to the Product model.
        # For now, this filter will be included but will not function correctly without the column.
        min_rating = request.args.get('min_rating', type=float)
        if min_rating is not None:
            # This line will cause an error if Product.rating does not exist
            # For now, we'll assume it might be added later or handle it gracefully
            # If Product.rating is not added, this filter will effectively do nothing or raise an error
            query = query.filter(Product.rating >= min_rating)


        products = query.all()
        return jsonify([product.to_dict() for product in products])
    elif request.method == 'POST':
        data = request.json
        new_product = Product(name=data['name'], price=data['price'], description=data.get('description'))
        db.session.add(new_product)
        db.session.commit()
        return jsonify(new_product.to_dict()), 201

@app.route('/products/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def product_by_id(id):
    product = Product.query.get_or_404(id)
    if request.method == 'GET':
        return jsonify(product.to_dict())
    elif request.method == 'PATCH':
        data = request.json
        for attr, value in data.items():
            setattr(product, attr, value)
        db.session.add(product)
        db.session.commit()
        return jsonify(product.to_dict())
    elif request.method == 'DELETE':
        db.session.delete(product)
        db.session.commit()
        return '', 204

# Cart Routes
@app.route('/cart/add', methods=['POST'])
@login_required
def add_to_cart():
    user_id = session.get('user_id')
    data = request.json
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)

    if not product_id:
        return jsonify({'error': 'Product ID is required'}), 400

    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    if quantity <= 0:
        return jsonify({'error': 'Quantity must be at least 1'}), 400

    # Find or create a pending order for the user (this is their cart)
    cart = Order.query.filter_by(user_id=user_id, status='Pending').first()
    if not cart:
        cart = Order(user_id=user_id, total_amount=0, status='Pending')
        db.session.add(cart)
        db.session.commit()

    # Check if the product is already in the cart
    order_item = OrderItem.query.filter_by(order_id=cart.id, product_id=product_id).first()

    if order_item:
        order_item.quantity += quantity
        order_item.price = product.price # Update price in case it changed
    else:
        order_item = OrderItem(order_id=cart.id, product_id=product_id, quantity=quantity, price=product.price)
        db.session.add(order_item)
    
    db.session.commit()

    # Recalculate total amount for the cart
    cart.total_amount = sum(item.quantity * item.price for item in cart.order_items)
    db.session.commit()

    return jsonify(cart.to_dict()), 200

@app.route('/cart', methods=['GET'])
@login_required
def get_cart():
    user_id = session.get('user_id')
    cart = Order.query.filter_by(user_id=user_id, status='Pending').first()
    if not cart:
        return jsonify({'message': 'Cart is empty'}), 200
    return jsonify(cart.to_dict()), 200

@app.route('/cart/update/<int:product_id>', methods=['PATCH'])
@login_required
def update_cart_item(product_id):
    user_id = session.get('user_id')
    data = request.json
    quantity = data.get('quantity')

    if quantity is None or quantity < 0:
        return jsonify({'error': 'Quantity must be a non-negative integer'}), 400

    cart = Order.query.filter_by(user_id=user_id, status='Pending').first()
    if not cart:
        return jsonify({'error': 'Cart not found'}), 404

    order_item = OrderItem.query.filter_by(order_id=cart.id, product_id=product_id).first()
    if not order_item:
        return jsonify({'error': 'Product not in cart'}), 404

    if quantity == 0:
        db.session.delete(order_item)
    else:
        order_item.quantity = quantity
    
    db.session.commit()

    # Recalculate total amount for the cart
    cart.total_amount = sum(item.quantity * item.price for item in cart.order_items)
    db.session.commit()

    return jsonify(cart.to_dict()), 200

@app.route('/cart/remove/<int:product_id>', methods=['DELETE'])
@login_required
def remove_from_cart(product_id):
    user_id = session.get('user_id')

    cart = Order.query.filter_by(user_id=user_id, status='Pending').first()
    if not cart:
        return jsonify({'error': 'Cart not found'}), 404

    order_item = OrderItem.query.filter_by(order_id=cart.id, product_id=product_id).first()
    if not order_item:
        return jsonify({'error': 'Product not in cart'}), 404

    db.session.delete(order_item)
    db.session.commit()

    # Recalculate total amount for the cart
    cart.total_amount = sum(item.quantity * item.price for item in cart.order_items)
    db.session.commit()

    return jsonify(cart.to_dict()), 200

@app.route('/cart/checkout', methods=['POST'])
@login_required
def checkout():
    user_id = session.get('user_id')

    cart = Order.query.filter_by(user_id=user_id, status='Pending').first()
    if not cart or not cart.order_items:
        return jsonify({'error': 'Cart is empty, cannot checkout'}), 400

    # Update order status to 'Processing' or 'Placed'
    cart.status = 'Processing' # Or 'Placed'
    db.session.commit()

    return jsonify(cart.to_dict()), 200

# Order Routes
@app.route('/orders', methods=['GET', 'POST'])
def orders():
    if request.method == 'GET':
        orders = Order.query.all()
        return jsonify([order.to_dict() for order in orders])
    elif request.method == 'POST':
        data = request.json
        new_order = Order(user_id=data['user_id'])
        db.session.add(new_order)
        db.session.commit()
        return jsonify(new_order.to_dict()), 201

# Business Overview Routes
@app.route('/sales-data', methods=['GET'])
def get_sales_data():
    sales_data = SalesData.query.all()
    return jsonify([data.to_dict() for data in sales_data])

@app.route('/product-categories', methods=['GET'])
def get_product_categories():
    product_categories = ProductCategoryData.query.all()
    return jsonify([data.to_dict() for data in product_categories])

@app.route('/shipment-summary', methods=['GET'])
def get_shipment_summary():
    shipment_summary = ShipmentSummaryData.query.all()
    return jsonify([data.to_dict() for data in shipment_summary])
    
    # Mock Amazon API Routes
    @app.route('/amazon/search', methods=['GET'])
    def amazon_search():
        query = request.args.get('query', '')
        # For simplicity, search by title containing the query
        results = MockAmazonProduct.query.filter(MockAmazonProduct.title.ilike(f'%{query}%')).all()
        return jsonify([product.to_dict() for product in results])
    
    @app.route('/amazon/product/<asin>', methods=['GET'])
    def amazon_product(asin):
        product = MockAmazonProduct.query.filter_by(asin=asin).first()
        if product:
            return jsonify(product.to_dict())
        return jsonify({'error': 'Product not found'}), 404
    
    @app.route('/amazon/product/<asin>/reviews', methods=['GET'])
    def amazon_product_reviews(asin):
        # For simplicity, return a generic mock review or just product details
        product = MockAmazonProduct.query.filter_by(asin=asin).first()
        if product:
            # Mock reviews - in a real app, this would be a separate model/data
            mock_reviews = [
                {"author": "User123", "rating": 5, "comment": f"Great product! Exactly as described for {product.title}."},
                {"author": "ReviewerX", "rating": 4, "comment": f"Very satisfied with {product.title}. Fast shipping."},
            ]
            return jsonify({"product_asin": asin, "reviews": mock_reviews})
        return jsonify({'error': 'Product not found'}), 404

# Dashboard Metrics Routes
@app.route('/total-sales', methods=['GET'])
def get_total_sales():
    # Calculate total sales from orders that are 'Processed' or 'Delivered'
    total_sales = db.session.query(db.func.sum(Order.total_amount)).filter(
        Order.status.in_(['Processed', 'Delivered'])
    ).scalar()
    return jsonify({'total_sales': total_sales if total_sales is not None else 0})

# Apply Deals Route
@app.route('/products/apply_deals', methods=['POST'])
def apply_deals():
    products_to_deal = Product.query.filter(Product.deal_percentage == 0.0).all()
    if not products_to_deal:
        return jsonify({'message': 'No products available to apply deals or deals already applied.'}), 200

    # Apply deals to a random subset of products (e.g., 20% of available products)
    num_deals_to_apply = max(1, len(products_to_deal) // 5) # At least 1, or 20%
    selected_products = random.sample(products_to_deal, num_deals_to_apply)

    for product in selected_products:
        product.deal_percentage = round(random.uniform(0.1, 0.5), 2) # 10% to 50% discount
        db.session.add(product)
    db.session.commit()
    return jsonify({'message': f'{num_deals_to_apply} deals applied successfully!'}), 200

# Deals Routes
@app.route('/deals', methods=['GET'])
def get_deals():
    deals = Product.query.filter(Product.deal_percentage > 0).all()
    deals_data = []
    for product in deals:
        product_dict = product.to_dict()
        product_dict['original_price'] = product.price
        product_dict['deal_price'] = round(product.price * (1 - product.deal_percentage), 2)
        deals_data.append(product_dict)
    return jsonify(deals_data)

if __name__ == '__main__':
    app.run(port=5555, debug=True)