const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee-controllers");

router.post("/register", (req, res, next) => {
  console.log("POST request to /employee/register");
  employeeController.registerEmployee(req, res, next);
});

router.post("/login", (req, res, next) => {
  console.log("POST request to /employee/login");
  console.log(req.body);
  employeeController.loginEmployee(req, res, next);
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
  console.log("PATCH request to /employee/update/:_id");
  employeeController.updateEmployee(req, res, next);
});
router.get("/getAllOffers/:_id" ,(req,res,next) =>
{
  console.log("GET request to /employee/getAllOffers");
  employeeController.getAllOffers(req,res,next);
})

module.exports = router;