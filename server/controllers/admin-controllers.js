const HttpError = require("../models/http-error");
const Company = require("../models/CompanyRegister.model.js");
const Employee = require("../models/EmployeeRegister.model.js");
const Job = require("../models/addJob.model.js");
const Admin = require("../models/AdminRegister.model.js");
const reportController = require("./report-controllers");
const bcrypt = require("bcryptjs");

// @route   POST /admin/register
// @desc    Register a new admin
// @access  Public
const registerAdmin = async (req, res, next) => {
  let { email, password } = req.body;
  let hashedPassword = await bcrypt.hash(password, 12);
  let admin_created = new Admin({ email, password : hashedPassword, approved: false });
  try {
    await admin_created.save();
  } catch (err) {
    const error = new HttpError(
      "Could not create admin, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ admin: admin_created.toObject({ getters: true }) });
};

// @route   POST /admin/login
// @desc    Login an admin
// @access  Public
const loginAdmin = async (req, res, next) => {
  let { email, password } = req.body;
  let existingAdmin;
  try {
    existingAdmin = await Admin.find({
      email: email,
      password: password,
      approved: true,
    });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }
  if (!existingAdmin) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  res.json({ status: 200, admin: existingAdmin });
};

const getAllAdmins = async (req, res, next) => {
  let all_admins = [];
  try {
    all_admins = await Admin.find().exec();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find any admins.",
      500
    );
    return next(error);
  }

  res.json({ status: 200, admins: all_admins });
};

const getAdminById = async (req, res, next) => {
  let _id = req.params._id;
  let existing_admin;

  try {
    existing_admin = await Admin.findById(_id).exec();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find an admin.",
      500
    );
    return next(error);
  }

  if (!existing_admin) {
    const error = new HttpError(
      "Could not find an admin for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ status: 200, admin: existing_admin });
};

const deleteAdmin = async (req, res, next) => {
  let _id = req.params._id;
  let existing_admin;
  try {
    existing_admin = await Admin.findByIdAndDelete(_id).exec();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete an admin.",
      500
    );
    return next(error);
  }

  if (!existing_admin) {
    const error = new HttpError(
      "Could not find an admin for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ status: 200, admin: existing_admin });
};

const removeCompanyAsAdmin = async (req, res, next) => {
  let company;
  const companyId = req.params.id;
  try {
    company = await Company.findById(companyId).exec();
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not delete company.",
      500
    );
    return next(err);
  }

  if (!company) {
    const err = new HttpError("Could not find company for this id.", 404);
    return next(err);
  } else {
    try {
      await company.remove();
    } catch (error) {
      const err = new HttpError(
        "Something went wrong, could not delete company.",
        500
      );
      return next(err);
    }
    res.status(200).json({ message: "Deleted company." });
  }
};

const removeEmployeeAsAdmin = async (req, res, next) => {
  let employee;
  const employeeId = req.params.id;
  try {
    employee = await Employee.findById(employeeId).exec();
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not delete employee.",
      500
    );
    return next(err);
  }

  if (!employee) {
    const err = new HttpError("Could not find employee for this id.", 404);
    return next(err);
  } else {
    try {
      await employee.remove();
    } catch (error) {
      const err = new HttpError(
        "Something went wrong, could not delete employee.",
        500
      );
      return next(err);
    }
    res.status(200).json({ message: "Deleted employee." });
  }
};

const removeJobAsAdmin = async (req, res, next) => {
  let job;
  const jobId = req.params._id;
  console.log("jobid " + jobId);
  
  try {
    job = await Job.findById(jobId).exec();
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not delete job.",
      500
    );
    return next(err);
  }

  console.log("Job to be deleted " + job);

  if (!job) {
    const err = new HttpError("Could not find job for this id.", 404);
    return next(err);
  } else {
    try {
      await job.remove();
      // await removeReportAsAdmin(req, res, next); // req res next is expecting something specific 
    } catch (error) {
      console.log(error);
      const err = new HttpError(
        "Something went wrong, could not delete job, or the report.",
        500
      );
      return next(err);
    }
    res.status(200).json({ message: "Deleted job." });
  }
};

const removeReportAsAdmin = async (req, res, next) => {
  reportController.removeReport(req, res, next);
}

exports.registerAdmin = registerAdmin;
exports.loginAdmin = loginAdmin;
exports.getAllAdmins = getAllAdmins;
exports.getAdminById = getAdminById;
exports.deleteAdmin = deleteAdmin;
exports.removeCompanyAsAdmin = removeCompanyAsAdmin;
exports.removeEmployeeAsAdmin = removeEmployeeAsAdmin;
exports.removeJobAsAdmin = removeJobAsAdmin;
exports.removeReportAsAdmin = removeReportAsAdmin;