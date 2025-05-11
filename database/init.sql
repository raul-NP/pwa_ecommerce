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
    points INT DEFAULT 0,
    discount BOOLEAN DEFAULT FALSE
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

-- Crear tabla de productos (sin columna de categoría)
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price FLOAT NOT NULL,
    stock INT NOT NULL,
    url_image VARCHAR(255),
    description VARCHAR(250)
);

-- Crear tabla intermedia: productos-categorías
CREATE TABLE product_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_product INT NOT NULL,
    id_category INT NOT NULL,
    FOREIGN KEY (id_product) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (id_category) REFERENCES categories(id) ON DELETE CASCADE,
    UNIQUE (id_product, id_category)
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
    quantity INT,
    FOREIGN KEY (id_product) REFERENCES products(id),
    FOREIGN KEY (id_order) REFERENCES orders(id)
);

-- Insertar productos
INSERT INTO products (name, price, stock, url_image, description) VALUES
('Deepsea Watch', 450.00, 10, 'https://www.rabat.net/media/catalog/product/r/o/rolex-deepsea-m136660-0005.png', 'Rolex Deepsea watch in Oystersteel with a D-Blue dial'),
('Silver Bracelet', 620.00, 5, 'https://dimequemequieres.net/cdn/shop/products/pulsera-aline-plata-producto_569cd8aa-4d16-48b1-a90e-f3790082e968.png?v=1743504391&width=1500', '925 sterling silver bracelet');

-- Insertar categorías
INSERT INTO categories (name) VALUES
('All'),
('Watches'),
('Rings'),
('Necklaces'),
('Bracelets'),
('Favourites');

-- Relacionar productos con categorías
INSERT INTO product_categories (id_product, id_category) VALUES
(1, 1), -- Reloj deepsea -> Todos
(1, 2), -- Reloj deepsea -> Relojes
(1, 6), -- Reloj deepsea -> Favoritos
(2, 1), -- Collar Perlas -> Todos
(2, 5); -- Collar Perlas -> Pulseras

-- Insertar usuario administrador
INSERT INTO users (name, password, rol, points) VALUES
('admin', 'scrypt:32768:8:1$mvgrN7FRdTKWPy63$04f52bb54ba8aa88f225eac9e702de8f8651365073e5c2be6101eab833907798ba5ebb6aaf0d8e57b6ae9353a70b8f87a848ee3a6d175d7ea40ab462c0b51acd', 'admin', 250);

-- Insertar carrito para el admin
INSERT INTO carts (id_user) VALUES (1);

-- Insertar productos en el carrito (ejemplo comentado)
-- INSERT INTO cart_products (id_product, id_cart, quantity) VALUES
-- (1, 1, 1),
-- (2, 1, 2);

-- Insertar pedido del admin (ejemplo comentado)
-- INSERT INTO orders (date, n_ref, address, state, total, id_user) VALUES
-- (CURDATE(), 'ORD-0001', 'Calle Falsa 123, Logroño', 'pagado', 1690.00, 1);

-- Insertar productos en el pedido (ejemplo comentado)
-- INSERT INTO order_products (id_product, id_order, quantity) VALUES
-- (1, 1, 1),