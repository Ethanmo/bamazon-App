var mysql = require('mysql');
var inquirer = require('inquirer');
require("dotenv").config();


var commandList = ['View Product Sales by Department', 'Create New Department'];

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.mysqlkey,
    database: "bamazon"
});

inquirer.prompt([
    {
        type:"list",
        name:"command",
        message:"Choose your command:",
        choices:commandList
    }
]).then(function(user){
    switch(user.command){
        case commandList[0]:
            viewByDep();
            break;
        case commandList[1]:
            addDepartment();
    }
})

function viewByDep(){
    var queryStr = 'SELECT department_name,SUM(product_sales) as total FROM products GROUP BY department_name;';
    connection.query(queryStr, function(err, res){
        //console.log(res);
        for (var i = 0; i < res.length; i++){
            var depName = res[i].department_name;
            var depSales = res[i].total;
            var updateQuery = "UPDATE bamazon.departments SET total_profit = " + depSales + " - over_head_costs, product_sales = " + depSales + 
                                " WHERE department_name = '" + depName + "'";
            connection.query(updateQuery, function(error, result){
                if (error) throw error;
            })
        }
        connection.query("SELECT * FROM departments", function(error, result){
            console.table(result);
        })
        connection.end();
    })

}

function addDepartment(){
    inquirer.prompt([
        {
            type:"input",
            name:"department_name",
            message:"Name of the new department:"
        },
        {
            type:"input",
            name:"over_head_costs",
            message:"Over head costs for the new department:"
        }
    ]).then(function(user){
        connection.query(
            "INSERT INTO bamazon.departments SET ?",
            {
                department_name:user.department_name,
                over_head_costs:user.over_head_costs,
                product_sales:0,
                total_profit: 0-user.over_head_costs
            },
            function(err, res){
                if (err) throw err;
                console.log("New department added!")
                connection.query("SELECT * FROM bamazon.departments WHERE department_name = '" + user.department_name + "'", function(error, result){
                    if (error) throw error;
                    console.table(result);
                })
                connection.end();
            }
        )
    })
}