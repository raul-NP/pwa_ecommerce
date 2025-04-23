from flask import Blueprint, request
from controllers.user_controller import show_all, insert_user, find_user_by_name
from werkzeug.security import check_password_hash

user_bp = Blueprint('user', __name__)

# Listar todas las personas
@user_bp.route("/", methods=['GET'])
def index():
    return show_all()

# Insertar usuarios
@user_bp.route("/", methods = ['POST'])
def post():

    # Datos provinientes
    data = request.get_json()
    name = data.get("name")
    password = data.get("password")
    rol = data.get("rol", "user")
    points = data.get("points", 0)

    if not name or not password:
        return jsonify({"error": "Campos obligatorios faltantes"}), 500

    if find_user_by_name(name):
        return jsonify({"error": "El usuario ya existe"}), 409

    insert_user(name, password, rol, points)
    return jsonify({"message": "Usuario registrado correctamente"}), 200 

# Insertar usuarios
@user_bp.route("/check", methods = ['POST'])
def check():

    # Datos provinientes
    data = request.get_json()
    name = data.get("name")
    password = data.get("password")

    if not name or not password:
        return jsonify({"error": "Campos obligatorios faltantes"}), 500

    user = find_user_by_name(name)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 409

    if not check_password_hash(user['password'], password):
        return jsonify({"error": "Contraseña incorrecta"}), 500

    return jsonify({"message": "Acceso autorizado"}), 200 

# Actualizamos usuarios
@user_bp.route("/", methods=['PUT'])
def put():
    return

    # updated_data = request.get_json()
    # if update_data(updated_data):
    #     return "Registro actualizado correctamente", 200
    # return "El registro con ese id no existe", 404

# Eliminamos usuarios
@user_bp.route("/", methods=['DELETE'])
def delete():
    return

    # deleted_data = request.get_json()
    # if delete_data(deleted_data):
    #     return "Registro eliminado correctamente", 200
    # return "No existe el id del registro a eliminar", 404