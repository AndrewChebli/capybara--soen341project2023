const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controllers");


router.post("/register", (req, res, next) => {
  console.log("POST request to /admin/register");
  adminController.registerAdmin(req, res, next);
});

router.post("/login", (req, res, next) => {
  console.log("POST request to /admin/login");
  adminController.loginAdmin(req, res, next);
});

router.get("/getall", (req, res, next) => {
  console.log("GET request to /admin/getall");
  adminController.getAllAdmins(req, res, next);
});

router.get("/getone/:_id", (req, res, next) => {
  console.log("GET request to /admin/getone/:_id");
  adminController.getAdminById(req, res, next);
});

router.delete("/:_id", (req, res, next) => {
  console.log("DELETE request to /admin/remove/:_id");
  adminController.removeAdmin(req, res, next);
});

router.delete("/employee/:_id", (req, res, next) => {
  console.log("DELETE request to /admin/remove/employee/:_id");
  adminController.removeEmployeeAsAdmin(req, res, next);
});

router.delete("/company/:_id", (req, res, next) => {
  console.log("DELETE request to /admin/remove/company/:_id");
  adminController.removeCompanyAsAdmin(req, res, next);
});

router.delete("/job/:_id", (req, res, next) => {
  console.log("DELETE request to /admin/remove/job/:_id");
  adminController.removeJobAsAdmin(req, res, next);
});


module.exports = router;

