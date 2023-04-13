const Company = require("../models/CompanyRegister.model.js");
const Employee = require("../models/EmployeeRegister.model.js");
const Admin = require("../models/AdminRegister.model.js");
const HttpError = require("../models/http-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @route POST /universal/login
// @desc Login a user
// @access Public
const loginUniversal = async (req, res, next) => {
  let { email, password } = req.body;
  let existingUser;
  let type;
  let token;
  console.log("login universal password : " + password);
  try {
    existingUser = await Employee.findOne({
      email: email,
    }).exec();
    if (existingUser !== null) {
      type = "employee";
    }
  } catch (err) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  if (existingUser !== null) {
    console.log("is an employee");
    try {
      if (bcrypt.compareSync(req.body.password, existingUser.password)) {
        console.log("Password is correct");
        type = "employee";
        const token = jwt.sign(
          { _id: existingUser._id, type: type },
          "capybaraSoen341",
          { expiresIn: "1h" }
        );
        res.status(200).json({
          _id: existingUser._id,
          email: existingUser.email,
          token: token,
          type: type,
        });
      }
    } catch (err) {
      const error = new HttpError(
        "Invalid credentials, could not log you in.",
        401
      );
      return next(error);
    }
  }

  if (existingUser === null) {
    console.log("not an employee");
    try {
      existingUser = await Company.findOne({
        email: email,
        password: password,
      }).exec();
      if (existingUser !== null) {
        type = "company";
        try {
          token = jwt.sign(
            { _id: existingUser._id, type: type },
            "capybaraSoen341",
            { expiresIn: "1h" }
          );
        } catch (err) {
          console.log(err);
          const error = new HttpError(
            "Invalid credentials, could not log you in.",
            401
          );
          return next(error);
        }
        res.status(200).json({
          _id: existingUser._id,
          email: existingUser.email,
          token: token,
          type: type,
          companyName : existingUser.companyName,
        });
      }
    } catch (err) {
      const error = new HttpError(
        "Invalid credentials, could not log you in.",
        401
      );
      return next(error);
    }
  }
  if (existingUser === null) {
    console.log("not a company");
    try {
      existingUser = await Admin.findOne({
        email: email,
        approved: true,
      }).exec();
      if (existingUser !== null) {
        console.log("is an admin");
        type = "admin";
        try {
          if (bcrypt.compareSync(password, existingUser.password)) {
            console.log("Password is correct");
            const token = jwt.sign(
              { _id: existingUser._id, type: type },
              "capybaraSoen341",
              { expiresIn: "1h" }
            );
            res.status(200).json({
              _id: existingUser._id,
              email: existingUser.email,
              token: token,
              type: type,
            });
          }else{
            const error = new HttpError(
              "Invalid credentials, could not log you in.",
              401
            );
            return next(error);
          }
        } catch (err) {
          const error = new HttpError(
            "Invalid credentials, could not log you in.",
            401
          );
          return next(error);
        }
      }
    } catch (err) {
      const error = new HttpError(
        "Invalid credentials, could not log you in.",
        401
      );
      return next(error);
    }
  }
};

exports.loginUniversal = loginUniversal;
