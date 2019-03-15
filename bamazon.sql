DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
	item_id INT(20) auto_increment NOT NULL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NULL,
    price DOUBLE NOT NULL,
    stock_quantity INT(20) NULL
    );
    
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE('Killer Robot', 'Home Security', 3999999.99, 1),('Plush Dinosaur', 'Toys', 15, 2941),('Dagger', 'Rogue Supplies', 799.99, 15), ('Empty Soda Can', 'Recycling', 0.10, 488123),('Nuclear Missile', 'Home Security', 50.01, 200),('Box of Crayon', 'Toys', 9.99, 5412),('Fresh Cooked Dragon Tail', 'Food', 40.21, 2016), ('IOrange Smartphone 128G Space Gray', 'Electronics', 1299, 415),('Staff of Wizardry', 'Wizard Supplies', 9780, 12),('Hulkbuster Motorized Armor', 'Tools & Home Improvement', 42.99, 2);