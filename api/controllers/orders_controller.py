from flask import jsonify
from utils.db import get_db_connection
import random

# Función que crea el pedido
def create_order(address, date, total, username):
    
    # Abrimos conexion
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Obtenemos el id del usuario
        cursor.execute("SELECT id FROM users WHERE name = %s", (username,))
        user = cursor.fetchone()
        if not user:
            return jsonify({"success": False, "message": "User not found"}), 404
        user_id = user[0]

        # Obtenemos el id del carrito
        cursor.execute("SELECT id FROM carts WHERE id_user = %s", (user_id,))
        cart = cursor.fetchone()
        if not cart:
            return jsonify({"success": False, "message": "Cart not found"}), 404
        cart_id = cart[0]

        # Obtenemos los productos del carrito con stock
        cursor.execute("""
            SELECT cp.id_product, cp.quantity, p.stock 
            FROM cart_products cp 
            JOIN products p ON cp.id_product = p.id 
            WHERE cp.id_cart = %s
        """, (cart_id,))
        cart_products = cursor.fetchall()

        if not cart_products:
            return jsonify({"success": False, "message": "Cart is empty"}), 400

        # Verificamos el stock de productos
        for id_product, quantity, stock in cart_products:
            if stock < quantity:
                return jsonify({
                    "success": False,
                    "message": f"Not enough stock for product ID {id_product}",
                    "product_id": id_product
                }), 409

        # Restamos el stock de los productos
        for id_product, quantity, _ in cart_products:
            cursor.execute(
                "UPDATE products SET stock = stock - %s WHERE id = %s",
                (quantity, id_product)
            )

        # Obtener el último número de referencia para mantener legal la facturación
        cursor.execute("SELECT n_ref FROM orders ORDER BY id DESC LIMIT 1")
        last_ref = cursor.fetchone()

        if last_ref and last_ref[0].startswith("ORD-"):
            last_number = int(last_ref[0].split("-")[1])
            new_number = last_number + 1
        else:
            new_number = 1

        n_ref = f"ORD-{new_number:03d}" 

        # Creamos la orden
        cursor.execute("""
            INSERT INTO orders (date, n_ref, address, state, total, id_user)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (date, n_ref, address, 'paid', total, user_id))
        order_id = cursor.lastrowid

        # Añadimos los productos de la orden
        for id_product, quantity, _ in cart_products:
            cursor.execute("""
                INSERT INTO order_products (id_product, id_order, quantity)
                VALUES (%s, %s, %s)
            """, (id_product, order_id, quantity))

        # Vaciamos el carrito
        cursor.execute("DELETE FROM cart_products WHERE id_cart = %s", (cart_id,))
        conn.commit()

        return jsonify({
            "success": True,
            "message": "Order created successfully",
            "order_reference": n_ref
        }), 200

    # Errores
    except Exception as e:
        conn.rollback()
        return jsonify({"success": False, "message": "Internal error", "error": str(e)}), 500

    # Cerramos conexion
    finally:
        cursor.close()
        conn.close()

# Función que recoge las órdenes del usuario
def get_orders_by_user(username):

    # Abrimos conexion
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        # Obtenemos el id del usuario
        cursor.execute("SELECT id FROM users WHERE name = %s", (username,))
        user = cursor.fetchone()
        if not user:
            return jsonify({"message": "User not found"}), 404
        user_id = user['id']

        # Obtenemos los pedidos del usuario
        cursor.execute("""
            SELECT id, date, n_ref, address, total
            FROM orders
            WHERE id_user = %s
            ORDER BY date DESC
        """, (user_id,))
        orders = cursor.fetchall()

        all_orders = []

        for order in orders:
            order_id = order['id']

            # Obtenemos los productos de cada pedido
            cursor.execute("""
                SELECT p.name, p.price, p.url_image, op.quantity
                FROM order_products op
                JOIN products p ON op.id_product = p.id
                WHERE op.id_order = %s
            """, (order_id,))
            products = cursor.fetchall()

            all_orders.append({
                "date": order['date'].isoformat(),
                "reference": order['n_ref'],
                "address": order['address'],
                "total": order['total'],
                "products": products
            })

        return jsonify(all_orders), 200

    # Errores
    except Exception as e:
        return jsonify({"message": "Internal error", "error": str(e)}), 500

    # Cerramos conexiones
    finally:
        cursor.close()
        conn.close()