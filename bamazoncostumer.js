var mysql = require('mysql');
var Table = require('cli-table');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'TiNuviEl3',
  database : 'bamazon'
});
 
connection.connect();
 

 
var productsArr = [];

function products(){
    


connection.query('SELECT * from products', function (error, results, fields) {
    if (error) throw error;
    
    var table = new Table({
        head: ['id', 'product','price','quantity'],
        style: {
            head: ['yellow'],
            compact: false,
            colAligns: ['center'],
        }
    });
    
    for (var i=0; i< results.length; i++){
              table.push([results[i].item_id, results[i].product_name, results[i].price, results[i].stock_quantity]);
        productsArr.push([results[i].item_id, results[i].product_name, results[i].price, results[i].stock_quantity]);
    }
    console.log(table.toString());
  });
  var questions = [
    {
      type: 'input',
      name: 'ID',
      message: "What is product id number?"
      
    },
    {
        type: 'input',
        name: 'quantity',
        message: "How many units?"
        
    },
];

inquirer.prompt(questions)
.then(answers => {
  console.log(JSON.stringify(answers, null, '  '));
  var costumerItem = [];
  for (var i = 0; i < productsArr.length; i++){
      
      var costumerId = parseInt(answers.ID);
      
      if(costumerId == productsArr[i][0]){
        costumerItem = productsArr[i];
        console.log(costumerItem);
        
      }
      
      

  }
    
var selectedStock = parseInt(costumerItem[3]);
var userStock = parseInt(answers.quantity);

  checkStock(selectedStock,userStock);
});
}
products();



function checkStock(databaseStock, costumerRequest){
    
    if (databaseStock>costumerRequest){
        console.log("purchase made");
    }
    else{
        console.log("Insufficient quantity!");
    }

}