import os
import mysql.connector
from flask import jsonify

# Devolvemos la conexion a la base de datos
def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )

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