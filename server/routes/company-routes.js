const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company-controllers");

router.post("/register", (req, res, next) => {
  console.log("POST request to /company/register");
  companyController.registerCompany(req, res, next);
});

router.get("/getall", (req, res, next) => {
  console.log("GET request to /company/getall");
  companyController.getAllCompanies(req, res, next);
});

router.get("/getone/:_id", (req, res, next) => {
  console.log("GET request to /company/getone/:_id");
  companyController.getCompanyById(req, res, next);
});

router.delete("/:_id", (req, res, next) => {
  console.log("DELETE request to /company/remove/:_id");
  companyController.removeCompany(req, res, next);
});

router.patch("/:_id", (req, res, next) => {
  console.log("PATCH request to /company/update/:_id");
  companyController.updateCompany(req, res, next);
});



module.exports = router;


