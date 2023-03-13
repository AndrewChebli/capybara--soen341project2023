const express = require("express");
const router = express.Router();
const HttpError = require("../models/http-error");
const employeeController = require("../controllers/employee-controllers");

router.post("/register", (req, res, next) => {
  console.log("POST request to /employee/register");
  employeeController.registerEmployee(req, res, next);
});


router.get("/getall", (req, res, next) => {
  console.log("GET request to /employee/getall");
  employeeController.getAllEmployess(req, res, next);
});

router.get("/getone/:_id", (req, res, next) => {
  console.log("GET request to /employee/getone/:_id");
  employeeController.getEmployeeById(req, res, next);
});

router.delete("/:_id", (req, res,next) => {
  console.log("DELETE request to /employee/remove/:_id");
  employeeController.deleteEmployee(req, res,next);
  
});

router.patch("/:_id", (req, res, next) => {
  console.log("POST request to /employee/update/:_id");
  const _id = req.params._id;
  console.log(_id);
  employeeController.updateEmployee(req, res, next);
});

module.exports = router;
