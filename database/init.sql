-- Crear base de datos
CREATE DATABASE IF NOT EXISTS pwa_ecommerce;
USE pwa_ecommerce;

-- Tabla de usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(250) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    points INT DEFAULT 0,
    discount BOOLEAN DEFAULT FALSE
);

-- Tabla de carritos
CREATE TABLE carts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT UNIQUE,
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla de categorías
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Tabla de productos
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price FLOAT NOT NULL,
    stock INT NOT NULL,
    url_image VARCHAR(255),
    description VARCHAR(250)
);

-- Tabla intermedia productos-categorías (PK compuesta)
CREATE TABLE product_categories (
    id_product INT NOT NULL,
    id_category INT NOT NULL,
    PRIMARY KEY (id_product, id_category),
    FOREIGN KEY (id_product) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (id_category) REFERENCES categories(id) ON DELETE CASCADE
);

-- Tabla intermedia productos en el carrito (PK compuesta)
CREATE TABLE cart_products (
    id_product INT NOT NULL,
    id_cart INT NOT NULL,
    quantity INT DEFAULT 1,
    PRIMARY KEY (id_product, id_cart),
    FOREIGN KEY (id_product) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (id_cart) REFERENCES carts(id) ON DELETE CASCADE
);

-- Tabla de pedidos
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    n_ref VARCHAR(100) NOT NULL,
    address VARCHAR(250),
    state VARCHAR(50),
    total FLOAT,
    id_user INT,
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla intermedia productos en el pedido (PK compuesta)
CREATE TABLE order_products (
    id_product INT NOT NULL,
    id_order INT NOT NULL,
    quantity INT,
    PRIMARY KEY (id_product, id_order),
    FOREIGN KEY (id_product) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (id_order) REFERENCES orders(id) ON DELETE CASCADE
);

-- -------------------------------
-- DATOS DE INICIO PARA DEMO
-- -------------------------------

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
(1, 1), -- Deepsea -> All
(1, 2), -- Deepsea -> Watches
(1, 6), -- Deepsea -> Favourites
(2, 1), -- Bracelet -> All
(2, 5); -- Bracelet -> Bracelets

-- Insertar usuario administrador y su carrito
INSERT INTO users (name, password, rol, points) VALUES
('admin', 'scrypt:32768:8:1$mvgrN7FRdTKWPy63$04f52bb54ba8aa88f225eac9e702de8f8651365073e5c2be6101eab833907798ba5ebb6aaf0d8e57b6ae9353a70b8f87a848ee3a6d175d7ea40ab462c0b51acd', 'admin', 250);

INSERT INTO carts (id_user) VALUES (1);
