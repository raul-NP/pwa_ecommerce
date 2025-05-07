from utils.db import get_db_connection 
from flask import jsonify
from werkzeug.security import generate_password_hash

# Muestra todos los usuarios
def show_all():

    # Conexion a la base de datos
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    # Ejecutamos la consulta
    cursor.execute("SELECT * FROM users")

    # Obtenemos los registros
    users = cursor.fetchall()

    # Cerrar la conexión
    cursor.close()
    db.close()

    # Retornar los resultados en formato JSON
    return jsonify(users)

# Insertamos en la base de datos al usuario
def insert_user(name, password, rol, points):
    
    # Conexion a la base de datos
    db = get_db_connection()
    cursor = db.cursor()

    # Hasheamos la contraseña e insertamos el usuario
    hashed_pw = generate_password_hash(password)
    cursor.execute("INSERT INTO users (name, password, rol, points) VALUES (%s, %s, %s, %s)", (name, hashed_pw, rol, points))
    
    # Cerramos las conexiones
    db.commit()
    cursor.close()
    db.close()

# Funcion que devuelve un usuario encontrado en la bd por nombre
def find_user_by_name(name):
    
    # Conexión con la base de datos
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    
    # Buscamos el usuario
    cursor.execute("SELECT * FROM users WHERE name = %s", (name,))
    user = cursor.fetchone()
    
    # Cerramos conexiones
    cursor.close()
    db.close()
    return user

# Función para actualizar los campos de un usuario por su nombre
def update_user_by_name(name, fields: dict):

    # Abrimos la conexion
    db = get_db_connection()
    cursor = db.cursor()

    # Recopilamos los campos a setear
    set_clause = ", ".join(f"{key} = %s" for key in fields.keys())
    values = list(fields.values())
    values.append(name)

    # Realizamos la consulta de actualizacion del usuario
    query = f"UPDATE users SET {set_clause} WHERE name = %s"
    cursor.execute(query, values)

    # Cerramos conexion
    db.commit()
    cursor.close()
    db.close()