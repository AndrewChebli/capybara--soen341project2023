const HttpError = require("../models/http-error");
const Employee = require("../models/EmployeeRegister.model.js");
const Job = require("../models/addJob.model.js");

const getAllEmployess = async (req, res, next) => {
  Employee.find()
    .then((employees) => {
      res.json(employees);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

const loginEmployee = async (req, res, next) => {
  const { email, password } = req.body;
  let existingEmployee;
  try {
    existingEmployee = await Employee.find({
      email: email,
      password: password,
    }).exec();
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }
  if (!existingEmployee) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }
  if (existingEmployee.length === 0) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }
  const _id = existingEmployee[0]._id;
  console.log(_id);
  res.status(201).json({
    message: "Logged in!",
    _id: _id,
    resume: existingEmployee[0].resume,
    resumeName: existingEmployee[0].resumeName,
  });
};

const getEmployeeById = async (req, res, next) => {
  const employeeId = req.params._id;

  try {
    const employee = await Employee.findById(employeeId).exec();
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
  console.log(req.body);
  const createdEmployee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    resume: req.body.resume,
    resumeName: req.body.resumeName,
    skills: req.body.skills,
    experience: req.body.experience,
    education: req.body.education,
  });

  try {
    await createdEmployee.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
  res.status(201).json({ employee: createdEmployee });
};

const deleteEmployee = async (req, res, next) => {
  const employeeId = req.params._id;
  console.log(employeeId);
  let employee;
  try {
    employee = await Employee.findById(employeeId).exec();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete employee.",
      500
    );
    return next(error);
  }

  if (!employee) {
    const error = new HttpError("Could not find employee for this id.", 404);
    return next(error);
  } else {
    try {
      await employee.remove();
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not delete employee.",
        500
      );
      return next(error);
    }
    res.status(200).json({ message: "Deleted employee." });
  }
};

const updateEmployee = async (req, res, next) => {
  const employeeId = req.params._id;
  console.log("PATCH Request to : " + employeeId);

  let existingEmployee;
  try {
    existingEmployee = await Employee.findById(employeeId).exec();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update employee.",
      500
    );
    return next(error);
  }

  if (!existingEmployee) {
    const error = new HttpError("could not find employee for this id.", 404);
    return next(error);
  }

  let updatedEmployee;
  console.log("PATCH ON : " + existingEmployee._id)
  try {
    updatedEmployee = await Employee.findOneAndUpdate(employeeId, req.body,
      {
        new: true,
      });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something went wrong, could not update employee error updating.",
      500
    );
    return next(error);
  }
  if (!updatedEmployee) {
    const error = new HttpError(
      "Something went wrong, could not update employee.",
      500
    );
    return next(error);
  }
  console.log(updatedEmployee.firstName)
  res
    .status(200)
    .json({ employee: updatedEmployee.toObject({ getters: true }) });
};

const getAllOffers = async (req, res, next) => {
  let _id = req.params._id;
  let allOffers;
  console.log(_id);

  try {
    allOffers = await Job.find().exec();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a job.",
      500
    );
    return next(error);
  }

  if (!allOffers) {
    const error = new HttpError(
      "Something went wrong, could not find a job.",
      500
    );
    return next(error);
  }
  if (allOffers.length === 0) {
    const error = new HttpError("No offers yet", 400);
    return next(error);
  }
  let myOffers = [];
  for (let i = 0; i < allOffers.length; i++) {
    allOffers[i] = allOffers[i].toObject({ getters: true });
    for (let j = 0; j < allOffers[i].selected_applicants.length; j++) {
      if (_id === allOffers[i].selected_applicants[j]) {
        myOffers.push(allOffers[i]);
      }
    }
  }
  console.log(myOffers);
  res.json({ status: 200, offers: myOffers });
};

exports.getAllEmployess = getAllEmployess;
exports.getEmployeeById = getEmployeeById;
exports.registerEmployee = registerEmployee;
exports.updateEmployee = updateEmployee;
exports.deleteEmployee = deleteEmployee;
exports.loginEmployee = loginEmployee;
exports.getAllOffers = getAllOffers;