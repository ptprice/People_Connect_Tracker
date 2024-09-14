DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

\c company_db;

CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    role_title VARCHAR(100) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    constraint fk_department
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE cascade
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role_id INT,
    manager_id INT,
    constraint fk_role
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE cascade,
    constraint fk_manager
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE cascade
);

