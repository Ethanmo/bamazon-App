var mysql = require('mysql');
var inquirer = require('inquirer');
require("dotenv").config();


var productsList = [];
var currentStock;
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.mysqlkey,
    database: "bamazon"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("connenction as id " + connection.threadId);
    runBamazon();
    //connection.end();
})

function runBamazon(){
    connection.query("SELECT * FROM bamazon.products", function(err, res){
        if (err) throw err;
        //productsInfo = res;
        console.table(res);
        for (var i = 0; i < res.length; i++){
            productsList.push(res[i].product_name);
        } 
        //connection.end();    
        buyStuff();
    })  
}

function trimName(str){
    var res = str.replace(/\W/g, '').toLowerCase();
    return res;
}

function buyStuff(){
    inquirer.prompt([
        {
            type:'input',
            name:'product_name',
            message:'What would you like to buy?',
        },
        {
            type:'input',
            name:'amount',
            message:'How many would you like?'
        }
    ]).then(function(user){
        //console.log(user);
        if (!productsList.includes(user.product_name)){
            console.log("We don't sell " + user.product_name + " here");
            return;
        }
        var selectQuery = "SELECT * FROM bamazon.products WHERE product_name ='" + user.product_name + "'";
        connection.query(selectQuery, function(err, res){
            if (err) throw err;
            //console.log(res);
            currentStock = res[0].stock_quantity;
            if (user.amount > currentStock){
                console.log("Insufficient quantity!!");
            } else {
                currentStock -= user.amount;
                var totalPrice = res[0].price * user.amount;
                console.log("That will be " + totalPrice + " dollars.");
                var queryStr = "UPDATE bamazon.products SET stock_quantity = " + currentStock + 
                                ", product_sales = product_sales + " + totalPrice +
                                " WHERE product_name = '" + user.product_name + "'"
                connection.query(queryStr, function(error, result){
                    if (error) throw error;
                    console.log("Current stock for " + user.product_name + " is " + currentStock);
                });
                connection.end();
            }
        })
    })
}

