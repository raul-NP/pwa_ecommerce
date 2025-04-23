from utils.db import get_db_connection 
from flask import jsonify

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

def insert_user(name, password, rol, points):
    db = get_db_connection()
    cursor = db.cursor()
    hashed_pw = generate_password_hash(password)
    cursor.execute("INSERT INTO users (name, password, rol, points) VALUES (%s, %s, %s, %s)", (name, hashed_pw, rol, points))
    db.commit()
    cursor.close()
    db.close()
    return True

def find_user_by_name(name):
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE name = %s", (name,))
    user = cursor.fetchone()
    cursor.close()
    db.close()
    return user