DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,4) NOT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shampoo", "Beauty and Health", 10.50, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone", "Electronics", 800, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kleenex", "Household", 6, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vitamin Pills", "Household", 12, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vacuum", "Household", 100, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Detergent", "Household", 18.50, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Computer", "Electronics", 400, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPad", "Electronics", 300, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sport Shorts", "Sports", 25, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tennis Raquet", "Sports", 45, 20);