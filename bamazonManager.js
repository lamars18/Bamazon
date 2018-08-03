//loads required npm packages 
var mysql = require("mysql");
var inquirer = require("inquirer");
var prompt = require("prompt");


//connects to database using credentials 
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "H@ppy1234",
  database: "bamazon"
}); //close for connection 

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  //calls the runSearch function 
  runSearch();
});

//function that allows user to select a search type
function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ] //close prompt
    })//close runSearch
    //function that grabs user response and calls the appropriate seach function to run based on selection
    .then(function(answer) {
      switch (answer.action) {
      case "View Products for Sale":
        listItems();
        break;

      case "View Low Inventory":
        viewLowInventory();
        break;

      case "Add to Inventory":
        addInventory();
        break;

      case "Add New Product":
        addProduct();
        break;
      }//close for answer
    });//close for switch 
 

// =================== Functions to be used inside the switch case ===================
//prompts for input, searches the database, and returns response to console with the specified headline
function listItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    // Error Handler
    if(err) throw err;

    // Show User message
    console.log('The following items are in Inventory...\n'); // Error Message;)

    // Set up table header
    console.log('  ID  |      Product Name      |  Department Name  |   Price  | In Stock');
    console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ')
    for (var i = 0; i < res.length; i++) {
      var item_id = res[i].item_id + ''; //convert to string 
      var product_name = res[i].product_name + ''; //convert to string 
      var department_name = res[i].department_name + ''; //convert to string 
      var price = res[i].price + ''; //convert to string 
      var stock_quantity = res[i].stock_quantity + ''; //convert to string 
        console.log('    ' + item_id + '            ' + product_name + '                   ' + department_name + '           ' + price + '   ' + stock_quantity);
    }
    runSearch();
  }); //close list items
  }//close connection 

    
//function that allows user to search artist having multiple entries in the database
//prompts for start and end input, searches the database, and returns response to console with the specified headline
function viewLowInventory() {
  var query = ("SELECT * FROM Products WHERE stock_quantity < 5");
  connection.query(query, function(err, res) {
      // Error Handler
    if(err) throw err;

    // Show User message
    console.log('Inventory for Items < 5 In Stock is below...\n');
    console.log('  ID  |      Product Name      |  Department Name  |   Price  | In Stock');

    for (var i = 0; i < res.length; i++) {
      var item_id = res[i].item_id + ''; //convert to string 
      var product_name = res[i].product_name + ''; //convert to string 
      var department_name = res[i].department_name + ''; //convert to string 
      var price = res[i].price + ''; //convert to string 
      var stock_quantity = res[i].stock_quantity + ''; //convert to string 
      console.log('    ' + item_id + '            ' + product_name + '                   ' + department_name + '           ' + price + '   ' + stock_quantity);
    }//loop
    runSearch();
    connection.end(); // end the script/connection
  }); //close connection
  
}//close low inventory
function addInventory() {
  // Running the View Products Function (case 1) and then asking user for unput after callback
 // viewProducts(function(){

    // Prompt user for re-stock item
    prompt.start();
    console.log('\nWhich item do you want to restock?');
    prompt.get(['restockItemID'], function (err, result) {
      
      // Show Item ID selected
      var restockItemID = result.restockItemID;
      console.log('You selected to re-stock Item # ' + restockItemID + '.');

      // Prompt for how many more items
      console.log('\nHow many items will you restock?');
     prompt.get(['restockCount'], function(err, result){
        
        //Show Restock Count selected
        var restockCount = result.restockCount;
        console.log('You selected to re-stock ' + restockCount + ' items.');
        restockCount = parseInt(restockCount); // convert to integer

        if(Number.isInteger(restockCount)){

          // Query for current item inventory
          connection.query('SELECT stock_quantity FROM Products WHERE ?', [{item_id: restockItemID}], function(err, res){

            // Check if the item Id was valid (i.e. something was returned from mySQL)
            if(res == undefined){
              
              console.log('Sorry... We found no items with Item ID "' +  restockItemID + '"');
              //connection.end(); // end the script/connection

            }
            // Valid Item ID, so add Bamazon Inventory with stowing quantity <-- more Bamazon lingo ;)
            else{
              
              var bamazonQuantity = res[0].stock_quantity;
              var newInventory = parseInt(bamazonQuantity) + parseInt(restockCount); // ensure integers

              // Update Database with new items
              connection.query('UPDATE products SET ? WHERE ?', [{stock_quantity: newInventory}, {item_id: restockItemID}], function(err, res){
                if(err) throw err; // Error Handler

                console.log('\nInventory updated successfully! How customer-centric!') // Inside jokes for days!
                connection.end(); // end the script/connection

              }); // end inventory update query
            
            }

          }); // end current quantity query
        }
             
        else{
          console.log('Only whole items can be added. Integers only!')
          connection.end(); // end the script/connection
        }

      }); // end prompt 2 (amount to add)

    }); // end prompt 1 (item id)

  //}); // end case 1 callback

}


// ---------------------------------------------------------------------------------
//function that allows user to search based on song name 
//prompts for start and end input, searches the database, and returns response to console with the specified headline
function addProduct() {
  // Prompt user for new item details
  prompt.start();
  console.log('\nComplete the new product details:');
  prompt.get(['item_id','product_name', 'department_name', 'price', 'stock_quantity'], function (err, result) {

    // Collect/parse variables
    var item_id = result.item_id;
    var product_name = result.product_name;
    var department_name = result.department_name;
    var price = result.price;
    var stock_quantity = result.stock_quantity;
    price = parseInt(price);
    stock_quantity = parseInt(stock_quantity);
    // Update Database
    connection.query('INSERT INTO products SET ?', {
      item_id:item_id, 
      product_name: product_name,
      department_name: department_name,
      price: price,
      stock_quantity: stock_quantity
    }, function(err, res){

      // Slighly more refined Error Handler
      if(err){
        console.log(err);
        //console.log('\nSorry. The SQL database could not be updated.\n' +
          //'Please ensure you entered the price and quantity as numbers!');
        connection.end(); // end the script/connection
      }
      else{
        console.log('\nInventory updated successfully!')
        connection.end(); // end the script/connection
      }
    });
  });
}
}