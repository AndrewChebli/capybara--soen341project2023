const mongoose = require("mongoose");

const UserLogin = new mongoose.Schema(
  {
    email: { type: String},
    password: { type: String},
  },
  { collection: "users" }
);

const UserLoginModel = mongoose.model("UserLogin", UserLogin, "users");

module.exports = UserLoginModel;
