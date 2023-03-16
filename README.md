# SQL: Employee Tracker

## Description

The aim of this project was to build a command-line application that manages a company's employee database, using Node.js, Inquirer and MySQL.

## Installation

Clone the project onto your machine, then run the following line of code in your terminal to install the needed packages:

```
npm i
```

## Usage 

Once the packages have been installed, run the following line of code in your terminal:

```
node server.js
```

After starting the application from the command line, the user is presented with a list of questions asking what they would like to do. 

When selecting one of the view options (Employees, Roles, Departments), the user is presented with a table presenting the information. The user is also able to view Employee's by their manager. 

When choosing to add a Department, the user will be asked for the name of the new department, and will then receive a success message when it is added to the database. When adding a new role, the user will be asked for the Salary and Department. When adding a new Employee, the user will be asked for the Role and Manager.

The user is also able to update an Employee's Role and Manager, as well as delete an Employee, Role and Department. They will be presented with a list of values to do this.

Another option is to view the total utilized budget of a department, which will present the combined salaries of all employees in that department.