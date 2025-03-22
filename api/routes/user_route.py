from flask import Blueprint, request
from controllers.user_controller import show_all

user_bp = Blueprint('persona', __name__)

# Listar todas las personas
@user_bp.route("/", methods=['GET'])
def index():
    return show_all()

# Insertar usuarios
@user_bp.route("/", methods = ['POST'])
def post():
    return 

    # new_data = request.get_json()
    # print(new_data)
    # if add_data(new_data):
    #     return "Registro añadido correctamente", 200
    # return "Error al insertar registro, ya existe el id", 409

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