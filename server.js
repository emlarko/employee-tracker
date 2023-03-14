require('dotenv').config();
const inquirer = require('inquirer');
require('console.table');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: process.env.password,
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
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add An Employee", "Update Employee Role",  "Add Role", "Add Department"],
            name: 'firstInquiry' 
        }
    ]).then((response) => {
        switch (response.firstInquiry) {
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'View All Roles' :
                viewAllRoles();
                break;
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add An Employee':
                addAnEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Department':
                addDepartment();
                break;
        }
    })
  };

viewAllDepartments = () => {
    const query = `SELECT * FROM department ORDER BY id ASC;`;
    db.query(query, (err, results) => {
        if (err) throw err;
        console.table('\n', results, '\n');
        init();
    })
};

viewAllRoles = () => {
    const query = `SELECT role.id, role.title, role.salary, department.name AS department, department.id
    FROM role
    JOIN department ON role.department_id = department.id
    ORDER BY role.id ASC;`;
    db.query(query, (err, results) => {
    if (err) throw err;
    console.table('\n', results, '\n');
    init();
    })
};

  viewAllEmployees = () => {
    const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id)
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY employee.id;`;
    db.query(query, (err, results) => {
        if (err) throw err;
        console.table('\n', results, '\n');
        init();
    })
};

