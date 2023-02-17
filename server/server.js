//=======================Dependencies==========================
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const UserRegisterModel = require("./models/registerUser.model.js");
const UserLoginModel = require("./models/loginUser.model.js");
app.use(cors());
app.use(express.json());
let db;
//============================================================

//=============CONECTION BLOCK TO MONGO DB ATLAS==============
mongoose.connect("mongodb+srv://root:1234@soen341.4bcqb8l.mongodb.net/SOEN341");
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
  const user = new UserRegisterModel({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });
  await user.save();
  res.send(user);
});


//=====================LOGIN ENDPOINT=======================
app.post("/login", async (req, res) => {
  console.log("login attempt from " + req.body.email);
  console.log("BODY  : " + JSON.stringify(req.body));
  
  const { email, password } = req.body;
  const database_response = await UserLoginModel.findOne({
    email: email,
    password: password,
  });

  if (database_response) {
    res.send({ status: "success" });
  }
  else {
    res.send({ status: "failed" });
  }

});

//=====================END OF ENDPOINTS=======================
//====================LISTENING PORT==========================
app.listen(8080, () => {
  console.log("server started on port 8080");
});