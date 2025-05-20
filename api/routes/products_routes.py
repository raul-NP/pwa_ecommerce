from flask import Blueprint, jsonify, request
from controllers.products_controller import get_all, get_by_category, assign_product_to_category, remove_product_from_category, create_product, update_product, delete_product
# from controllers.products_controller import get_all
from flask_jwt_extended import jwt_required

products_bp = Blueprint('products', __name__)

# Recuperar todos los productos
@products_bp.route("", methods=["GET"])
@products_bp.route("/", methods=["GET"])
@jwt_required()  
def get_products():

    # Conseguir todas las categorias
    products = get_all()

    return jsonify(products), 200

# Recuperar los productos de una categoria en concreto
@products_bp.route("/<string:category_name>", methods=["GET"])
@jwt_required()  
def get_category_products(category_name):

    # Conseguir todas las categorias
    products = get_by_category(category_name)

    return jsonify(products), 200

# Verificar si un producto pertenece a una categoría
@products_bp.route("/<string:category_name>/check/<int:id_product>", methods=["GET"])
@jwt_required()
def check_product_in_category(category_name, id_product):
    
    # Obtenemos los productos de la categoría
    products = get_by_category(category_name)

    # Buscar si el producto existe
    exists = any(p["id"] == id_product for p in products)

    return jsonify({
        "category": category_name,
        "id_product": id_product,
        "exists": exists
    }), 200

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

# Crear producto
@products_bp.route("/", methods=["POST"])
@jwt_required()
def create():
    data = request.get_json()
    result, status = create_product(data)
    return jsonify(result), status

# Actualizar producto
@products_bp.route("/<int:id_product>", methods=["PUT"])
@jwt_required()
def update(id_product):
    data = request.get_json()
    result, status = update_product(id_product, data)
    return jsonify(result), status

# Eliminar producto
@products_bp.route("/<int:id_product>", methods=["DELETE"])
@jwt_required()
def delete(id_product):
    result, status = delete_product(id_product)
    return jsonify(result), status