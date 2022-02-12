import Employee from "../models/employeeModel.js";
import AsyncHandler from "express-async-handler";

// @desc Get all employees
// @route GET /api/v1/employees
// @access private
const getEmployees = AsyncHandler(async (req, res) => {
  const employees = await Employee.find({}).sort({ createdAt: -1 });
  if (employees) {
    res.status(200).json(employees);
  }
  throw new Error("No employee found");
});

// @desc Get a single employee
// @route GET /api/v1/employees/:id
// @access private
const getEmployee = AsyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (employee) {
    res.status(200).json(employee);
  }
  throw new Error("No employee found");
});

// @desc Create a employee
// @route POST /api/v1/employees
// @access private
const createEmployee = AsyncHandler(async (req, res) => {
  const { name, email, phone, age, position, salary, hiringDate, store } =
    req.body;

  const newEmployee = await Employee.create({
    name,
    email,
    phone,
    age,
    position,
    salary,
    hiringDate,
    store,
  });
  if (newEmployee) {
    res.status(201).json(newEmployee);
  }
  throw new Error("Error creating employee");
});

// @desc Update a employee
// @route PUT /api/v1/employees/:id
// @access private
const updateEmployee = AsyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (employee) {
    employee.name = req.body.name || employee.name;
    employee.email = req.body.email || employee.email;
    employee.phone = req.body.phone || employee.phone;
    employee.age = req.body.age || employee.age;
    employee.position = req.body.position || employee.position;
    employee.salary = req.body.salary || employee.salary;
    employee.hiringDate = req.body.hiringDate || employee.hiringDate;
    employee.store = req.body.store || employee.store;
    const updatedEmployee = await employee.save();
    if (updatedEmployee) {
      res.status(200).json(updatedEmployee);
    }
    throw new Error("Error updating employee");
  }
  throw new Error("No employee found");
});

// @desc Delete a employee
// @route DELETE /api/v1/employees/:id
// @access private
const deleteEmployee = AsyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (employee) {
    const deletedEmployee = await employee.remove();
    if (deletedEmployee) {
      res.status(200).json(deletedEmployee);
    }
    throw new Error("Error deleting employee");
  }
  throw new Error("No employee found");
});

export {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
