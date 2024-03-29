const mongoose = require('mongoose');

const UpdateUser = new mongoose.Schema({
    firstname: { type: String, unique: false },
    lastname: { type: String, unique: false },
    
    email: { type: String, unique: false },
    password: { type: String, unique: false },
    resume: { type: String, unique: false },
    resumeName: { type: String, unique: false },
    education:{
        Start: { type: String, unique: false },
        End: { type: String, unique: false },
        School: { type: String, unique: false },
        Degree: { type: String, unique: false },
    },
    previousExperience: [
        {
            Start: { type: String, unique: false },
            End: { type: String, unique: false },
            Company: { type: String, unique: false },
            Position: { type: String, unique: false },
            Description: { type: String, unique: false },
        }
    ]
  },{collection: "users"}
);

const UpdateUserModel = mongoose.model("UpdateUserModel", UpdateUser, "users");

module.exports = UpdateUserModel;


