from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    _password_hash = db.Column(db.String(128), nullable=False)

    orders = db.relationship('Order', backref='user', lazy=True)

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

class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(255))
    stock = db.Column(db.Integer, nullable=False, default=0)
    image_url = db.Column(db.String)
    category = db.Column(db.String)

    order_items = db.relationship('OrderItem', backref='product', lazy=True)

    serialize_rules = ('-order_items.product',)

    def __repr__(self):
        return f'<Product {self.name}>'

class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    order_date = db.Column(db.DateTime, server_default=db.func.now())
    status = db.Column(db.String(50), default='Pending', nullable=False)
    total_amount = db.Column(db.Float, nullable=False, default=0.0)

    order_items = db.relationship('OrderItem', backref='order', lazy=True, cascade='all, delete-orphan')

    serialize_rules = ('-order_items.order', '-user.orders',)

    def __repr__(self):
        return f'<Order {self.id} - {self.status}>'

class OrderItem(db.Model, SerializerMixin):
    __tablename__ = 'order_items'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False) # Price at the time of order

    serialize_rules = ('-order.order_items', '-product.order_items',)

    def __repr__(self):
        return f'<OrderItem Order:{self.order_id} Product:{self.product_id} Quantity:{self.quantity}>'
