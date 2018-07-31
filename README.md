# Bamazon
Nodejs \ SQL Order System 

This Nodejs App has two parts:

BamazonCustomer
BamazonManager

The NodeJS Order System BamazonCustomer allows users to access an SQL product database. It displays all items in inventory on load and allows for two customer prompts:

The first prompt asks them the ID of the product they would like to buy.
The second prompt asks how many units of the product they would like to buy.


The NodeJS Order System BamazonManager allows users to access an SQL product database. It displays a list of options on load and allows customers to select from the following:

View Products for Sale
View Low Inventory
Add to Inventory
Add New Product 

If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
