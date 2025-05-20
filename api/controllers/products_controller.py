from utils.db import get_db_connection 
from flask import jsonify
import mysql.connector

# Recuperar todos los productos con sus categorias
def get_all():

    # Abrimos conexion
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    # Ejecutamos la consulta
    query = """
        SELECT p.id AS product_id, p.name AS product_name, p.price, p.stock, p.url_image, p.description, c.id AS category_id, c.name AS category_name
        FROM products p
        LEFT JOIN product_categories pc ON p.id = pc.id_product
        LEFT JOIN categories c ON pc.id_category = c.id
    """
    cursor.execute(query)
    rows = cursor.fetchall()

    # Agrupar productos con sus categorías
    products_dict = {}
    for row in rows:
        pid = row['product_id']
        if pid not in products_dict:
            products_dict[pid] = {
                "id": pid,
                "name": row["product_name"],
                "price": row["price"],
                "stock": row["stock"],
                "url_image": row["url_image"],
                "description": row["description"],
                "categories": []
            }

        # Añadir categoría si existe
        if row["category_id"] and row["category_name"]:
            products_dict[pid]["categories"].append({
                "id": row["category_id"],
                "name": row["category_name"]
            })

    # Cerramos conexion
    cursor.close()
    connection.close()

    return list(products_dict.values())


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

# Creamos el producto
def create_product(data):

    # Abrimos conexion
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        # Insertar producto
        cursor.execute("""
            INSERT INTO products (name, price, stock, url_image, description)
            VALUES (%s, %s, %s, %s, %s)
        """, (
            data.get("name"), data.get("price"),
            data.get("stock"), data.get("url_image"),
            data.get("description")
        ))
        product_id = cursor.lastrowid

        # Asociar a categoría 'all'
        cursor.execute("SELECT id FROM categories WHERE name = 'all'")
        all_cat = cursor.fetchone()
        if not all_cat:
            raise Exception("Category 'all' not found")

        cursor.execute("""
            INSERT INTO product_categories (id_product, id_category)
            VALUES (%s, %s)
        """, (product_id, all_cat["id"]))

        # Asociar a la categoría proporcionada si es válida y distinta de all y favourites
        selected_cat_id = data.get("categories", [None])[0]
        if selected_cat_id:
            cursor.execute("SELECT id, name FROM categories WHERE id = %s", (selected_cat_id,))
            cat = cursor.fetchone()
            if cat and cat["name"].lower() not in ("all", "favourites"):
                cursor.execute("""
                    INSERT INTO product_categories (id_product, id_category)
                    VALUES (%s, %s)
                """, (product_id, cat["id"]))

        connection.commit()
        return {"message": "Product created", "id": product_id}, 201

    # Caso de error
    except Exception as e:
        connection.rollback()
        return {"message": str(e)}, 500

    # Cerramos conexiones
    finally:
        cursor.close()
        connection.close()

# Actualizar producto
def update_product(id_product, data):

    # Abrimos conexion
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        # Verificar si el producto existe
        cursor.execute("SELECT * FROM products WHERE id = %s", (id_product,))
        product = cursor.fetchone()
        if not product:
            return {"message": "Product not found"}, 404

        # Actualizar datos del producto
        cursor.execute("""
            UPDATE products SET name = %s, price = %s, stock = %s, url_image = %s, description = %s
            WHERE id = %s
        """, (
            data.get("name"), data.get("price"),
            data.get("stock"), data.get("url_image"),
            data.get("description"), id_product
        ))

        # Obtener todas las categorías asignadas al producto
        cursor.execute("""
            SELECT c.id, c.name FROM categories c
            JOIN product_categories pc ON c.id = pc.id_category
            WHERE pc.id_product = %s
        """, (id_product,))
        current_categories = cursor.fetchall()

        # Categorías que deben conservarse, all y favourites
        special_cats = {"all", "favourites"}
        keep_cat_ids = [cat["id"] for cat in current_categories if cat["name"] in special_cats]

        # Eliminar todas las categorías actuales
        cursor.execute("DELETE FROM product_categories WHERE id_product = %s", (id_product,))

        # Reinsertar las categorías especiales que ya tenía
        for cat_id in keep_cat_ids:
            cursor.execute("""
                INSERT INTO product_categories (id_product, id_category)
                VALUES (%s, %s)
            """, (id_product, cat_id))

        # Insertar nueva categoría si es válida y no es especial
        new_category = data.get("category")
        if new_category and new_category not in special_cats:
            cursor.execute("SELECT id FROM categories WHERE name = %s", (new_category,))
            cat = cursor.fetchone()
            if cat:
                cursor.execute("""
                    INSERT INTO product_categories (id_product, id_category)
                    VALUES (%s, %s)
                """, (id_product, cat["id"]))
            else:
                return {"message": f"Category '{new_category}' not found"}, 400

        # Asegurar que el producto esté al menos en all
        if not any(cat["name"] == "all" for cat in current_categories):
            cursor.execute("SELECT id FROM categories WHERE name = 'all'")
            cat = cursor.fetchone()
            if cat:
                cursor.execute("""
                    INSERT INTO product_categories (id_product, id_category)
                    VALUES (%s, %s)
                """, (id_product, cat["id"]))

        connection.commit()
        return {"message": "Product updated"}, 200

    # Caso de error
    except Exception as e:
        connection.rollback()
        return {"message": str(e)}, 500

    # Cerramos conexiones
    finally:
        cursor.close()
        connection.close()


# Borramos el producto
def delete_product(id_product):

    # Abrimos conexion
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        # Verificar si existe
        cursor.execute("SELECT id FROM products WHERE id = %s", (id_product,))
        product = cursor.fetchone()
        if not product:
            return {"message": "Product not found"}, 404

        # Eliminar relaciones en product_categories
        cursor.execute("DELETE FROM product_categories WHERE id_product = %s", (id_product,))

        # Eliminar producto
        cursor.execute("DELETE FROM products WHERE id = %s", (id_product,))

        connection.commit()
        return {"message": "Product deleted"}, 200

    # Caso de error
    except Exception as e:
        connection.rollback()
        return {"message": str(e)}, 500

    # Cerramos conexiones
    finally:
        cursor.close()
        connection.close()