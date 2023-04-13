const HttpError = require("../models/http-error");
const jwt = require("jsonwebtoken");
const KEY = require("../config/key.env");


module.exports = (req, res, next) => {
console.log(JSON.stringify(KEY));
  if(req.method === 'OPTIONS') {
    return next();
  }

  console.log("check-auth.js");
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);

    if (!token) {
      console.log("Token not found!");
    throw new HttpError(" Authentication failed!", 401);
    }

    const decodedToken = jwt.verify(token, "capybaraSoen341");
    console.log(decodedToken);
    req.userData = { auth_id: decodedToken._id };
    next();

  } catch (err) {
    const error = new HttpError("Token Authentication failed!", 401);
    return next(error);
  }
  
 }