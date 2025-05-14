from utils.db import get_db_connection

# Función que recupera los productos de un carrito
def get_cart_products(username):

    # Abrimos conexion
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        # Obtenemos el id del usuario
        cursor.execute("SELECT id FROM users WHERE name = %s", (username,))
        user = cursor.fetchone()
        if not user:
            raise Exception("Usuario no encontrado")
        user_id = user["id"]

        # Obtenemos el id del carrito
        cursor.execute("SELECT id FROM carts WHERE id_user = %s", (user_id,))
        cart_id = cursor.fetchone()["id"]

        # Obtenemos los productos y cantidades del carrito
        query = """
            SELECT p.id, p.name, p.price, p.stock, p.url_image, p.description, cp.quantity
            FROM cart_products cp
            JOIN products p ON cp.id_product = p.id
            WHERE cp.id_cart = %s
        """
        cursor.execute(query, (cart_id,))
        products = cursor.fetchall()

        return products

    # Erroes
    except Exception as e:
        raise e

    # Cerramos conexiones
    finally:
        cursor.close()
        conn.close()

# Función para añadir un producto al carrito o sumarlo si ya existe
def add_product_to_cart(username, product_name, add):
    
    # Abrimos la conexion
    conn = get_db_connection()
    cursor = conn.cursor()

    try:

        # Obtenemos el id de usuario
        cursor.execute("SELECT id FROM users WHERE name = %s", (username,))
        user_id = cursor.fetchone()[0]

        # Obtenemos el id del producto
        cursor.execute("SELECT id FROM products WHERE name = %s", (product_name,))
        product_id = cursor.fetchone()[0]

        # Obtenemos el id del carrito del usuario
        cursor.execute("SELECT id FROM carts WHERE id_user = %s", (user_id,))
        cart_id = cursor.fetchone()[0]

        # Observamos si ya existe el producto en el carrito
        cursor.execute("SELECT quantity FROM cart_products WHERE id_product = %s AND id_cart = %s", (product_id, cart_id))
        result = cursor.fetchone()

        # Caso en el que existe el producto en el carrito
        if result:

            # Casp en el que marquemos que queremos añadir uno mas al carrito
            if add:
                cursor.execute("UPDATE cart_products SET quantity = quantity + 1 WHERE id_product = %s AND id_cart = %s", (product_id, cart_id))
        
        # Caso en el que no existe el producto
        else:
            cursor.execute("INSERT INTO cart_products (id_product, id_cart, quantity) VALUES (%s, %s, 1)", (product_id, cart_id))

        conn.commit()

    # Errores
    except Exception as e:
        conn.rollback()
        raise e

    # Cerramos las conexiones
    finally:
        cursor.close()
        conn.close()

# Función para restar la cantidad de un producto del carrito
def substract_product_from_cart(username, product_name):
    
    # Abrimos conexiones
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Obtenemos el id de usuario
        cursor.execute("SELECT id FROM users WHERE name = %s", (username,))
        user_id = cursor.fetchone()[0]

        # Obtenemos el id del producto
        cursor.execute("SELECT id FROM products WHERE name = %s", (product_name,))
        product_id = cursor.fetchone()[0]

        # Obtenemos el id del carrito
        cursor.execute("SELECT id FROM carts WHERE id_user = %s", (user_id,))
        cart_id = cursor.fetchone()[0]

        # Obtenemos la cantidad del producto en el carrito
        cursor.execute("SELECT quantity FROM cart_products WHERE id_product = %s AND id_cart = %s", (product_id, cart_id))
        quantity = cursor.fetchone()[0]

        # Si es mayor que uno se resta
        if quantity > 1:
            cursor.execute("UPDATE cart_products SET quantity = quantity - 1 WHERE id_product = %s AND id_cart = %s", (product_id, cart_id))

        conn.commit()

    # Errores
    except Exception as e:
        conn.rollback()
        raise e

    # Cerramos conexiones
    finally:
        cursor.close()
        conn.close()

# Funcion para borrar un producto del carrito
def delete_product_from_cart(username, product_name):

    # Abrimos conexiones
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Obtenemos el id de usuario
        cursor.execute("SELECT id FROM users WHERE name = %s", (username,))
        user_id = cursor.fetchone()[0]

        # Obtenemos el id del producto
        cursor.execute("SELECT id FROM products WHERE name = %s", (product_name,))
        product_id = cursor.fetchone()[0]

        # Obtenemos el id del carrito
        cursor.execute("SELECT id FROM carts WHERE id_user = %s", (user_id,))
        cart_id = cursor.fetchone()[0]

        # Eliminamos el producto del carrito
        cursor.execute("DELETE FROM cart_products WHERE id_product = %s AND id_cart = %s", (product_id, cart_id))
        conn.commit()

    # Errores
    except Exception as e:
        conn.rollback()
        raise e

    # Cerramos conexiones
    finally:
        cursor.close()
        conn.close()
