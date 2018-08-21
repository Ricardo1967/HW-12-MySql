DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

use bamazon_db;

CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR() NOT NULL,
    department_name VARCHAR() NOT NULL,
    price DECIMAL NOT NULL,
    stock_quantity INT NOT NULL
);


/*
item_id (unique id for each product)
product_name (Name of product)
department_name
price (cost to customer)
stock_quantity (how much of the product is available in stores)
*/