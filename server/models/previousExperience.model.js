const mongoose = require("mongoose");

const PreviousExperienceUserSchema = new mongoose.Schema(
  {
    Start : {type: String, unique: false, required: true},
    End : {type: String, unique: false, required: true},
    Company : {type: String, unique: false, required: true},
    Position : {type: String, unique: false, required: true},
    Description : {type: String, unique: false, required: true},
  },{collection: "users"}
);

const PreviousExperienceUserModel = mongoose.model("PreviousExperienceUserModel", PreviousExperienceUserSchema, "users");

export default PreviousExperienceUserModel;
