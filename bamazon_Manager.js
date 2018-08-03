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
    startManager();
});

function startManager() { 
    inquirer.prompt({ 
        name: "menuOptions",
        type: "list",
        message:"Menu Options:",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
    }).then(function(answer) {
        if (answer.menuOptions === "View Products for Sale") { 
            productsForSale();
        } else if (answer.menuOptions === "View Low Inventory") { 
            lowInventoryItems();
        } else if (answer.menuOptions === "Add to Inventory") {
            addToInventory();
        }
    })
};

function productsForSale() { 
    console.log("Displaying all available products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        table.draw(res);
        startManager();
    });
};

function lowInventoryItems() { 
    console.log("Displaying all products with low inventory...\n");
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
        if (err) throw err;

        if (res.length > 0) { 
            table.draw(res);
        } else { 
            console.log("=================================");
            console.log(blueBold("There are no items with low inventory."));
            console.log("=================================");
            startManager();
        }
    });
};

function addToInventory() { 
    inquirer.prompt([
        {
            name: "itemChoice", 
            type: "input",
            message: "Enter the ID of the product you'd like to update inventory for:"
        },
        {
            name: "addQuantity",
            type: "input",
            message: "Enter the quantity:"
        }
        ]).then(function(answer) { 
            connection.query("SELECT * FROM products WHERE item_id=?", answer.itemChoice, 
            function(err, res) { 
                if (err) throw err;

                var updateID;
                var newStock;
                for (var i = 0; i < res.length; i++) { 
                    if (res[i].item_id === answer.itemChoice) { 
                        updateID = res[i];
                        var newStock = ((updateID.stock_quantity) + parseInt(answer.addQuantity));
                    } else {
                        console.log("we do not have that item available");
                    }
                

                stockUpdateConfirmation(newStock, updateID);
                }
            })
        })
};

function stockUpdateConfirmation(newStock, updateID) { 
    inquirer.prompt({
        type: "confirm",
        name: "stockConfirm",
        message: "Are you sure you want to make this stock change?", 
        default: true
    }).then(function(userConfirm) { 
        if (userConfirm.confirmPurchase === true) { 
            connection.query("UPDATE products SET ? WHERE ?", 
            [
                { 
                    stock_quantity: newStock
                }, 
                {
                    item_id: updateID
                }
            ],
                function(err, res) {});
                console.log("=================================");
                console.log(blueBold("Product was successfully updated!"));
                console.log("=================================");

                startManager();

                } else {
                console.log("=================================");
                console.log(blueBold("No worries, maybe next time!"));
                console.log("=================================");

                startManager();
            }
        });
};




// function purchaseWant() { 
//     inquirer.prompt({
//         type: "confirm",
//         name: "makeAPurchase",
//         message: "Would you like to make a purchase?", 
//         default: true
//     }).then(function(userConfirm) { 
//         if (userConfirm.makeAPurchase === true) {
//             userPrompt();
//         } else { 
//             console.log("=================================");
//             console.log(blueBold("Thank you! Come back soon!"));
//             console.log("=================================");
//             process.exit(1);
//         }
//     })
// };

// function userPrompt() { 
//     inquirer.prompt([
//         {
//             name: "itemChoice", 
//             type: "input", 
//             message: "Enter the ID of the product you would like to buy:"
//         },
//         {
//             name: "itemQuantity", 
//             type: "input", 
//             message: "Enter the quantity:"
//         }
//     ]).then(function(answer) {
//         connection.query("SELECT * FROM products WHERE item_id=?", answer.itemChoice,
//             function(err, res) { 
//             if (err) throw err;
//                 for (var i = 0; i < res.length; i++) { 
//                     if (answer.itemChoice > res[i].stock_quantity) { 
//                         console.log("\n===================================================");
//                         console.log(red("Sorry we do not have enough " + res[i].product_name + "to fulfill your order."));
//                         console.log("Please come back later!"); 
//                         console.log("===================================================\n");
//                         start(); 
//                     } else { 
//                         console.log("\n===================================================");
//                         console.log(blueBold("We can fulfill your order!"));
//                         console.log("---------------------");
//                         console.log("Item: " + res[i].product_name);
//                         console.log("Quantity: " + answer.itemQuantity);
//                         console.log("Price: " + res[i].price);
//                         console.log("---------------------");
//                         console.log(blueBold("Total: $" + res[i].price * answer.itemQuantity));
//                         console.log("===================================================\n");
                        
//                         var newStock = (res[i].stock_quantity - answer.itemQuantity);
//                         var purchaseID = (answer.itemChoice);

//                         orderConfirmation(newStock, purchaseID); 
//                     }
//                 }
//             })
//         })
// };

// function orderConfirmation(newStock, purchaseID) { 
//     inquirer.prompt({
//         type: "confirm",
//         name: "confirmPurchase",
//         message: "Are you sure you want to make this purchase?", 
//         default: true
//     }).then(function(userConfirm) { 
//         if (userConfirm.confirmPurchase === true) { 
//             connection.query("UPDATE products SET ? WHERE ?", 
//             [
//                 { 
//                     stock_quantity: newStock
//                 }, 
//                 {
//                     item_id: purchaseID
//                 }
//             ],
//                 function(err, res) {});
//                     console.log("=================================");
//                     console.log(blueBold("Transaction completed. Thank you."));
//                     console.log("=================================");

//                     makeAnotherPurchase();
//                 } else {
//                     console.log("=================================");
//                     console.log(blueBold("No worries, maybe next time!"));
//                     console.log("=================================");
//                     lookAtOtherItems();
//                 }
//         });
// };

// function lookAtOtherItems() { 
//     inquirer.prompt({
//         type: "confirm",
//         name: "otherItems",
//         message: "Would you like to look at other items?", 
//         default: true
//     }).then(function(userConfirm) { 
//         if (userConfirm.anotherPurchase === true) {
//             start();
//         } else { 
//             console.log("=================================");
//             console.log(blueBold("Thank you! Come back soon!"));
//             console.log("=================================");
//             process.exit(1);
//         }
//     })
// }


// function makeAnotherPurchase() { 
//     inquirer.prompt({
//         type: "confirm",
//         name: "anotherPurchase",
//         message: "Would you like to make another purchase?", 
//         default: true
//     }).then(function(userConfirm) { 
//         if (userConfirm.anotherPurchase === true) {
//             start();
//         } else { 
//             console.log("=================================");
//             console.log(blueBold("Thank you for shopping with us!"));
//             console.log("=================================");
//             process.exit(1);
//         }
//     })
// };