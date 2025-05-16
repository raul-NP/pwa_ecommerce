from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from controllers.orders_controller import create_order, get_orders_by_user

orders_bp = Blueprint('orders', __name__)

# Función que crea un pedido
@orders_bp.route("/create", methods=["POST"])
@jwt_required()
def create():

    # Campos del body
    data = request.get_json()
    address = data.get("address")
    date = data.get("date")
    total = data.get("total")
    username = data.get("username")

    if not all([address, date, total, username]):
        return jsonify({"message": "Missing fields"}), 400

    return create_order(address, date, total, username)

# Función que recoge los pedidos del usuario
@orders_bp.route("/<string:username>", methods=["GET"])
@jwt_required()
def get_orders(username):
    return get_orders_by_user(username)