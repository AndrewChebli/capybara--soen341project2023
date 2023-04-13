const express = require("express");
const router = express.Router();
const reportController = require("../controllers/report-controllers");


router.post("/",(req,res,next)=>{
  console.log("POST request to /report");
  reportController.report(req,res,next);
})

router.get("/getAll",(req,res,next)=>{
  console.log("GET request to /report/getAll");
  reportController.getAllReports(req,res,next);
});

router.get("/getOne/:_id",(req,res,next)=>{
  console.log("GET request to /report/getOne/:_id");
  reportController.getOneReport(req,res,next);
});

router.delete("/:_id",(req,res,next)=>{
  console.log("DELETE request to /report/remove/:_id");
  reportController.removeReport(req,res,next);
});

module.exports = router;