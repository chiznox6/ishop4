from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from flask_bcrypt import Bcrypt
from sqlalchemy.ext.associationproxy import association_proxy

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    _password_hash = db.Column(db.String(128), nullable=False)

    orders = db.relationship('Order', backref='user', lazy=True, cascade='all, delete-orphan')

    serialize_rules = ('-orders.user', '-_password_hash')

    def __repr__(self):
        return f'<User {self.username}>'

    @property
    def password_hash(self):
        raise AttributeError('password hash is not readable')

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

class AffiliateSource(db.Model, SerializerMixin):
    __tablename__ = 'affiliate_sources'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    base_url = db.Column(db.String(255), nullable=False) # Base URL for the affiliate platform

    products = db.relationship('Product', backref='affiliate_source', lazy=True)

    serialize_rules = ('-products.affiliate_source',)

    def __repr__(self):
        return f'<AffiliateSource {self.name}>'

class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(255))
    image_url = db.Column(db.String)
    category = db.Column(db.String)
    rating = db.Column(db.Float, nullable=True) # Added rating column
    stock = db.Column(db.Integer, nullable=False, default=0) # Added stock column
    affiliate_link = db.Column(db.String(500), nullable=False) # The actual affiliate link for the product
    affiliate_source_id = db.Column(db.Integer, db.ForeignKey('affiliate_sources.id'), nullable=False)
    deal_percentage = db.Column(db.Float, default=0.0) # New column for deals

    order_items = db.relationship('OrderItem', backref='product', lazy=True)

    serialize_rules = ('-order_items.product', '-affiliate_source.products')

    def __repr__(self):
        return f'<Product {self.name}>'

class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    total_amount = db.Column(db.Float, nullable=False, default=0.0)
    status = db.Column(db.String(50), nullable=False, default='Pending') # e.g., Pending, Placed, Shipped, Delivered

    order_items = db.relationship('OrderItem', backref='order', lazy=True, cascade='all, delete-orphan')

    serialize_rules = ('-user.orders', '-order_items.order')

    def __repr__(self):
        return f'<Order {self.id} - User:{self.user_id} - Status:{self.status}>'

class OrderItem(db.Model, SerializerMixin):
    __tablename__ = 'order_items'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    price = db.Column(db.Float, nullable=False) # Price at the time of adding to order

    serialize_rules = ('-order.order_items', '-product.order_items')

    def __repr__(self):
        return f'<OrderItem Order:{self.order_id} Product:{self.product_id} Quantity:{self.quantity}>'

class SalesData(db.Model, SerializerMixin):
    __tablename__ = 'sales_data'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'<SalesData {self.date}: {self.amount}>'

class ProductCategoryData(db.Model, SerializerMixin):
    __tablename__ = 'product_category_data'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    product_count = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<ProductCategoryData {self.name}: {self.product_count}>'

class ShipmentSummaryData(db.Model, SerializerMixin):
    __tablename__ = 'shipment_summary_data'

    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(100), nullable=False)
    value = db.Column(db.String(50), nullable=False)
    change = db.Column(db.String(100), nullable=False)
    color = db.Column(db.String(50), nullable=False)
    icon = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'<ShipmentSummaryData {self.label}: {self.value}>'

class MockAmazonProduct(db.Model, SerializerMixin):
    __tablename__ = 'mock_amazon_products'

    id = db.Column(db.Integer, primary_key=True)
    asin = db.Column(db.String(20), unique=True, nullable=False)
    title = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(500))
    price = db.Column(db.Float)
    rating = db.Column(db.Float)
    review_count = db.Column(db.Integer)
    description = db.Column(db.Text)
    category = db.Column(db.String(100))

    serialize_rules = () # No special serialization rules for now

    def __repr__(self):
        return f'<MockAmazonProduct {self.title} ({self.asin})>'

class Brand(db.Model, SerializerMixin):
    __tablename__ = 'brands'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.Text)
    logo_url = db.Column(db.String(500))

    serialize_rules = ()
