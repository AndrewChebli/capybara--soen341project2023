const mongoose = require("mongoose");

const AdminRegisterModel = new mongoose.Schema(
  {
    email: { type: String, unique: false, required: true },
    password: { type: String, unique: false, required: true },
    approved :{type: Boolean, unique: false, required: true}
  },
  { collection: "admins" }
);

const AdminRegister = mongoose.model(
  "AdminRegister",
  AdminRegisterModel,
  "admins"
);

module.exports = AdminRegister;