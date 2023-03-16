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
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add Department", "Add Role", "Add An Employee", "Update Employee Role", "Update Employee's Manager", "View the total utilized budget of a department"],
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
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add An Employee':
                addAnEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case "Update Employee's Manager":
                updateEmployeeManager();
                break;
            case 'View the total utilized budget of a department':
                viewDeptSalary();
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
    const query = `SELECT role.id, role.title, role.salary, department.name AS department
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

addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the new Department?',
            name: 'newDept'
        }
    ]).then((response) => {
        const query = `INSERT INTO department SET ?`;
        db.query(query, 
        {
           name: response.newDept,
        },
        (err, result) => {
            if (err) throw err;
            console.log(`\n ${response.newDept} successfully added to database! \n`);
            init();
        })
    })
};

addRole = () => {
    let query = `SELECT * FROM department;`;
    db.query(query, (err, results) => {
        if (err) throw err;
        let departments = results.map(department => ({name: department.name, value: department.id}));
        inquirer.prompt([
            {
                type: 'input',
                message: 'What is the title of the role you want to add?', 
                name: 'title'
            },
            {
                type: 'input',
                message: 'What is the salary of the role you want to add?', 
                name: 'salary' 
            },
            {
                type: 'list',
                message: 'Which department do you want to add the new role to?', 
                choices: departments,
                name: 'deptName'
            }
        ]).then((response) => {
            let query = `INSERT INTO role SET ?`
            db.query(query, 
            {
                title: response.title,
                salary: response.salary,
                department_id: response.deptName,
            },
            (err, result) => {
                if (err) throw err;
                console.log(`\n ${response.title} successfully added to database! \n`);
                init();
            })
        })
    })
};

addAnEmployee = () => {
    let query = `SELECT * FROM role;`;
    db.query(query, (err, results) => {
        if (err) throw err;
        let roles = results.map(role => ({name: role.title, value: role.id}));
            let query = `SELECT * FROM employee`;
            db.query(query, (err, results) => {
                if (err) throw err;
                let employees = results.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id}));
        inquirer.prompt([
            {
                type: 'input',
                message: "What is the employee's first name", 
                name: 'firstName'
            },
            {
                type: 'input',
                message: "What is the employee's last name?", 
                name: 'lastName' 
            },
            {
                type: 'list',
                message: "What is the employee's title?", 
                choices: roles,
                name: 'role'
            },
            {
                type: 'list',
                message: "Who is the employee's manager?", 
                choices: employees,
                name: 'manager'
            }
        ]).then((response) => {
            let query = `INSERT INTO employee SET ?`;
            db.query(query,
                {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    role_id: response.role,
                    manager_id: response.manager
                },(err, result) => {
                    if (err) throw err;
                    console.log(`\n ${response.firstName} ${response.lastName} successfully added to database! \n`);
                    init();
                })
            })
        })
    })
};

updateEmployeeRole = () => {
    let query = `SELECT * FROM role;`;
    db.query(query, (err, results) => {
        if (err) throw err;
        let roles = results.map(role => ({name: role.title, value: role.id}));
            let query = `SELECT * FROM employee`;
            db.query(query, (err, results) => {
                if (err) throw err;
                let employees = results.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id}));
        inquirer.prompt([
            {
                type: 'list',
                message: "What is the employee's name?", 
                choices: employees,
                name: 'employee'
            },
            {
                type: 'list',
                message: "What is the employee's new role?", 
                choices: roles,
                name: 'newRole'
            }
        ]).then((response) => {
            console.log(response.employee);
            console.log(response.newRole);
            let query = `UPDATE employee SET ? WHERE ?`;
            db.query(query,
                [{
                    role_id: response.newRole,
                },
                {
                    id: response.employee,
                }],(err, result) => {
                    if (err) throw err;
                    console.log(`\n Successfully updated employee's role \n`);
                    init();
                })
            })
        })
    })
};

updateEmployeeManager = () => {
    let query = `SELECT * FROM employee`;
        db.query(query, (err, results) => {
            if (err) throw err;
            let employees = results.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id}));
        inquirer.prompt([
            {
                type: 'list',
                message: "What is the employee's name?", 
                choices: employees,
                name: 'employee'
            },
            {
                type: 'list',
                message: "Who is the employee's new manager?", 
                choices: employees,
                name: 'manager'
            }
        ]).then((response) => {
            let query = `UPDATE employee SET ? WHERE ?`;
            db.query(query,
                [{
                    manager_id: response.manager,
                },
                {
                    id: response.employee,
                }],(err, result) => {
                    if (err) throw err;
                    console.log(`\n Successfully updated employee's manager \n`);
                    init();
                })
         })
    })
};

viewDeptSalary = () => {
    const query = `SELECT * FROM department ORDER BY id ASC;`;
    db.query(query, (err, results) => {
        let departments = results.map(department => ({name: department.name, value: department.id}));
        if (err) throw err;
    inquirer.prompt([
        {
            type: 'list',
            message: 'Which Department would you like to view?', 
            choices: departments,
            name: 'deptName'
        }
    ]).then((response) => {
        let query = `SELECT SUM(salary) AS total_salary FROM role WHERE ?`;
        db.query(query,
            {
                department_id: response.deptName,
            }, (err, results) => {
            if (err) throw err;
            console.log(`\n The total utilized budget of ${response.deptName} is \n`);
            console.table(results);
            })
        })
    })
};

