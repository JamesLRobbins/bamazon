DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR (50) NOT NULL,
department_name VARCHAR (50) NOT NULL,
price INT NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fony Playconsole", "Electronics", 400, 200), ("Megahard Z Cube", "Electronics", 450, 150), ("Intendo Twitch", "Electronics", 300, 300),
("Bender Stratuscastor", "Instruments", 600, 100), ("Gibdon Less Paula", "Instruments", 1000, 250), ("Gears of Peace and Love", "Games", 500, 60),
("Hyper Mario Uncles", "Games", 700, 60), ("Metal Alica - The Magenta Album", "Music", 20, 750), ("Nearvana - Reaks Like Teen Angst", "Music", 15, 800),
("King - Fohemian Rap (Hyper Metal, Funk, Jive Remix", "Music", 25, 400);

SELECT * FROM products;