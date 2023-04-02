const mongoose = require("mongoose");

const EmployeeRegisterModel = new mongoose.Schema(
  {
    firstName: { type: String, unique: false },
    lastName: { type: String, unique: false },
    bio: { type: String, unique: false },
    email: { type: String, unique: false, required: true },
    password: { type: String, unique: false, required: true },
    resume: { type: String, unique: false },
    resumeName: { type: String, unique: false },
    phoneNumber: { type: String, unique: false },

    skills: { type: Array, unique: false },
    education: {
      start: { type: String, unique: false },
      end: { type: String, unique: false },
      school: { type: String, unique: false },
      degree: { type: String, unique: false },
    },
    experience: { type: Array, unique: false },     
    offers: { type: Array, unique: false },
  },
  { collection: "users" }
);

const EmployeeRegister = mongoose.model(
  "EmployeeRegister",
  EmployeeRegisterModel,
  "users"
);

module.exports = EmployeeRegister;
