from flask import Blueprint, jsonify, request
from controllers.products_controller import get_all, get_by_category, assign_product_to_category, remove_product_from_category
from flask_jwt_extended import jwt_required

products_bp = Blueprint('products', __name__)

# Recuperar todos los productos
# @products_bp.route("/", methods=["GET"])
# @jwt_required()  
# def get_products():

#     # Conseguir todas las categorias
#     products = get_all()

#     return jsonify(products), 200

# Recuperar los productos de una categoria en concreto
@products_bp.route("/<string:category_name>", methods=["GET"])
@jwt_required()  
def get_category_products(category_name):

    # Conseguir todas las categorias
    products = get_by_category(category_name)

    return jsonify(products), 200

# Asignamos un producto a una categoría
@products_bp.route("/<string:category_name>", methods=["POST"])
@jwt_required()
def assign_product(category_name):

    # Obtenemos los datos del cuerpo
    data = request.get_json()
    id_product = data.get("id_product")

    # En caso de no haber datos en el cuerpo
    if not id_product:
        return jsonify({"message": "id_product are required"}), 400

    result, status = assign_product_to_category(id_product, category_name)
    return jsonify(result), status

# Desasignamos un producto de una categoria
@products_bp.route("/<string:category_name>", methods=["DELETE"])
@jwt_required()
def unassign_product(category_name):

    # Obtenemos los datos del cuerpo
    data = request.get_json()
    id_product = data.get("id_product")

    # En caso de no haber datos en el cuerpo
    if not id_product:
        return jsonify({"message": "id_product are required"}), 400

    result, status = remove_product_from_category(id_product, category_name)
    return jsonify(result), status