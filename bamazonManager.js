var mysql = require('mysql');
var inquirer = require('inquirer');
var numProducts;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Hermas92*",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    promptUser();
});

var promptUser = function(){
	connection.query('SELECT * FROM Products', function(err, res) {
        numProducts = res.length;
	});

	inquirer.prompt([{
        name: "option",
        type: "list",
        message: "Choose a menu option:",
        choices: ["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"]
    }]).then(function(answer) {
        if(answer.option === "View Products for Sale"){
        	displayItems();
        	
        	inquirer.prompt([{
        	name: "option2",
        	type: "list",		
        	message: "Choose a menu option:",
            choices: ["Return to main menu","Logout"]	

        	}]).then(function (answer) {
        
        		if(answer.option2 === "Return to main menu") {

        				promptUser();
        		} else {

        			connection.end();

        		}
        	});
        }
        else if(answer.option === "View Low Inventory"){
        	connection.query('SELECT * FROM Products WHERE StockQuantity<5', function(err, res) {
		        for (var i = 0; i < res.length; i++) {
		            console.log("");
		            console.log("ID: " + res[i].ItemID);
		            console.log("Name: " + res[i].ProductName);
		            console.log("Price: $" + res[i].Price);
		            console.log("Quantity: " + res[i].StockQuantity);
		        }
		        console.log("");

		    inquirer.prompt([{
        	name: "option3",
        	type: "list",		
        	message: "Choose a menu option:",
            choices: ["Return to main menu","Logout"]	

        	}]).then(function (answer) {
        
        		if(answer.option3 === "Return to main menu") {

        				promptUser();
        		} else {

        			connection.end();

        		}
        	});	



		    });
        }
        else if(answer.option == "Add to Inventory"){
        	inquirer.prompt([{
		        name: "productID",
		        type: "input",
		        message: "Enter the ID of the product you would like to restock: ",
		        validate: function(value) {
		            if (isNaN(value)==false && value>0 && value<=numProducts)
		                return true;
		            else
		                return false;
		        }
		    }, {
		        name: "numUnits",
		        type: "input",
		        message: "How many units would you like to add? ",
		        validate: function(value) {
		            if (isNaN(value) == false) {
		                return true;
		            } else {
		                return false;
		            }
		        }
		    }]).then(function(answer) {
		        connection.query('SELECT * FROM Products WHERE ItemID = '+answer.productID, function(err, res) {
		        	var newQuantity = parseInt(res[0].StockQuantity) + parseInt(answer.numUnits);
		        	connection.query("UPDATE Products SET ? WHERE ?", [{
			            StockQuantity: newQuantity
			        },
			        {
			        	ItemID: answer.productID
			        }], function(err, resp) {
			            console.log("Add to Inventory successful. You now have " + newQuantity + " units");
			        	promptUser();
			        });
		        });
		    });
        }
        else if(answer.option == "Add New Product"){
		    inquirer.prompt([
			    {
			        name: "product",
			        type: "input",
			        message: "What is the name of the product?"
			    }, {
			        name: "department",
			        type: "input",
			        message: "What department is the product in?"
			    }, {
			        name: "price",
			        type: "input",
			        message: "What price will you sell this product for?",
			        validate: function(value) {
			            if (isNaN(value) == false) {
			                return true;
			            } else {
			                return false;
			            }
			        }
			    }, {
			    	name: "quantity",
			    	type: "input",
			    	message: "What is the stock quantity of this product?",
			    	validate: function(value) {
			            if (isNaN(value) == false) {
			                return true;
			            } else {
			                return false;
			            }
			        }
		    }]).then(function(answer) {
		        connection.query("INSERT INTO Products SET ?", {
		            ProductName: answer.product,
		            DepartmentName: answer.department,
		            Price: answer.price,
		            StockQuantity: answer.quantity
		        }, function(err, res) {
		            console.log("Your product was successfully added.");
		            promptUser();
		        });
		    });
        }
    });
};

var displayItems = function() {
    connection.query('SELECT * FROM Products', function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("");
            console.log("ID: " + res[i].ItemID);
            console.log("Name: " + res[i].ProductName);
            console.log("Price: $" + res[i].Price);
            console.log("Quantity: " + res[i].StockQuantity);
        }
        console.log("");
    });
};