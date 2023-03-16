const mongoose = require("mongoose");

const UserLoginModel = new mongoose.Schema(
  {
    email: { type: String},
    password: { type: String},
  },
  { collection: "users" }
);

const UserLogin = mongoose.model("UserLogin", UserLoginModel, "users");

module.exports = UserLogin;
