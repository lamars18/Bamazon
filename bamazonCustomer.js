//loads required npm packages 
//npm package to access sql database
// Require prompt node package 
var prompt = require('prompt');

// Require mySQL node package
var mysql = require('mysql');

//creates connection to database 
var connection = mysql.createConnection({
  host:"localhost",
  port: 3306,

  //Your username
  user:'root',

  //Your password 
  password: "H@ppy1234",
  database: 'bamazon'
});


connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
 readEntrys();
});
function readEntrys() {
  console.log("Selecting all entrys...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    
  console.log('Check out our selection...\n');

  // Set up table header
  console.log('  Item ID  |      Product Name      |  Department Name  |   Price  | In Stock');
  console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ')
  
  // Loop through database and show all items
  for(var i = 0; i < res.length; i++){

    var item_id = res[i].item_id + ''; // convert to string
    

    var product_name = res[i].product_name + ''; // convert to string
   
    var department_name = res[i].department_name + ''; // convert to string
    
    var price = '$' + res[i].price.toFixed(2) + ''; // convert to string
  
    var quantity = res[i].stock_quantity + ''; // convert to string 
    

    // Log table entry
    console.log('    ' + item_id + '            ' + product_name + '                   ' + department_name + '           ' + price + '   ' + quantity);
  }

  // =================================================================================================
 
 
// After the table is shown, ask the user to buy something
prompt.start();

// Ask for Item ID
console.log('\nWhich item do you want to buy?');
prompt.get(['purchItemID'], function (err, result) {
  
// Show Item ID selected
var purchItemID = result.purchItemID;
console.log('You selected Item # ' + purchItemID + '.');

// Then ask for Quanity (once user completed first entry)
console.log('\nHow many do you wish to buy?')
prompt.get(['purchItemQuantity'], function (err, result) {

// Show quantity selected
var purchItemQuantity = result.purchItemQuantity;
console.log('You selected to buy ' + purchItemQuantity + ' of these.');

// Once the customer has placed the order, check if store has enough of the product to meet the request
connection.query('SELECT stock_quantity FROM Products WHERE ?', [{item_id: purchItemID}], function(err, res){
    if(err) throw err; // Error Handler
    // Check if the item Id was valid (i.e. something was returned from mySQL)
    if(res[0] == undefined){
    console.log('Sorry... We found no items with Item ID "' +  purchItemID + '"');
      connection.end(); // end the script/connection
    }
    // Valid Item ID, so compare Bamazon Inventory with user quantity 
    else{
    var bamazonQuantity = res[0].stock_quantity;
    // Sufficient inventory
    if(bamazonQuantity >= purchItemQuantity){

    // Update mySQL database with reduced inventory
    var newInventory = parseInt(bamazonQuantity) - parseInt(purchItemQuantity); // ensure we have integers for subtraction & database
    connection.query('UPDATE Products SET ? WHERE ?', [{stock_quantity: newInventory}, {item_id: purchItemID}], function(err, res){
      if(err) throw err; // Error Handler
      }); // end inventory update query


    // Show customer their purchase total (need to query the price info from database)
    var customerTotal;
    connection.query('SELECT price FROM Products WHERE ?', [{item_id: purchItemID}], function(err, res){
            
    var purchItemPrice = res[0].price;
    customerTotal = purchItemQuantity*purchItemPrice.toFixed(2);

    console.log('\nYour total is $' + customerTotal + '.');
    connection.end(); // end the script/connection

    // ------------------------- Re factor for Executive Challenge ------------------------
    // Find the department for the purchase item
    //connection.query('SELECT department_name FROM Products WHERE ?', [{item_id: purchItemID}], function(err, res){
    //var itemDepartment = res[0].department_name;
              
    // Find the current Revenue for that department
    //connection.query('SELECT TotalSales FROM Departments WHERE ?', [{department_name: itemDepartment}], function(err, res){
    // var totalSales = res[0].TotalSales;

    // Calculate new sale revenue
    //var totalSales = parseFloat(totalSales) + parseFloat(customerTotal);

    // Add the revenue from each transaction to the TotalSales column for the related department.
    //connection.query('UPDATE Departments SET ? WHERE ?', [{TotalSales: totalSales}, {department_name: itemDepartment}], function(err, res){
    //  if(err) throw err; // Error Handler
    // console.log('Transaction Completed. Thank you!')
    // connection.end(); // end the script/connection

  }); // end new revenue update query
 
  //}); // end current revenue query

  //}); // end department name query 
 // -------------------------------------------------------------------------------------
 //}); // end customer purchase update query 
 }
 // Insufficient inventory
 else{
 console.log('Sorry... We only have ' +  bamazonQuantity + ' of those items. Order cancelled.');
 connection.end(); // end the script/connection
}
}

    }); // end item quantity query

  }); // end of prompt 2

}); // end of prompt 1

}); // end of main query

}