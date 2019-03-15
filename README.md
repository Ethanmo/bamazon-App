# bamazon-App

The bamazom-app connects to bamazon database using node.js. 

The bamazonCustomer.js will ask the user to put in the name and the amount of the product he wants to buy. If the product doesn't exist, the console will prompt the user that it doesn't exist. If the product input is valid, connect with bamazon database and update the database accordingly.

The bamazonManager.js will ask the user to choose from 4 commands. 'View products for sale' will display a table of all products for sale in terminal. 'View Low Inventory' will display a table of products with stock_quantity lower than 5. 'Add to inventory' will allow user to add more stock to a specified product. 'Add new product' will allow user to add a new product to the 'products' table.

The bamazonSupervisor.js will ask the user to choose from 2 commands. 'View product sales by department' will both update and display the 'departments' table. It will also calculate the total_profit for each department. 'Create new department' will allow user to add a new department.

npm modules needed:
-mysql
-inquirer

