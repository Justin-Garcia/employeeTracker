DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;


CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30)
);



CREATE TABLE role (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);



CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30), 
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);


INSERT INTO department (name) VALUES ('IT');
INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('HR');
INSERT INTO department (name) VALUES ('Accountant');
INSERT INTO department (name) VALUES ('Lawyer');


INSERT INTO role (title, salary, department_id) VALUES ('Data Scientist', 150000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Sales rep', 50000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('HR Specialist', 60000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Book Keeper', 10000, 4);
INSERT INTO role (title, salary, department_id) VALUES ('Data specialist', 9000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Attorney', 100000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Evan', 'Chang', 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Matt', 'Smith', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Justin', 'Bob', 3, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Angelica', 'Evans', 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Anna', 'Lee', 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Bonnie', 'kozak', 5, 1);
