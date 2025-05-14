from flask import Blueprint, request, jsonify
from controllers.carts_controller import get_cart_products, add_product_to_cart, substract_product_from_cart, delete_product_from_cart
from flask_jwt_extended import jwt_required

carts_bp = Blueprint('carts', __name__)

# Funcion que recupera todos los prouctos del carrito
@carts_bp.route("/<string:username>", methods=["GET"])
@jwt_required()
def get_cart(username):

    try:
        products = get_cart_products(username)
        return jsonify(products), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Añadido de un producto al carrito o sumarlo
@carts_bp.route("/add", methods=["POST"])
@jwt_required()
def add_product():

    # Recogida de datos del cuerpo
    data = request.get_json()
    product_name = data.get("product_name")
    username = data.get("username")
    add = data.get("add", False) # False por defecto si no se especifica

    if not product_name or not username:
        return jsonify({"error": "Datos incompletos"}), 400

    try:
        add_product_to_cart(username, product_name, add)
        return jsonify({"message": "Producto agregado"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Resta de un producto del carrito
@carts_bp.route("/substract", methods=["POST"])
@jwt_required()
def substract_product():

    # Recogida de datos del cuerpo
    data = request.get_json()
    product_name = data.get("product_name")
    username = data.get("username")

    if not product_name or not username:
        return jsonify({"error": "Datos incompletos"}), 400

    try:
        substract_product_from_cart(username, product_name)
        return jsonify({"message": "Producto actualizado"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@carts_bp.route("/delete", methods=["POST"])
@jwt_required()
def delete_product():

    # Recogida de datos del cuerpo
    data = request.get_json()
    product_name = data.get("product_name")
    username = data.get("username")

    if not product_name or not username:
        return jsonify({"error": "Datos incompletos"}), 400

    try:
        delete_product_from_cart(username, product_name)
        return jsonify({"message": "Producto eliminado"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500