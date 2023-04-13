const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company-controllers");
const checkAuth = require("../middleware/check-auth");

router.post("/register", (req, res, next) => {
  console.log("POST request to /company/register");
  companyController.registerCompany(req, res, next);
});

router.post("/login", (req, res, next) => {
  console.log("POST request to /company/login");
  companyController.loginCompany(req, res, next);
});

router.post("/", (req, res, next) => {
  console.log("POST request to /company/register");
  companyController.addCompany(req, res, next);
});

router.get("/getCompanyJobs/:_id", (req, res, next) => {
  console.log("POST request to /company/getCompanyJobs");
  companyController.getCompanyJobs(req, res, next);
});

router.get("/getall", (req, res, next) => {
  console.log("GET request to /company/getall");
  companyController.getAllCompanies(req, res, next);
});

router.get("/getone/:_id", (req, res, next) => {
  console.log("GET request to /company/getone/:_id");
  companyController.getCompanyById(req, res, next);
});

router.use(checkAuth);

router.post("/selectApplicant", (req, res, next) => {
  console.log("POST request to /company/selectApplicant");
  companyController.selectApplicant(req, res, next);
});

router.post("/notifyApplicant", (req, res, next) => {
  console.log("POST request to /company/notifyApplicant");
  companyController.notifyApplicant(req, res, next);
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


