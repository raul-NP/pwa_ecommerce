-- Creamos la base de datos
CREATE DATABASE IF NOT EXISTS pwa_ecommerce;

-- Nos posicionamos en ella
USE pwa_ecommerce;

-- Crear tabla de usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(250) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    points INT DEFAULT 0
);

-- Crear tabla de carritos
CREATE TABLE carts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT UNIQUE,
    FOREIGN KEY (id_user) REFERENCES users(id)
);

-- Crear tabla de categorías
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Crear tabla de productos
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price FLOAT NOT NULL,
    stock INT NOT NULL,
    url_image VARCHAR(255),
    description VARCHAR(250),
    id_category INT,
    FOREIGN KEY (id_category) REFERENCES categories(id)
);

-- Crear tabla intermedia: productos en el carrito
CREATE TABLE cart_products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_product INT,
    id_cart INT,
    quantity INT DEFAULT 1,
    FOREIGN KEY (id_product) REFERENCES products(id),
    FOREIGN KEY (id_cart) REFERENCES carts(id)
);

-- Crear tabla de pedidos
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    n_ref VARCHAR(100) NOT NULL,
    address VARCHAR(250),
    state VARCHAR(50),
    total FLOAT,
    id_user INT,
    FOREIGN KEY (id_user) REFERENCES users(id)
);

-- Crear tabla intermedia: productos en el pedido
CREATE TABLE order_products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_product INT,
    id_order INT,
    quantity INT DEFAULT 1,
    FOREIGN KEY (id_product) REFERENCES products(id),
    FOREIGN KEY (id_order) REFERENCES orders(id)
);

-- Insertar categoría de ejemplo
INSERT INTO categories (name) VALUES
('Anillos'),
('Collares'),
('Pulseras');

-- Insertar productos de ejemplo
INSERT INTO products (name, price, stock, url_image, description, id_category) VALUES
('Anillo Oro 18K', 450.00, 10, 'https://example.com/anillo1.jpg', 'Anillo de oro amarillo 18K', 1),
('Collar Perlas', 620.00, 5, 'https://example.com/collar1.jpg', 'Collar clásico de perlas naturales', 2);

-- Insertar usuario administrador
INSERT INTO users (name, password, rol, points) VALUES
('admin', 'admin_password_hash', 'admin', 0);

-- Insertar carrito para el admin
INSERT INTO carts (id_user) VALUES (1);

-- Insertar productos en el carrito
-- INSERT INTO cart_products (id_product, id_cart, quantity) VALUES
-- (1, 1, 1),
-- (2, 1, 2);

-- Insertar pedido del admin
-- INSERT INTO orders (date, n_ref, address, state, total, id_user) VALUES
-- (CURDATE(), 'ORD-0001', 'Calle Falsa 123, Logroño', 'pagado', 1690.00, 1);

-- Insertar productos en el pedido
-- INSERT INTO order_products (id_product, id_order, quantity) VALUES
-- (1, 1, 1),
-- (2, 1, 2);
