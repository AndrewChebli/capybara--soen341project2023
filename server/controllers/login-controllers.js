const Company = require("../models/CompanyRegister.model.js");
const Employee = require("../models/EmployeeRegister.model.js");
const Admin = require("../models/AdminRegister.model.js");
const HttpError = require("../models/http-error");

// @route POST /universal/login
// @desc Login a user
// @access Public
const loginUniversal = async (req, res, next) => {
  let { email, password } = req.body;
  let existingUser;
  let type;
  try {
    existingUser = await Employee.findOne({
      email: email,
      password: password,
    }).exec();
    if(existingUser !== null) {
      type = "employee"
    }
   
  } catch (err) {
      const error = new HttpError(
        "Invalid credentials, could not log you in.",
        401
      );
      return next(error);
  }
  if (existingUser === null) {
    console.log("not an employee")
      try {
        existingUser = await Company.findOne({
          email: email,
          password: password,
        }).exec();
        if(existingUser !== null) {
          type = "company"
        }
      } catch (err) {
        const error = new HttpError(
          "Invalid credentials, could not log you in.",
          401
        );
        return next(error);
      }
    }
    if(existingUser === null) {
      console.log("not a company")
        try {
            existingUser = await Admin.findOne({
              email: email,
              password: password,
              approved: true,
            }).exec();
            if(existingUser !== null) {
              type = "admin"
            }
          } catch (err) {
            const error = new HttpError(
              "Invalid credentials, could not log you in.",
              401
            );
            return next(error);
          }
    }
    if(existingUser === null) {
        const error = new HttpError(
          "Invalid credentials, could not log you in.",
          401
        );
        return next(error);
    }
  res.json({ status: 200, user: existingUser , type : type });
  }

exports.loginUniversal = loginUniversal;