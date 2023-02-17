const mongoose = require("mongoose");

const EducationUserSchema = new mongoose.Schema(
  {
    Start : {type: String, unique: false, required: true},
    End : {type: String, unique: false, required: true},
    School : {type: String, unique: false, required: true},
    Degree : {type: String, unique: false, required: true},
    Field : {type: String, unique: false, required: true},
    Description : {type: String, unique: false, required: true},
  },{collection: "users"}
);

const EducationUserModel = mongoose.model("EducationUserModel", EducationUserSchema, "users");

module.exports = EducationUserModel;