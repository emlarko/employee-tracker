const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'waffle5296',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

  db.connect((err) => {
    if (err) throw err;
    init();
  });

  init = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ["View All Employees", "Add An Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"],
            name: 'firstInquiry' 
        }
    ]).then((response) => {
        switch (response.firstInquiry) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add An Employee':
                addAnEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'View All Roles' :
                viewAllRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
        }
    })
  }

  viewAllEmployees = () => {
    db.query('SELECT id, first_name, last_name FROM employee', (err, results) => {
        console.table(results);
        init();
    })
};
