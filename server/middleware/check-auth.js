const HttpError = require("../models/http-error");
const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
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
    console.log("Middleware : " + JSON.stringify(decodedToken));
    console.log("Middleware _id : " + decodedToken._id);
    console.log("Middleware _type: " + decodedToken.type);
    req.userData = {_id: decodedToken._id , type: decodedToken.type };

    next();

  } catch (err) {
    const error = new HttpError("Token Authentication failed!", 401);
    return next(error);
  }
  
 }