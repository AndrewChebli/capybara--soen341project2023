const express = require("express");
const router = express.Router();


router.get("/all", (req, res) => {
  console.log("GET request to /job/all");
});

router.get("/getone/:_id", (req, res) => {
  console.log("GET request to /job/getone/:_id");
  const _id = req.params._id;
  console.log(_id);
});

router.delete("/remove/:_id", (res,req) => 
{
  console.log("GET request to /job/remove/:_id");
  const _id = req.params._id;
  console.log(_id);
})

router.post("/add", (req, res) => {
  console.log("POST request to /job/add");
  const job = req.body;
  console.log(job);
});

router.patch("/update", (req, res) => {
  console.log("POST request to /job/update");
  const job = req.body;
  console.log(job);
});


module.exports = router;