const inquirer = require('inquirer');
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'MangoShaman24!',
    database: 'employees_db'
  },
  console.log(`Connected to the books_db database.`)
);

inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'selection',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department','add a role', 'add an employee',  'update an employee role'],
    },
  ]) .then((data) => {
    // console.log(data);
    // console.log(data.selection);
    if(data.selection == 'view all departments'){
      db.query('SELECT * FROM department', function (err, results) {
     console.log(results);

   })} else if(data.selection == 'view all roles'){
    db.query('SELECT * FROM roles', function (err, results) {
      console.log(results);
   })
  } else if(data.selection == 'view all employees'){
    db.query('SELECT * FROM employee', function (err, results) {
      console.log(results);
   })
  } else if(data.selection == 'add a department'){

    inquirer.prompt([
      {
      type: 'input',
      name: 'departmentName',
      message: "What is the department's name?",
    }]).then((data2) => {

      console.log(data2.departmentName);
      const sql = "INSERT INTO department (name) VALUES (?)";
      const params = data2.departmentName;
      db.query(sql, params, function (err, results) {
        if (err) throw err;
      });
      db.query('SELECT * FROM department', function (err, results) {
        console.log(results);
     })
    });
    }  else if(data.selection == 'add a role'){
    inquirer.prompt([
      {
      type: 'input',
      name: 'roleName',
      message: "What is the role's name?",
    },
    {
      type: 'input',
      name: 'roleSalary',
      message: "What is the role's salary?",
    },
    {
      type: 'input',
      name: 'roleDepartment',
      message: "What is the role's department ID?",
    },
  ]).then((data3) => { 
     const sql = "INSERT INTO roles (title, salary, department_id) VALUES (?)";
     const params = [data3.roleName, data3.roleSalary, data3.roleDepartment];
    db.query(sql, [params], (err, result) => {});
    db.query('SELECT * FROM roles', function (err, results) {
      console.log(results);
   })
   });
  } else if(data.selection == 'add an employee'){
    inquirer.prompt([
      {
      type: 'input',
      name: 'employeefName',
      message: "What is the employee's first name?",
    },
    {
      type: 'input',
      name: 'employeelName',
      message: "What is the employee's last name?",
    },
    {
      type: 'input',
      name: 'roleID',
      message: "What is the employee's role ID?",
    },
    {
      type: 'input',
      name: 'managerID',
      message: "What is the employee's manageer's ID?",
    },])
    .then((data4) => {
    const sql = "INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES (?)";
    const params = [data4.employeefName, data4.employeelName, data4.roleID, data4.managerID];
    db.query(sql, [params], (err, result) => {});
    db.query('SELECT * FROM employee', function (err, results) {
      console.log(results);
   })
    });
  } else if(data.selection == 'update an employee role'){

    db.query('SELECT id, first_name, last_name FROM employee', function (err, results) {
      // console.log(results);
    
  
    inquirer.prompt([
      {
        type: 'input',
        name: 'employeeSelect',
        message: "Whose role would you like to update? type in their employee ID \n\n" + [results[0].id + " " + results[0].first_name + " " + results[0].last_name + "\n" + 
        results[1].id + " " + results[1].first_name + " " + results[1].last_name + "\n" + 
        results[2].id + " " + results[2].first_name + " " + results[2].last_name + "\n" + 
        results[3].id + " " + results[3].first_name + " " + results[3].last_name + "\n" + 
        results[4].id + " " + results[4].first_name + " " + results[4].last_name + "\n"]
        
      },
      {
        type: 'input',
        name: 'newRole',
        message: "What is his/her new role ID",
    
      },
    ]) .then((data5) => {
      // console.log(data5);
      db.query( "SELECT * FROM employee WHERE id = (?)", data5.employeeSelect, (err, results) => {
        console.log(results);
      });
      const sql = "UPDATE employee SET roles_id = (?) WHERE id = (?)";
    const params = [data5.newRole, data5.employeeSelect];
    db.query(sql, params, (err, result) => {});
    db.query( "SELECT * FROM employee WHERE id = (?)", data5.employeeSelect, (err, results) => {
      console.log(results);
    });

  })
});
};
});