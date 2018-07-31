CREATE DATABASE bamazon;
use bamazon; 
CREATE TABLE products (
item_id int NOT NULL,
product_name VARCHAR(30),
department_name VARCHAR(30),
price int(2),
stock_quantity int,
PRIMARY KEY (item_id)
);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("001", "hat", "clothing", "12.00", 30);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("002", "shoes", "clothing", "65.00", 200);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("003", "gloves", "clothing", "10.00", 10);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("004", "necklace", "jewelry", "12.95", 40);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("005", "bracelet", "jewelry", "8.00", 35);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("006", "rings", "jewelry", "125.00", 10);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("007", "pots", "cookware", "129.00", 38);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("008", "pans", "cookware", "74.50", 65);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("009", "glasses", "cookware", "16.00", 47);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("010", "saw", "hardware", "125.95", 8);

