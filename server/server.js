//=======================Dependencies==========================
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const UserRegisterModel = require("./models/registerUser.model.js");
const UserLoginModel = require("./models/loginUser.model.js");
app.use(express.json({ limit: "50mb", extended: true }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(cors());

app.use(express.json());
let db;

//============================================================

//=============CONECTION BLOCK TO MONGO DB ATLAS==============
mongoose.connect("mongodb+srv://root:1234@soen341.4bcqb8l.mongodb.net/SOEN341"); // we have access to all the collections in SOEN 341 database
mongoose.connection.once("open", () => {
  console.log("connected to database");
  db = mongoose.connection.db;
});
//===================END OF CONNECTION BLOCK===================

//=======================ENDPOINTS=============================
//
//=====================REGISTER ENDPOINT=======================

app.post("/register", async (req, res) => {
  console.log("register attempt from " + req.body.email);
  console.log("BODY  : " + JSON.stringify(req.body));

  const { firstName, lastName, email, password } = req.body;
  const { dateStartedSchool, dateCompletedSchool, school, academicProgram } =
    req.body;
  const {
    dateStartedWork,
    dateCompletedWork,
    companyName,
    jobTitle,
    Description,
  } = req.body;
  const { resume } = req.body;

  console.log("lastName " + lastName);
  console.log("RESUME " + resume);

  try {
    await UserRegisterModel.create({
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
      resume: resume,
      education: {
        Start: dateStartedSchool,
        End: dateCompletedSchool,
        School: school,
        Degree: academicProgram,
      },
      previousExperience: [
        {
          Start: dateStartedWork,
          End: dateCompletedWork,
          Company: companyName,
          Position: jobTitle,
          Description: Description,
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
  res.json({ status: "success" });
});

//=====================LOGIN ENDPOINT=======================
app.post("/login", async (req, res) => {
  console.log("login attempt from " + req.body.email);
  console.log("BODY  : " + JSON.stringify(req.body));

  const { email, password } = req.body;
  const database_response = await UserLoginModel.findOne(
    {
      email: email,
      password: password,
    },
    {}
  );
  console.log(JSON.stringify(database_response));
  console.log("database_response : " + database_response);
  if (database_response) {
    res.send({ status: "success", data: database_response });
  } else {
    res.send({ status: "failed" });
  }
});

//=====================END OF ENDPOINTS=======================
//====================LISTENING PORT==========================
app.listen(8080, () => {
  console.log("server started on port 8080");
});
