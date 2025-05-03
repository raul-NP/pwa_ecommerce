from flask import Blueprint, jsonify
from controllers.categories_controller import get_all
from flask_jwt_extended import jwt_required

categories_bp = Blueprint('categories', __name__)

# Recuperar todas las categorias
@categories_bp.route("/", methods=["GET"])
@jwt_required()  
def get_categories():

    # Conseguir todas las categorias
    categories = get_all()

    return jsonify(categories), 200