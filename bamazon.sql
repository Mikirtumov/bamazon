DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

use bamazon;
create table products(
item_id integer(100) not Null,
product_name varchar(255) not Null,
department_name varchar(255) not Null,
price decimal (6,2) not Null,
stock_quantity integer(100) not Null
);

insert into products
values(01, "iPhone 11", "Apple", 699, 88);
insert into products
values(02, "Watch Series 5", "Apple", 399, 55);
insert into products
values(03, "iPad Pro", "Apple", 999, 44);
insert into products
values(04, "MacBook Pro", "Apple", 999, 22);
insert into products
values(05, "AirPods", "Apple", 150, 64);
insert into products
values(06, "iPod touch", "Apple", 249,99);
insert into products
values(07, "HomePod", "Apple", 299, 54);
insert into products
values(08, "iphone 11 Pro", "Apple", 1099, 28);
insert into products
values(09, "Apple TV 4k", "Apple", 249, 76);
insert into products
values(10, "iPad 6th Gen", "Apple", 399, 25);
select * from products