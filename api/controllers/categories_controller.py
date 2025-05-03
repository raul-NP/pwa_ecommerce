from utils.db import get_db_connection 
from flask import jsonify

# Obtenemos todos los productos
def get_all():

    # Realizamos la conexion
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    # Realizamos la consulta   
    query = "SELECT * FROM categories"
    cursor.execute(query)
    categories = cursor.fetchall()

    # Cerramos la conexion   
    cursor.close()
    conn.close()
    return categories