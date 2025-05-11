from flask import Blueprint, request, jsonify
from controllers.users_controller import show_all, insert_user, find_user_by_name, update_user_by_name
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import re

users_bp = Blueprint('users', __name__)

# Listar todas las personas
# @user_bp.route("/", methods=['GET'])
# @jwt_required()
# def get_users():
#     return show_all()

# Listar una persona por nombre
# @user_bp.route("/<string:name>", methods=['GET'])
# def get_user(name):

#     # Buscamos el usuario
#     user = find_user_by_name(name)

#     if not user:
#         return jsonify({"error": "Usuario no encontrado"}), 404

#     return jsonify(user), 200

# Recuperar usuario actual loggeado
@users_bp.route("/me", methods=["GET"])
@jwt_required()  
def get_current_user():

    # Obtenemos la identidad  desde el token
    current_user_name = get_jwt_identity()

    # Buscar el usuario por su nombre
    user = find_user_by_name(current_user_name)

    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    return jsonify(user), 200

# Insertar usuarios
@users_bp.route("/", methods = ['POST'])
def post():

    # Datos provinientes del body
    data = request.get_json()
    name = data.get("name")
    password = data.get("password")
    rol = data.get("rol", "user")
    points = data.get("points", 0)

    if not name or not password:
        return jsonify({"error": "Campos obligatorios faltantes"}), 500

    if find_user_by_name(name):
        return jsonify({"error": "El usuario ya existe"}), 409

    if not re.fullmatch(r"[A-Za-z ]+", name):
        return jsonify({"error": "El nombre solo puede contener letras"}), 400

    insert_user(name, password, rol, points)
    return jsonify({"message": "Usuario registrado correctamente"}), 200 

# Modificar un usuario
@users_bp.route("/", methods=["PUT"])
def update_user():
    try:
        # Recogemos el usuario nuevo a editar
        new_user = request.get_json()

        # Caso en el que no se introduce el nombre en el body
        name = new_user.get("name")
        if not name:
            return jsonify({"error": "El campo 'name' es obligatorio"}), 400

        # Caso en el que no se encuentra el usuario
        user = find_user_by_name(name)
        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404

        # Si viene nueva contraseña, se hashea
        if "password" in new_user:
            new_user["password"] = generate_password_hash(new_user["password"])

        # Evita que se edite el id
        new_user.pop("id", None) 

        # Actualizamos el usuario
        update_user_by_name(name, new_user)

        return jsonify({"message": "Usuario actualizado correctamente"}), 200

    except Exception as e:
        return jsonify({"error": f"Error al actualizar: {str(e)}"}), 500


# Login del usuario 
@users_bp.route("/login", methods = ['POST'])
def login():

    try:
        data = request.get_json()
        name = data.get("name")
        password = data.get("password")

        if not name or not password:
            return jsonify({"error": "Campos obligatorios faltantes"}), 400

        user = find_user_by_name(name)
        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404

        if not check_password_hash(user['password'], password):
            return jsonify({"error": "Contraseña incorrecta"}), 401

        token = create_access_token(identity=user["name"])
        return jsonify(access_token=token), 200

    except Exception as e:
        print(f"Error en login: {e}")
        return jsonify({"error": f"Error interno {e}"}), 500

# Chekeamos la contraseña de un usuario
@users_bp.route("/check-password", methods=["POST"])
@jwt_required()
def check_password():
    try:
        # Obtener los datos del body
        data = request.get_json()
        name = data.get("name")
        password = data.get("password")

        if not name or not password:
            return jsonify({"error": "Campos 'name' y 'password' son obligatorios"}), 400

        # Buscar el usuario
        user = find_user_by_name(name)
        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404

        # Comparar la contraseña
        if check_password_hash(user['password'], password):
            return jsonify({"match": True}), 200
        else:
            return jsonify({"match": False}), 409

    except Exception as e:
        return jsonify({"error": f"Error al verificar contraseña: {str(e)}"}), 500