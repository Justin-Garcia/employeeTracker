const inquirer = require("inquirer");
const fs = require("fs");
require("console.table");
const db = require("./db/connection");

function returnToMainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "returnToMenu",
        message: "Would you like to return to the main menu?",
        choices: ["Yes, return to main menu", "No, exit application"],
      },
    ])
    .then((answer) => {
      if (answer.returnToMenu === "Yes, return to main menu") {
        userPrompts();
      } else {
        console.log("Exiting the application. Goodbye!");
        db.end();
      }
    });
}

async function viewDepatments() {
  const [department] = await db.promise().query("select * from department");
  console.table(department);
  returnToMainMenu();
}

async function viewRoles() {
  const [role] = await db.promise().query(`
  select
      r.id,
      r.title,
      r.salary,
      d.name
    from role as r
    join department as d
    on r.department_id = r.id
    `);
  console.table(role);
  returnToMainMenu();
}

async function viewEmployees() {
  const [employee] = await db.promise().query(`
  select
    e.id,
    e.first_name,
    e.last_name,
    r.title,
    concat(e2.first_name," ",e2.last_name) manager
  from employee as e
  join role r
  on e.role_id = r.id
  left join employee e2
  on e.manager_id = e2.id`);
  console.table(employee);
  returnToMainMenu();
}

async function addDepatment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Name the department",
      },
    ])
    .then(async (answers) => {
      await db
        .promise()
        .query(
          `Insert into department (name) VALUES ("${answers.departmentName}")`
        )
        .then(returnToMainMenu());
    });
}

async function addRole() {
  const [department] = await db.promise().query("select * from department");
  const departments = department.map((dept) => ({
    value: dept.id,
    name: dept.name,
  }));
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "Name the role",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this role?",
      },
      {
        type: "list",
        name: "department",
        message: "What is the department for this role?",
        choices: departments,
      },
    ])
    .then(async (answers) => {
      await db
        .promise()
        .query(
          `Insert into role (title, salary, department_id) VALUES ("${answers.roleTitle}", ${answers.salary}, ${answers.department} )`
        )
        .then(returnToMainMenu());
    });
}

async function addEmployee() {
  const [role] = await db.promise().query("select * from role");
  const roles = role.map((role) => ({
    value: role.id,
    name: role.title,
  }));
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Insert employee first name",
      },
      {
        type: "input",
        name: "lastName",
        message: "Insert employee last name",
      },
      {
        type: "list",
        name: "role",
        message: "What is the role of this employee?",
        choices: roles,
      },
    ])
    .then(async (answers) => {
      await db
        .promise()
        .query(
          `Insert into employee (first_name, last_name, role_id) VALUES ("${answers.firstName}", "${answers.lastName}", ${answers.role})`
        )
        .then(returnToMainMenu());
    });
}

async function updateEmployeeRole() {
  const [employee] = await db.promise().query("select * from employee");
  const employees = employee.map((employee) => ({
    value: employee.id,
    name: `${employee.first_name} ${employee.last_name} ${employee.id}`,
  }));

  const [role] = await db.promise().query("select * from role");
  const roles = role.map((role) => ({
    value: role.id,
    name: role.title,
  }));

  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeChoice",
        message: "Choose the employee to update",
        choices: employees,
      },
      {
        type: "list",
        name: "roleChoice",
        message: "Choose the updated role for this employee",
        choices: roles,
      },
    ])
    .then(async (answers) => {
      await db
        .promise()
        .query("UPDATE employee SET role_id = ? WHERE id = ?", [
          answers.roleChoice,
          answers.employeeChoice,
        ])
        .then(returnToMainMenu());
    });
}

function userPrompts() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userOptions",
        message: "Please Choose from one of the options below:",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    .then((answers) => {
      console.log(answers);
      switch (answers.userOptions) {
        case "View all departments":
          viewDepatments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepatment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
      }
    });
}

userPrompts();