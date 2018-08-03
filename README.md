# bAmazon

## Description
A Nodejs CLI Storefront With MySQL Backend

## MySQL Database Setup
In order to run this application, you should have the MySQL database already set up on your machine. If you don't, visit the MySQL installation page to install the version you need for your operating system. Once you have MySQL isntalled, you will be able to create the Bamazon database and the products table with the SQL code found in squema.sql. Run this code inside your MySQL client to populate the database, then you will be ready to proceed with running the Bamazon customer and manager interfaces.

## Customer Interface
The customer interface allows the user to:
- View the current inventory of store items:
  - Item IDs
  - Product Name
  - Department
  - Price
  - Stock of Item
 
The user is then presented with a question if they would like make a purchase. 
If the user responds 'yes', they must enter: 
  - ID of product 
  - Quantity to purchase 

The program checks to see if the selected product has enough stock to fulfill the order.
If there is enough stock available, then program displays to the user: 
  - Product to be purchased
  - Quantity to be purchased
  - Price of item 
  - Total $ to be paid for order
  
 Program then asks user to confirm order and if they want to fulfill it. 
 If user responds yes, they are then asked if they would like to make another purchase. If they do not, then they are greeted and thanked for their purchase and program is terminated.


## Manager Interface
The manager interface presents a list of four options: 

- View Products for Sale 
- View Low Inventory
    - any items that have a stock quantity below 5.
- Add to Inventory
    - adds a defined stock to a product.
- Add New Product
    - adds product to the available products for sale.
- Exit 
