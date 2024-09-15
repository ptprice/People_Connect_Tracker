import DB from './db/db.js';
import inquirer from 'inquirer';
const db = new DB();
const mainQuestion=[
    {
        type: 'list',
        name: 'MenuOption',
        message: 'How may I help you?',
        choices: [
            {
                name:"View all departments",
                value:"AllDepartments",
            }
            ,{
                name:"View all roles",
                value:"AllRoles",
            }
            ,{
                name:"View all employees",
                value:"AllEmployees",
            }
            ,{
                name:"Add a department",
                value:"AddDepartment",
            }
            ,{
                name:"Add a role",
                value:"AddRole",
            }
            ,{
                name:"Add an employee",
                value:"AddEmployee",
            }
            ,{
                name:"Update an employee role",
                value:"UpdateEmployeeRole",
            }
        ]
    },
]
const main = async () => {
  const answers = await inquirer.prompt(
    mainQuestion
  );
  if (answers.MenuOption === "AllDepartments") {
    const departments = await db.getAllDepartments();
    console.table(departments);
  }
    if (answers.MenuOption === "AllRoles") {
        const roles = await db.getAllRoles();
        console.table(roles);
    }
    if (answers.MenuOption === "AllEmployees") {
        const employees = await db.getAllEmployees();
        console.table(employees);
    }
    if (answers.MenuOption === "AddDepartment") {
        const department = await inquirer.prompt([
            {
                type: 'input',
                name: 'department_name',
                message: 'What is the name of the department?',
            }
        ]);
        const newDepartment = await db.addDepartment(department.department_name);
        console.log(`Added department ${newDepartment.name} with id ${newDepartment.id}.`);
    }
    if (answers.MenuOption === "AddRole") {
        const departments = await db.getAllDepartments();
        const departmentChoices = departments.map(department => ({
            name: department.name,
            value: department.id
        }));
        const role = await inquirer.prompt([
            {
                type: 'input',
                name: 'role_title',
                message: 'What is the title of the role?',
            },
            {
                type: 'number',
                name: 'salary',
                message: 'What is the salary of the role?',
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Which department does the role belong to?',
                choices: departmentChoices,
            }
        ]);
        const newRole = await db.addRole(role.role_title, role.salary, role.department_id);
        console.log(`Added role ${newRole.title} with id ${newRole.id}.`);
    }
    if (answers.MenuOption === "AddEmployee") {
        const roles = await db.getAllRoles();
        const roleChoices = roles.map(role => ({
            name: role.title,
            value: role.id
        }));
        const employees = await db.getAllEmployees();
        const employeeChoices = employees.map(employee => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }));
        const employee = await inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the first name of the employee?',
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the last name of the employee?',
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'What is the role of the employee?',
                choices: roleChoices,
            },
            {
                type: 'list',
                name: 'manager_id',
                message: 'Who is the manager of the employee?',
                choices: employeeChoices,
            }
        ]);
        const newEmployee = await db.addEmployee(employee.first_name, employee.last_name, employee.role_id, employee.manager_id);
        console.log(`Added employee ${newEmployee.first_name} ${newEmployee.last_name} with id ${newEmployee.id}.`);
    }
    if (answers.MenuOption === "UpdateEmployeeRole") {
        const employees = await db.getAllEmployees();
        const employeeChoices = employees.map(employee => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }));
        const roles = await db.getAllRoles();
        const roleChoices = roles.map(role => ({
            name: role.title,
            value: role.id
        }));
        const employee = await inquirer.prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: 'Which employee do you want to update?',
                choices: employeeChoices,
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'What is the new role of the employee?',
                choices: roleChoices,
            }
        ]);
        const updatedEmployee = await db.updateEmployeeRole(employee.employee_id, employee.role_id);
        console.log(`Updated employee ${updatedEmployee.first_name} ${updatedEmployee.last_name} with id ${updatedEmployee.id}.`);
    }
    main();
}
main();