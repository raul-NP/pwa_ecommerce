from flask import Flask, jsonify
from flask_cors import CORS
from routes.users_route import users_bp
from routes.categories_routes import categories_bp
from routes.products_routes import products_bp
from routes.carts_routes import carts_bp
from routes.orders_routes import orders_bp
from flask_jwt_extended import JWTManager
from datetime import timedelta
import os

app = Flask(__name__)

# Cors pruebas
CORS(app, resources={r"/*": {"origins": "*"}})
# Cors producción
# CORS(app, resources={r"/*": {"origins": ["http://localhost:5174", "http://10.120.5.142:5174"]}})

# JWT tokens
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=3)
jwt = JWTManager(app)

# Blueprint de usuarios del ecommerce
app.register_blueprint(users_bp, url_prefix = "/users")

# Blueprint de las categorias del ecommerce
app.register_blueprint(categories_bp, url_prefix = "/categories")

# Blueprint de los productos del ecommerce
app.register_blueprint(products_bp, url_prefix = "/products")

# Blueprint de los carritos de usuario del ecommerce
app.register_blueprint(carts_bp, url_prefix = "/carts")

# Blueprint de los pedidos
app.register_blueprint(orders_bp, url_prefix="/orders")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')