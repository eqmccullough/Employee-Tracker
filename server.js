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
      message: 'What shape would you like to include in your logo?',
      name: 'selection',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department','add a role', 'add an employee',  'update an employee role'],
    },
  ]) .then((data) => {
    //sends data to json file
    console.log(data);
    console.log(data.selection);
    if(data.selection == 'view all departments'){
      db.query('SELECT * FROM department', function (err, results) {
     console.log(results);
   } else if(data.selection == 'view all roles'){
    db.query('SELECT * FROM roles', function (err, results) {
      console.log(results);
   }
  } else if(data.selection == 'view all employees'){
    db.query('SELECT * FROM employee', function (err, results) {
      console.log(results);
   }
  } else if(data.selection == 'add a department'){
    db.query('SELECT * FROM employee', function (err, results) {
      console.log(results);
   } 
  }else if(data.selection == 'add a role'){
    db.query('SELECT * FROM employee', function (err, results) {
      console.log(results);
   }
  } else if(data.selection == 'add an employee'){
    inquirer.prompt([
      {
      type: 'input',
      name: 'employeefName',
      message: 'What is the employee's firstname?',
    },
    {
      type: 'input',
      name: 'employeelName',
      message: 'What is the employee's lastname?',
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
    },

  }).then((data2) => {
    const sql = 'INSERT INTO employee (first_name) VALUES (?)`;
    const params = data2.employeefName;
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
    });
    });
  //   db.query(`INSERT INTO employee (first_name) VALUES (?)`, function (err, results) {
  //     console.log(results);
  //  }
    


  }
    // db.query('SELECT * FROM employee', function (err, results) {
    //   console.log(results);
   }
  // } else if(data.selection == 'update an employee role'){
  //   db.query(`UPDATE employee SET roles_id = ? WHERE id = ?`, function (err, results) {
  //     console.log(results);
  //  }
  // }
      //   fs.writeFile("./lib/data.json", JSON.stringify(data, null, '\t'), (err) =>
      //   err ? console.log(err) : console.log('Success!')
      // );
      // });


    //   const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
    //   const params = [req.body.review, req.params.id];
    
    //   db.query(sql, params, (err, result) => {
    //     if (err) {
    //       res.status(400).json({ error: err.message });
    //     } else if (!result.affectedRows) {
    //       res.json({
    //         message: 'Movie not found'
    //       });
    //     } else {
    //       res.json({
    //         message: 'success',
    //         data: req.body,
    //         changes: result.affectedRows
    //       });
    //     }
    //   });
    // });
      

  // db.query('SELECT * FROM department', function (err, results) {
  //   console.log(results);
  // })
 

// db.query(`DELETE FROM favorite_books WHERE id = ?`, deletedRow, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// db.query('SELECT COUNT(id) AS total_count FROM favorite_books GROUP BY in_stock', function (err, results) {
//   console.log(results);
// });

// app.use((req, res) => {
//   res.status(404).end();
// });