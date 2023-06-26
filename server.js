const inquirer = require('inquirer');



inquirer.prompt([
    {
      type: 'list',
      message: 'What shape would you like to include in your logo?',
      name: 'shape',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department','add a role', 'add an employee',  'update an employee role'],
    },
  ])
//   .then((data) => {
// //sends data to json file
//     fs.writeFile("./lib/data.json", JSON.stringify(data, null, '\t'), (err) =>
//     err ? console.log(err) : console.log('Success!')
//   );
//   })


