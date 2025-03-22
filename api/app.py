from flask import Flask, jsonify
from flask_cors import CORS
from routes.user_route import user_bp

app = Flask(__name__)
CORS(app)

# Blueprint de usuarios del ecommerce
app.register_blueprint(user_bp, url_prefix = "/api/users")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')