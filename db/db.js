import pool from "./connection.js";
class DB {
  constructor() {
  
    }
    async query(sql, args = []) {
        const client = await pool.connect();
        try {
          const result = await client.query(sql, args);
          return result;
        } finally {
          client.release();
        }
      }
        async getAllDepartments() {
            const result = await this.query("SELECT * FROM department");
            return result.rows;
        }
        async getAllRoles() {
            const result = await this.query("SELECT * FROM role");
            return result.rows;
        }
        async getAllEmployees() {
            const result = await this.query("SELECT * FROM employee");
            return result.rows;
        }
        async addDepartment(department_name) {
            const result = await this.query("INSERT INTO department (department_name) VALUES ($1) RETURNING *", [department_name]);
            return result.rows[0];
        }
        async addRole(role_title, salary, department_id) {
            const result = await this.query("INSERT INTO role (role_title, salary, department_id) VALUES ($1, $2, $3) RETURNING *", [role_title, salary, department_id]);
            return result.rows[0];
        }
        async addEmployee(first_name, last_name, role_id, manager_id) {
            const result = await this.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *", [first_name, last_name, role_id, manager_id]);
            return result.rows[0];
        }
        async updateEmployeeRole(employee_id, role_id) {
            const result = await this.query("UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *", [role_id, employee_id]);
            return result.rows[0];
        }
    }
    export default DB;