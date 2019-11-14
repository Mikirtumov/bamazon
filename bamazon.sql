

DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

use bamazon;
create table products(
item_id integer(100) not Null,
product_name varchar(255) not Null,
department_name varchar(255) not Null,
price decimal (5,2) not Null,
stock_quantity integer(100) not Null
);

insert into products
values(01, "Tree", "Botany", 12.96, 4);
select * from products