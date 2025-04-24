from flask import Flask, jsonify
from flask_cors import CORS
from routes.user_route import user_bp
from flask_jwt_extended import JWTManager
import os

app = Flask(__name__)

# Cors pruebas
CORS(app, resources={r"/*": {"origins": "*"}})
# Cors producción
# CORS(app, resources={r"/*": {"origins": ["http://localhost:5174", "http://10.120.5.142:5174"]}})

# JWT tokens
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
jwt = JWTManager(app)

# Blueprint de usuarios del ecommerce
app.register_blueprint(user_bp, url_prefix = "/users")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')