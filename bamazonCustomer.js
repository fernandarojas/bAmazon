var mysql = require("mysql");
var inquirer = require("inquirer");

const Tablefy = require("tablefy");
let table = new Tablefy();

var clc = require("cli-color");
var blueBold = clc.blue.bold;
var red = clc.red;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    // Your password
    password: "Fer331248",
    database: "bamazon_DB"
});
  
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});

function start() { 
    console.log("Displaying all available products...\n");
        connection.query("SELECT * FROM products", function(err, res) {
            if (err) throw err;
            table.draw(res);
            purchaseWant();
        });
};


function purchaseWant() { 
    inquirer.prompt({
        type: "confirm",
        name: "makeAPurchase",
        message: "Would you like to make a purchase?", 
        default: true
    }).then(function(userConfirm) { 
        if (userConfirm.makeAPurchase === true) {
            userPrompt();
        } else { 
            console.log("=================================");
            console.log(blueBold("Thank you! Come back soon!"));
            console.log("=================================");
            process.exit(1);
        }
    })
};

function userPrompt() { 
    inquirer.prompt([
        {
            name: "itemChoice", 
            type: "input", 
            message: "Enter the ID of the product you would like to buy:"
        },
        {
            name: "itemQuantity", 
            type: "input", 
            message: "Enter the quantity:"
        }
    ]).then(function(answer) {
        connection.query("SELECT * FROM products WHERE item_id=?", answer.itemChoice,
            function(err, res) { 
            if (err) throw err;
                for (var i = 0; i < res.length; i++) { 
                    if (answer.itemChoice > res[i].stock_quantity) { 
                        console.log("\n===================================================");
                        console.log(red("Sorry we do not have enough " + res[i].product_name + "to fulfill your order."));
                        console.log("Please come back later!"); 
                        console.log("===================================================\n");
                        start(); 
                    } else { 
                        console.log("\n===================================================");
                        console.log(blueBold("We can fulfill your order!"));
                        console.log("---------------------");
                        console.log("Item: " + res[i].product_name);
                        console.log("Quantity: " + answer.itemQuantity);
                        console.log("Price: " + res[i].price);
                        console.log("---------------------");
                        console.log(blueBold("Total: $" + res[i].price * answer.itemQuantity));
                        console.log("===================================================\n");
                        
                        var newStock = (res[i].stock_quantity - answer.itemQuantity);
                        var purchaseID = (answer.itemChoice);

                        orderConfirmation(newStock, purchaseID); 
                    }
                }
            })
        })
};

function orderConfirmation(newStock, purchaseID) { 
    inquirer.prompt({
        type: "confirm",
        name: "confirmPurchase",
        message: "Are you sure you want to make this purchase?", 
        default: true
    }).then(function(userConfirm) { 
        if (userConfirm.confirmPurchase === true) { 
            connection.query("UPDATE products SET ? WHERE ?", 
            [
                { 
                    stock_quantity: newStock
                }, 
                {
                    item_id: purchaseID
                }
            ],
                function(err, res) {});
                    console.log("=================================");
                    console.log(blueBold("Transaction completed. Thank you."));
                    console.log("=================================");

                    makeAnotherPurchase();
                } else {
                    console.log("=================================");
                    console.log(blueBold("No worries, maybe next time!"));
                    console.log("=================================");
                    lookAtOtherItems();
                }
        });
};

function lookAtOtherItems() { 
    inquirer.prompt({
        type: "confirm",
        name: "otherItems",
        message: "Would you like to look at other items?", 
        default: true
    }).then(function(userConfirm) { 
        if (userConfirm.anotherPurchase === true) {
            start();
        } else { 
            console.log("=================================");
            console.log(blueBold("Thank you! Come back soon!"));
            console.log("=================================");
            process.exit(1);
        }
    })
}


function makeAnotherPurchase() { 
    inquirer.prompt({
        type: "confirm",
        name: "anotherPurchase",
        message: "Would you like to make another purchase?", 
        default: true
    }).then(function(userConfirm) { 
        if (userConfirm.anotherPurchase === true) {
            start();
        } else { 
            console.log("=================================");
            console.log(blueBold("Thank you for shopping with us!"));
            console.log("=================================");
            process.exit(1);
        }
    })
};