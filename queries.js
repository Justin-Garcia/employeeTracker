const connection = require('./db/db');

class Queries {
    viewAllDepartments() {
        return new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM department';
          connection.query(sql, (err, results) => {
            if (err) {
            console.error('Error executing query:', err);
              reject(err);
            } else {
              resolve(results);
            }
            console.log('Executing SQL query:', sql);
          });
        });
      }

      viewAllRoles() {
        return new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM role';
          connection.query(sql, (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
      }


      viewAllEmployees() {
        return new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM employee';
          connection.query(sql, (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
      }


      addDepartment(departmentName) {
        return new Promise((resolve, reject) => {
          const sql = 'INSERT INTO department (name) VALUES (?)';
          connection.query(sql, [departmentName], (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      }


      addRole(roleData) {
        return new Promise((resolve, reject) => {
          const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
          connection.query(
            sql,
            [roleData.title, roleData.salary, roleData.department_id],
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            }
          );
        });
      }


      addEmployee(employeeData) {
        return new Promise((resolve, reject) => {
          const sql =
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
          connection.query(
            sql,
            [
              employeeData.first_name,
              employeeData.last_name,
              employeeData.role_id,
              employeeData.manager_id,
            ],
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            }
          );
        });
      }



      updateEmployeeRole(employeeId, roleId) {
        return new Promise((resolve, reject) => {
          const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
          connection.query(sql, [roleId, employeeId], (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      }



      deleteEmployeeById(employeeId) {
        return new Promise((resolve, reject) => {
          const sql = 'DELETE FROM employee WHERE id = ?';
          connection.query(sql, [employeeId], (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      }
    
}

module.exports = Queries;