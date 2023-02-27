const mongoose = require("mongoose");
// const previousExperienceUserModel = mongoose.model("PreviousExperienceUserModel");

const UserRegister = new mongoose.Schema(
  {
    firstname: { type: String, unique: false},
    lastname: { type: String, unique: false},

    email: { type: String, unique: false, required: true },
    password: { type: String, unique: false, required: true },
    photo:{ type: Buffer, unique: false, required: false},
    resume:{ type: Buffer, unique: false, required: false},

    education: {
        Start: { type: String, unique: false},
        End: { type: String, unique: false},
        School: { type: String, unique: false},
        Degree: { type: String, unique: false},
      },
    previousExperience: [{
        Start: { type: String, unique: false},
        End: { type: String, unique: false},
        Company: { type: String, unique: false},
        Position: { type: String, unique: false},
        Description: { type: String, unique: false },
    }
    ],
  },
  { collection: "users" }
);

const UserRegisterModel = mongoose.model(
  "UserModelRegister",
  UserRegister,
  "users"
);

module.exports = UserRegisterModel;
