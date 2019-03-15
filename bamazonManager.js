var mysql = require('mysql');
var inquirer = require('inquirer');
require("dotenv").config();


var commandList = ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'];

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.mysqlkey,
    database: "bamazon"
});

inquirer.prompt([
    {
        type:'list',
        name:'command',
        message:'Choose your command: ',
        choices: commandList
    }
]).then(function(user){
    switch(user.command){
        case commandList[0]:
            viewProducts();
            break;
        case commandList[1]:
            lowInv();
            break;
        case commandList[2]:
            addToInv();
            break;
        case commandList[3]:
            newProduct();
    }
    
})

function viewProducts(){
    connection.query("SELECT * FROM bamazon.products", function(err, res){
        if (err) throw err;
        console.table(res);
    })       
    connection.end();
}

function lowInv(){
    connection.query("SELECT * FROM bamazon.products WHERE stock_quantity < 5", function(err, res){
        if (err) throw err;
        console.table(res);
    })
    connection.end();
}

function addToInv(){
    inquirer.prompt([
        {
            type:"input",
            name:"product_name",
            message:"Product you want to add?"
        },
        {
            type:"input",
            name:"amount",
            message:"Amount you want to add?"
        }
    ]).then(function(ans){
        var queryStr = "UPDATE bamazon.products SET stock_quantity = stock_quantity + " + ans.amount +
                        " WHERE product_name = '" + ans.product_name + "'";
        connection.query(queryStr, function(err, res){
            if (err) throw err;
            console.log("Stock updated!");
            connection.query("SELECT * FROM bamazon.products WHERE product_name = '" + ans.product_name + "'", function(error, result){
                if (error) throw error;
                console.table(result);
            })
            connection.end();
        })
    })
}

function newProduct(){
    inquirer.prompt([
        {
            type:"input",
            name:"product_name",
            message:"Name of the new product?"
        },
        {
            type:"input",
            name:"department_name",
            message:"Name of the department?"
        },
        {
            type:"input",
            name:"price",
            message:"Price of the new product?"
        },
        {
            type:"input",
            name:"stock_quantity",
            message:"Stock quantity of the product?"
        }
    ]).then(function(ans){
        connection.query(
            "INSERT INTO products SET ?", 
            {
                product_name: ans.product_name,
                department_name: ans.department_name,
                price: ans.price,
                stock_quantity: ans.stock_quantity
            },
            function(err, res){
                if (err) throw err;
                connection.query("SELECT * FROM products WHERE product_name = '" + ans.product_name + "'", function(error, result){
                    if (error) throw error;
                    console.table(result);
                })
                connection.end();
            })
    })
}