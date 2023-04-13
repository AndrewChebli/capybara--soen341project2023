const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login-controllers");

router.post("/login", (req, res, next) => {
  console.log("POST request to universal/login"); 
  loginController.loginUniversal(req, res, next);
}
);

module.exports = router;