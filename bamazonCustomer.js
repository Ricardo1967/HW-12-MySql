var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",
    password: "",
    database: "bamazon_db"
});

connection.connect(function(err) {
if(err) throw err;
console.log("connected as id " + connection.threadId + "\n");
afterConnection();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    
    promptUser()
  });
}

function promptUser(){
    inquirer.prompt([
        {
            name: "product",
            type: "list",
            choices: function() {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                    choiceArray.push(results[i].product_name);
                }
                return choiceArray;
            },
            message: "What product would you like to purchase?"
        },
        {
            name: "amount",
            type: "input",
            message: "How many would you like to purchase?"
        }
    ]).then(function(answer) {
        var chosenProduct;
        for (var i = 0; i < results.length; i++) {
            if (results[i].product_name === answer.product) {
                chosenProduct = results[i];
            }
        }

        if (chosenProduct.stock_quantity > parseInt(answer.amount)) {
            connection.query("UPDATE products SET ? WHERE ?", [
            {
                stock_quantity: chosenProduct.stock_quantity - parseInt(answer.amount)
            },
            {
                id: chosenProduct.id
            }], function(error) {
                if (error) throw err;
                
                console.log("Item Name: " +  chosenProduct.product_name);
                console.log("Item Count: " + parseInt(answer.amount));
                console.log("-----------------------------");
                console.log("Total: " + "$" + (chosenProduct.price * parseInt(answer.amount)));
                display();
                run();
            })
        } else {
            console.log("Insufficient stock.");
            display();
            run();
        }
    });
}



