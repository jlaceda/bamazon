DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	item_id INT UNSIGNED AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(255) NOT NULL,
	department_name VARCHAR(255),
	price DECIMAL(10,2) UNSIGNED NOT NULL,
	stock_quantity INT NOT NULL,
	product_sales DECIMAL(10,2) UNSIGNED,
	PRIMARY KEY (item_id)
);

CREATE TABLE departments (
	department_id INT UNSIGNED AUTO_INCREMENT NOT NULL,
	department_name VARCHAR(255) NOT NULL,
	over_head_costs DECIMAL(10,2) UNSIGNED NOT NULL,
	PRIMARY KEY (department_id)
);
