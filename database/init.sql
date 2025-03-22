-- Para entrar por terminal
-- docker exec -it pwa_db mysql -u root -p

-- Creamos la base de datos
CREATE DATABASE IF NOT EXISTS ecommerce;
-- Nos posicionamos en ella
USE ecommerce;

-- Creamos la tabla usuarios
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50),
  password VARCHAR(255)
);

-- Insertamos un usuario de prueba
INSERT INTO users (username, password) VALUES ('rnavajas@gmail.com', 'rnavajas');