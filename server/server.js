//=======================Imports==========================
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//const {check , validationResult} = require('express-validator');
const HttpError = require("./models/http-error");


app.use(express.json({ limit: "50mb", extended: true }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    
  next();
});
//======================LOCAL IMPORTS======================

//=========================ROUTES==========================

const employeeRoutes = require("./routes/employee-routes");
const jobRoutes = require("./routes/job-routes");
const companyRoutes = require("./routes/company-routes");
const reportRoutes = require("./routes/report-routes");
const universalRoutes = require("./routes/universal-routes");
const adminRoutes = require("./routes/admin-routes");

app.use("/api/universal/", universalRoutes);
app.use("/api/admin", adminRoutes)
app.use("/api/employee", employeeRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/report", reportRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use(express.json());

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

let db;

//============================================================

//=============CONECTION BLOCK TO MONGO DB ATLAS==============
mongoose.connect("mongodb+srv://root:1234@soen341.xywwhkp.mongodb.net/SOEN341"); // we have access to all the collections in SOEN 341 database

mongoose.connection.once("open", () => {
  console.log("connected to database");
  db = mongoose.connection.db;
});
//===================END OF CONNECTION BLOCK===================

//====================LISTENING PORT==========================
app.listen(8080, () => {
  console.log("server started on port 8080");
});
