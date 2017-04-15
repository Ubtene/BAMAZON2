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
    displayItems();
});

var displayItems = function() {
    connection.query('SELECT * FROM Products', function(err, res) {
        numProducts = res.length;
        for (var i = 0; i < numProducts; i++) {
            console.log("");
            console.log("ID: " + res[i].ItemID);
            console.log("Name: " + res[i].ProductName);
            console.log("Price: $" + res[i].Price);
        }
        console.log("");
        promptUser();
    });
};

var promptUser = function(){
    inquirer.prompt([{
        name: "productID",
        type: "input",
        message: "Enter the ID of the product you would like to buy: ",
        validate: function(value) {

            if (isNaN(value) === false && value>0 && value<=numProducts)
                return true;
            else
                console.log("");
                console.log("");
                console.log("Please provide a number, you have either entered an invalid number or worse no number at all!");
                return false;
        }
    }, {
        name: "numUnits",
        type: "input",
        message: "How many units would you like to buy?",
        validate: function(value) {
            if (isNaN(value) === false) 
                return true;
             else 
                console.log("You seem to have not indicated how many items you would like to purchase");
                return false;
            
        }}]).then(function(answer) {
        connection.query('SELECT * FROM Products WHERE ItemID = '+answer.productID, function(err, res) {
            if(res[0].StockQuantity < answer.numUnits) {
                console.log("Insufficient quantity!"); 

        inquirer.prompt([{
        name: "anythingElse",
        type: "list",
        message: "Sorry we couldn't provide that product, is there anything else you might need? ",
        choices: ["Shop for something else","Logout"]   

        }]).then(function(answer2) {

        if (answer2.anythingElse == "Shop for something else") {

            displayItems();

        } else {

            connection.end();

        };

            }) } else{
        		
                connection.query("UPDATE Products SET ? WHERE ?", [{
                    StockQuantity: res[0].StockQuantity - answer.numUnits
                },
                {
                    ItemID: answer.productID
                }], function(err, resp) {
                    console.log("Thank you for your purchase. You spent $" + res[0].Price*answer.numUnits);

        inquirer.prompt([{
        name: "anythingElse",
        type: "list",
        message: "Would you like to purchase anything else?",
        choices: ["Return to main menu","Logout"]   

        }]).then(function(answer3) {


        if (answer3.anythingElse == "Return to main menu") {

            displayItems();


        } else {

            connection.end();

        }


        }); 


                });

                
    
            };
        });
    });
};