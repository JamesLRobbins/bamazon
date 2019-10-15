// Connections

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "James",

    password: "Autumn9603$",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;

    managerView();
})

//Display Manager Options

function managerView() {
    inquirer
        .prompt(
            {
            name: "options",
            type: "list",
            message: "Please select option",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }).then(function(user) {
            switch(user.options) {
                case "View Products for Sale":
                viewInventory();
                break;
                case "View Low Inventory":        
                lowInventory();
                break;
                case "Add to Inventory":
                addInventory();
                break;
                case "Add New Product":
                newProduct();
                break;
              }
          
        })   
}

function viewInventory() {
    var query = "SELECT * FROM products";

                  connection.query(query, function(err, res) {
                      if (err) throw err;

                      for (var i = 0; i < res.length; i++) {
                        console.log("Item ID: " + res[i].item_id + " Item: " + res[i].product_name + " // Department: " + res[i].department_name + " // Price:" + "$" + res[i].price + " // Current Inventory: " + res[i].stock_quantity + "\n")
                      }
                      managerView();
                })               
}

function lowInventory() {
    var query = "SELECT * FROM products";

    connection.query(query, function(err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5) {
              console.log("Low Inventory: Item ID: " + res[i].item_id + " Item: " + res[i].product_name + " // Department: " + res[i].department_name + " // Price:" + "$" + res[i].price + " // Current Inventory: " + res[i].stock_quantity + "\n")
            }
        }
        managerView();
    })
};

function addInventory() {

	inquirer.prompt([
		{
			name: "product_ID",
			type: "input",
			message: "Enter product ID that you would like to add stock to."
		},
		{
			name: "stock",
			type: "input",
			message: "How much stock would you like to add?"
		}
	]).then(function(answer) {

		// Pushes new stock to database.
		connection.query("SELECT * FROM products", function(err, results) {
			
			var chosenItem;

			// Gets product who's stock needs to be updated.
			for (var i = 0; i < results.length; i++) {
				if (results[i].item_id === parseInt(answer.product_ID)) {
					chosenItem = results[i];
				}
			}

			// Adds new stock  to existing stock.
			var updatedStock = parseInt(chosenItem.stock_quantity) + parseInt(answer.stock);

			console.log("Updated stock: " + updatedStock);

			// Updates stock for selected product in database.
			connection.query("UPDATE products SET ? WHERE ?", [{
				stock_quantity: updatedStock
			}, {
				item_id: answer.product_ID
			}], function (err, res) {
				if (err) {
					throw err;
				} else {

					// Lets manager select new action.
					managerView();
				}
			});
			
		});

	});
};

function newProduct() {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "What new item is being added?"
        },
        {
            name: "deptName",
            type: "input",
            message: "What department?"
        },
        {
            name: "price",
            type: "input",
            message: "What is the price per unit?"   
        },
        {
            name: "stock",
            type: "input",
            message: "How much inventory is being added?"
        }
          
    ]).then(function(answer) {
        connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: answer.item,
                department_name: answer.deptName,
                price: answer.price,
                stock_quantity: answer.stock
            },
            function(err) {
                if (err) throw err;
                console.log("Item added successfully!");
                managerView();
            }
        )
    })
};