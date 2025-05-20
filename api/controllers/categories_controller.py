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

# Creamos la categoria
def create_category(name):
    try:
        # Abrimos conexion
        conn = get_db_connection()
        cursor = conn.cursor()

        # Ejecutamos la consulta
        cursor.execute("INSERT INTO categories (name) VALUES (%s)", (name,))
        conn.commit()

        # Cerramos conexion
        cursor.close()
        conn.close()
        return True
    
    # Caso de error
    except Exception as e:
        return False

# Actualizamos una categoria
def update_category(old_name, new_name):
    try:
        # Abrimos conexion
        conn = get_db_connection()
        cursor = conn.cursor()

        # Ejecutamos la consulta
        cursor.execute("UPDATE categories SET name = %s WHERE name = %s", (new_name, old_name))
        conn.commit()
        row_updated = cursor.rowcount

        # Cerramos conexion
        cursor.close()
        conn.close()
        return row_updated > 0
    
    # Caso de error
    except Exception as e:
        return False

# Borramos una categoria
def delete_category(name):
    try:
        # Abrimos conexion
        conn = get_db_connection()
        cursor = conn.cursor()

        # Ejecutamos la consulta
        cursor.execute("DELETE FROM categories WHERE name = %s", (name,))
        conn.commit()
        row_deleted = cursor.rowcount

        # Cerramos conexion
        cursor.close()
        conn.close()
        return row_deleted > 0
    
    # Caso de error
    except Exception as e:
        return False