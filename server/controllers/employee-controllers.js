const HttpError = require("../models/http-error");
const Employee = require('../models/EmployeeRegister.model.js')
const UserLogin = require('../models/UserLogin.model.js')


const getAllEmployess = async (req, res, next) => {

  Employee.find()
    .then(employees => {
      res.json(employees);
    })
    .catch(err => res.status(400).json('Error: ' + err));

};

const loginEmployee = async (req, res, next) => {
  const { email, password } = req.body;
  let existingEmployee;
  try {
      existingEmployee = await Employee.find({email: email, password: password});
      } catch (err) {
      const error = new HttpError(
      'Logging in failed, please try again later.',
      500
      );
      return next(error);
  }
  if (!existingEmployee) {
      const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
      );
      return next(error);
  }
  const _id =existingEmployee[0]._id;
  console.log(_id);
  res.status(201).json({message: 'Logged in!', _id: _id});
};


const getEmployeeById = async (req, res, next) => {
  const employeeId = req.params._id;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      throw new Error("Could not find employee.");
    }
    res.json({ employee: employee.toObject({ getters: true }) });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a employee.",
      500
    );
    return next(error);
  }

};

const registerEmployee = async (req, res, next) => {
  
  const createdEmployee = new Employee( {
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    email : req.body.email,
    password : req.body.password,
    resume : req.body.resume,
    resunmeName : req.body.resumeName,
    skills : req.body.skills,
    experience : req.body.experience,
    education : req.body.education,
  });

  try{
    await createdEmployee.save();
  }catch(err){
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }
    res.status(201).json({employee: createdEmployee});
};

const deleteEmployee = async (req, res, next) => {

  const employeeId = req.params._id;
  console.log(employeeId);
  let employee;
  try {
    employee = await Employee.findById(employeeId);
  }
  catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete employee.',
      500
    );
    return next(error);
  }

  if (!employee) {
    const error = new HttpError('Could not find employee for this id.', 404);
    return next(error);
  }else{
    try{
      await employee.remove();
    }catch(err){
      const error = new HttpError(
        'Something went wrong, could not delete employee.',
        500
      );
      return next(error);
    }
    res.status(200).json({ message: 'Deleted employee.' });
  }

};

const updateEmployee = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(req.body);
  const employeeId = req.params._id;
  console.log(employeeId);
};


exports.getAllEmployess = getAllEmployess;
exports.getEmployeeById = getEmployeeById;
exports.registerEmployee = registerEmployee;
exports.updateEmployee = updateEmployee;
exports.deleteEmployee = deleteEmployee;
exports.loginEmployee = loginEmployee;