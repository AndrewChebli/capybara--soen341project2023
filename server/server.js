//=======================Dependencies==========================
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const UserRegisterModel = require("./models/registerUser.model.js");
const AddJobModel = require("./models/addJob.model.js");
const UserUpdateModel = require("./models/updateUser.model.js");
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
mongoose.connect("mongodb+srv://root:1234@soen341.xywwhkp.mongodb.net/SOEN341"); // we have access to all the collections in SOEN 341 database

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




//=====================UPDATE ENDPOINT=======================
app.post("/update", async (req, res) => {
  console.log("update attempt from " + req.body.email);
  console.log("BODY  : " + JSON.stringify(req.body));
  const { firstName, lastName, email, password } = req.body;
  const { dateStartedSchool, dateCompletedSchool, school, academicProgram } = req.body;
  const { dateStartedWork, dateCompletedWork, companyName, jobTitle, Description } = req.body;
  const {_id} = req.body;
  const {resume, resuneName} = req.body;
  console.log(_id);
  
  let response_from_database = await UserUpdateModel.findOneAndUpdate({email},
        {
          firstname: firstName,
          lastname: lastName,
          email: email,
          password: password,
          resume: resume,
          resuneName: resuneName,
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
        },
        { new: true } //new true is to return the updated document
      );
  console.log("response_from_database : " + response_from_database);
  if (response_from_database) {
    res.send({ status: "success", db_response: response_from_database });
  }else{
    res.send({ status: "failed" });
  }



});

// ========== GET JOBS =========

app.post("/getAllJobs", async (req, res) => {
  const all_jobs = await AddJobModel.find({});
  console.log("from mongo all_jobs : " + all_jobs);

  res.send({ status: "success", data: all_jobs });

});

// =========================== ADD JOB =========================

app.post("/addJob", async (req, res) => {
  console.log("add job attemmpt " + req.body.email);
  console.log("BODY  : " + JSON.stringify(req.body));
  const {jobTitle, companyName, deadlineDay, deadlineMonth, deadlineYear, jobDescription, jobRequirements, jobSalary, jobBenefits} = req.body;
  try {
    await AddJobModel.create({     // .create sends the creation of the document described below to the database
    title: jobTitle,
    company: companyName,
    description: jobDescription,
    Dday:  deadlineDay,
    Dmonth: deadlineMonth,
    Dyear: deadlineYear,
    salary: jobSalary,
    benefits: jobBenefits,
    requirements: jobRequirements,

      
    });
  } catch (error) {
    console.log(error);
  }
  res.json({ status: "success" });
});



//=====================END OF ENDPOINTS=======================
//====================LISTENING PORT==========================
app.listen(8080, () => {
  console.log("server started on port 8080");
});