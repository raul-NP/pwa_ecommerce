from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from controllers.categories_controller import get_all, create_category, update_category, delete_category

categories_bp = Blueprint('categories', __name__)

# Recuperar todas las categorias
@categories_bp.route("/", methods=["GET"])
@jwt_required()  
def get_categories():

    # Conseguir todas las categorias
    categories = get_all()

    return jsonify(categories), 200

# Funcion para crear una categoria
@categories_bp.route("/", methods=["POST"])
@jwt_required()
def create_category_route():
    data = request.get_json()

    # Creamos la categoria
    result = create_category(data.get("name"))

    if result:
        return (jsonify({"message": "Created"}), 200)  
    # Caso de error
    else:
        return (jsonify({"message": "Error"}), 400)
        
# Funcion para actualizar una categoria
@categories_bp.route("/", methods=["PUT"])
@jwt_required()
def update_category_route():
    data = request.get_json()
    
    # Actualizamos la categoria
    result = update_category(data.get("name"), data.get("new_name"))

    if result:
        return (jsonify({"message": "Updated"}), 200)  
    # Caso de error
    else:
        return (jsonify({"message": "Error"}), 400)

# Funcion para borrar una categoria
@categories_bp.route("/<string:name>", methods=["DELETE"])
@jwt_required()
def delete_category_route(name):

    # Borramos la categoria
    result = delete_category(name)
    
    if result:
        return (jsonify({"message": "Deleted"}), 200)  
    # Caso de error
    else:
        return (jsonify({"message": "Error"}), 400)