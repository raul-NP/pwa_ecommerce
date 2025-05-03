from utils.db import get_db_connection 
from flask import jsonify
import mysql.connector

# # Recuperar todos los productos
# def get_all():

#     # Abrimos la conexion
#     connection = get_db_connection()
#     cursor = connection.cursor(dictionary=True)

#     # Realizamos la consulta
#     query = "SELECT * FROM products"
#     cursor.execute(query)
#     products = cursor.fetchall()

#     # Cerramos la conexion
#     cursor.close()
#     connection.close()
#     return products


# Recuperar los productos de una categoria
def get_by_category(category_name):

    # Abrimos la conexion
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    # Realizamos la consulta
    query = """
        SELECT p.*, GROUP_CONCAT(c.name) AS categories
        FROM products p
        JOIN product_categories pc ON p.id = pc.id_product
        JOIN categories c ON pc.id_category = c.id
        WHERE c.name = %s
        GROUP BY p.id
    """
    cursor.execute(query, (category_name,))
    products = cursor.fetchall()

    # Cerramos la conexion
    cursor.close()
    connection.close()
    return products

# Insertar un producto en una categoria en concreto
def assign_product_to_category(id_product, category_name):

    # Abrimos la conexion
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    # Verificar que el producto existe
    cursor.execute("SELECT id FROM products WHERE id = %s", (id_product,))
    product = cursor.fetchone()
    if not product:
        cursor.close()
        connection.close()
        return {"message": "Product not found"}, 404

    # Verificar que la categoría existe
    cursor.execute("SELECT id FROM categories WHERE name = %s", (category_name,))
    category = cursor.fetchone()
    if not category:
        cursor.close()
        connection.close()
        return {"message": "Category not found"}, 404

    # Intentamos asociar el producto en la categoria
    try:
        cursor.execute("""
            INSERT INTO product_categories (id_product, id_category)
            VALUES (%s, %s)
        """, (id_product, category["id"]))
        connection.commit()
    except mysql.connector.IntegrityError:
        cursor.close()
        connection.close()
        return {"message": "Product is already in this category"}, 409

    # Cerramos la conexion
    cursor.close()
    connection.close()
    return {"message": "Product added to category"}, 200

# Desasignamos un producto de una categoria
def remove_product_from_category(id_product, category_name):

    # Abrimos la conexión
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    # Verificamos que el producto existe
    cursor.execute("SELECT id FROM products WHERE id = %s", (id_product,))
    product = cursor.fetchone()
    if not product:
        cursor.close()
        connection.close()
        return {"message": "Product not found"}, 404

    # Verificamos que la categoría existe
    cursor.execute("SELECT id FROM categories WHERE name = %s", (category_name,))
    category = cursor.fetchone()
    if not category:
        cursor.close()
        connection.close()
        return {"message": "Category not found"}, 404

    # Verificamos que el producto existe en la categoria
    cursor.execute("""
        SELECT * FROM product_categories
        WHERE id_product = %s AND id_category = %s
    """, (id_product, category["id"]))
    relation = cursor.fetchone()
    if not relation:
        cursor.close()
        connection.close()
        return {"message": "Product is not in this category"}, 409

    # Eliminamos la relación
    cursor.execute("""
        DELETE FROM product_categories
        WHERE id_product = %s AND id_category = %s
    """, (id_product, category["id"]))
    connection.commit()

    # Cerramos la conexión
    cursor.close()
    connection.close()
    return {"message": "Product removed from category"}, 200