const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobs-controllers");
router.get("/all", (req, res, next) => {
  console.log("GET request to /job/all");
  jobController.getAllJobs(req, res, next);
});

router.get("/getone/:_id", (req, res, next) => {
  console.log("GET request to /job/getone/:_id");
  const _id = req.params._id;
  console.log(_id);
  jobController.getJobById(req, res, next);
});

router.delete("/remove/:_id", (res, req, next) => {
  console.log("GET request to /job/remove/:_id");
  const _id = req.params._id;
  console.log(_id);
});


router.post("/add/applicant/", (req, res, next) => {
  console.log("POST request to /job/add/applicant");
  const job = req.body;
  console.log(job);
  jobController.addApplicant(req, res, next);
});

router.post("/add", (req, res, next) => {
  console.log("POST request to /job/add");
  const job = req.body;
  console.log(job);
  jobController.addJob(req, res, next);
});




module.exports = router;