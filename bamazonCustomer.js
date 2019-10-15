// Connections

var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "James",

    password: "Autumn9603$",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    displayStock();
});

// Function to display Inventory

function displayStock() {
    var query = "SELECT * FROM products";

    connection.query(query, function(err, res) {
        if (err) throw err;
        
        for (var i = 0; i < res.length; i++) {
            console.log("\nItem ID: " + res[i].item_id + " Item: " + res[i].product_name + " // Department: " + res[i].department_name + " // Price:" + "$" + res[i].price + " // Current Inventory: " + res[i].stock_quantity + "\n")
        }

       userPrompts();
    })
}

// User Prompts

function userPrompts() {
    inquirer
        .prompt([
        {
            name: "id",
            type: "input",
            message: "What is the item ID you'd like to purchase?"
        },
        {
            name: "quantity",
            type: "input",
            message: "Please enter the quantity."

        }
    ]).then(function(user) {
        var item = user.id;
        var quantity = user.quantity;

        var query = "SELECT * FROM products WHERE ?";
        connection.query(query, { item_id: user.id}, function(err, res) {
            if (err) throw err;

            var inventory = res[0].stock_quantity;
            var totalPrice = parseInt(res[0].price) * parseInt(user.quantity);

            if (quantity <= inventory) {
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: inventory - quantity
                        },
                        {
                            item_id: item
                        }
                    ],
                    function (err) {
                        if (err) throw err;
                        console.log("Congratulations!  You're total is " + totalPrice + " !" )
                        displayStock();      
                    }
                )

            } else {
                console.log("Insufficient Quantity");
                displayStock()
            }
        })
    })
}


