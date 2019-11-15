var mysql = require('mysql');
var Table = require('cli-table');
var inquirer = require('inquirer');
const chalk = require('chalk');
 

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'bamazon'
});
 
connection.connect(function(error) {
  if (error) throw error;
  welcome();
});


function welcome(){
  console.log(chalk.blue.bold("\n\t<<<<<<< WELCOME TO BAMAZON >>>>>>>"));
  products()
}
 

function products(){
connection.query('SELECT * from products', function (error, results){
    if (error) throw error;
    
    var table = new Table({
        head: ['ID', 'Product','Price','Quantity'],
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
        , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
        , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
        , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
      
        style: {
            head: ['green'],
            compact: false,
            colAligns: ['center'],

        }
    });
    console.log(chalk.bold("\n\tlist of items you can purchase"));
    console.log("\t------------------------------\n");
    for (var i=0; i< results.length; i++){
              table.push([results[i].item_id, results[i].product_name, "$" + results[i].price, results[i].stock_quantity]);

    }
    console.log(table.toString());
    appleProducts();
  })
}
  
  function appleProducts(){
    inquirer.prompt([
    {
      type: 'input',
      name: "id",
      message: "What is product id number?",
      validate: function(value){
        if (value!=="" && isNaN(value) == false &&  value<11 ) {
            return true;
        } else {
            return chalk.bgRed("Enter a valid ID");
        }
    }
      
    },
    {
        type: 'input',
        name: 'quantity',
        message: "How many units?",
        validate: function(value){
          if (value!=="" && isNaN(value) == false) {
              return true;
          } else {
              return chalk.bgRed("Enter a number");
          }
      }
 },
])
.then(function(answer){
  var query = "SELECT item_id,product_name, stock_quantity, price FROM products WHERE item_id = ?";
  connection.query(query, [answer.id], function(error, result){
      for (var i = 0; i <result.length; i++) {
          console.log(chalk.greenBright("Your request: ") + (result[i].product_name) + " " + ("quantity") + " " + (answer.quantity));
          console.log("____________________________________")
          if(result[i].stock_quantity <answer.quantity){
              console.log (chalk.red("Not enough quantity"));
              nextOption();
          }
          else {
              
              console.log(("Purchase made"));
              var purchaseTotal = result[i].price * answer.quantity;
              console.log(("Total COST is $" + purchaseTotal));
            
              var newQty = result[i].stock_quantity - answer.quantity;
              console.log (chalk.green("Quantity remaining: ") + ( + " " + newQty));
              console.log("____________________________________")
              connection.query("UPDATE products SET stock_quantity = " + newQty +" WHERE item_id = " + result[i].item_id, function(error, result){
              nextOption()
              });
          }
      }
  })
})
}

function nextOption(){
  inquirer.prompt([
      {
          name: "continue",
          type: "confirm",
          message:("Try again?")
      }
  ])
  .then(function(response){
      if (response.continue == true){
          products();
      }
      else{
          console.log ("Good Buy!");
          connection.end();
      }
  })
}

