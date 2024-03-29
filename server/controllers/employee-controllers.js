const HttpError = require("../models/http-error");
const Employee = require("../models/EmployeeRegister.model.js");
const Job = require("../models/addJob.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllEmployess = async (req, res, next) => {
  Employee.find()
    .then((employees) => {
      res.json(employees);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

const loginEmployee = async (req, res, next) => {
  const { email } = req.body;
  let existingEmployee;

  try {
    existingEmployee = await Employee.find({
      email: email,
    }).exec();
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }
  if (!existingEmployee) {
    const error = new HttpError(
      "No Employee found for this email, please try again later.",
      401
    );
    return next(error);
  }
  if (existingEmployee.length === 0) {
    const error = new HttpError(
      "No Employee found for this email, please try again later.",
      401
    );
    return next(error);
  }

  const _id = existingEmployee[0]._id;
  console.log("_id: " + _id);
  console.log("existingEmployee[0].password: " + existingEmployee[0].password);
  console.log("req.body.password: " + req.body.password);

  if (bcrypt.compareSync(req.body.password, existingEmployee[0].password)) {
    console.log("passwords match")
    let token;
    try{
      token = jwt.sign( 
        {
        _id: _id,
        email: email,
        },
        "capybaraSoen341",
        {expiresIn : "1h"}
      );
      }catch(err){
        const error = new HttpError(
          "Logging in failed, could not create token",
          500
        );
        return next(error);
    }

    res.status(201).json({
      message: "Logged in!",
      _id: _id,
      resume: existingEmployee[0].resume,
      resumeName: existingEmployee[0].resumeName,
      token : token
    });
  } else {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }
};

const getEmployeeById = async (req, res, next) => {
  const employeeId = req.params._id;

  try {
    const employee = await Employee.findById(employeeId).exec();
    if (!employee) {
      throw new Error("Could not find employee.");
    }
    res.json({ employee: employee.toObject({ getters: true }) });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a employee.",
      500
    );
    return next(error);
  }
};

const registerEmployee = async (req, res, next) => {
  console.log(req.body);
  const {
    firstName,
    lastName,
    email,
    password,
    resume,
    resumeName,
    skills,
    phoneNumber,
    bio,
    experience,
    education,
  } = req.body;

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }

  const createdEmployee = new Employee({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    resume,
    resumeName,
    skills,
    phoneNumber,
    bio,
    experience,
    education,
  });

  try {
    const existingEmployee = await Employee.findOne({ email: req.body.email.toLowerCase() }).exec();
    if (existingEmployee) {
      throw new Error('Email already exists');
    }

    const createdEmployee = new Employee({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email.toLowerCase(),
      password: hashedPassword,
      resume: req.body.resume,
      resumeName: req.body.resumeName,
      skills: req.body.skills,
      phoneNumber: req.body.phoneNumber,
      bio: req.body.bio,
      experience: req.body.experience,
      education: req.body.education,
    });

    await createdEmployee.save();
    res.status(201).json({ employee: createdEmployee });
  } catch (err) {
    const error = new HttpError(
      err.message || "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
};


const deleteEmployee = async (req, res, next) => {
  const employeeId = req.params._id;
  const auth_id = req.userData._id;
  const auth_type = req.userData.type;
  console.log("auth_id : " + auth_id);
  console.log("auth_type : " + auth_type);
  
  console.log(auth_id);
  let employee;

  let allJobs;

  try {
    allJobs = await Job.find().exec();
    allJobs.forEach(async (job) => {
      console.log(job.applicants);
      job.applicants.forEach(async (applicant) => {
        console.log(applicant.applicant + "<->" + employeeId);
        if (applicant.applicant === employeeId) {
          console.log(
            "========================removing " + applicant.applicant
          );
          job.applicants.pull(applicant);
        }
      });
      await job.save();
    });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete employee applications.",
      500
    );
    return next(error);
  }

  try {
    employee = await Employee.findById(auth_id);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete employee.",
      500
    );
    return next(error);
  }

  if (!employee) {
    const error = new HttpError("Could not find employee for this id.", 404);
    return next(error);
  } else {
    try {
      await employee.remove();
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not delete employee.",
        500
      );
      return next(error);
    }

    // try {
    //   allJobs = await Job.findAll().exec();
    //   allJobs.forEach(async (job) => {
    //     job.applicants.forEach(async (applicant) => {
    //       console.log(applicant._id + "<->" + employeeId)
    //       if (applicant._id === employeeId) {
    //         try {
    //           await applicant.remove();
    //         } catch (err) {
    //           const error = new HttpError(
    //             "Something went wrong, could not delete employee applications.",
    //             500
    //           );
    //           return next(error);
    //         }
    //       }
    //     });
    //     await job.save();
    //   });

    // }catch (error){
    //   const err = new HttpError(
    //     "Something went wrong, could not delete employee applications.",
    //     500
    //   );
    //   return next(err);
    // }

    res.status(200).json({ message: "Deleted employee." });
  }
};

const updateEmployee = async (req, res, next) => {
  const employeeId = req.params._id;
  const auth_id = req.userData._id;
  const auth_type = req.userData.type;
  console.log("auth_id : " + auth_id);
  console.log("auth_type : " + auth_type);

  let existingEmployee;
  try {
    existingEmployee = await Employee.findByIdAndUpdate(auth_id, req.body, {
      new: true,
    }).exec();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update employee.",
      500
    );
    return next(error);
  }

  if (!existingEmployee) {
    const error = new HttpError("could not find employee for this id.", 404);
    return next(error);
  }

  res
    .status(200)
    .json({ employee: existingEmployee.toObject({ getters: true }) });
};

const getAllOffers = async (req, res, next) => {
  let _id = req.params._id;
  let allOffers;
  console.log(_id);

  try {
    allOffers = await Job.find().exec();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a job.",
      500
    );
    return next(error);
  }

  if (!allOffers) {
    const error = new HttpError(
      "Something went wrong, could not find a job.",
      500
    );
    return next(error);
  }
  if (allOffers.length === 0) {
    const error = new HttpError("No offers yet", 400);
    return next(error);
  }
  let myOffers = [];
  for (let i = 0; i < allOffers.length; i++) {
    allOffers[i] = allOffers[i].toObject({ getters: true });
    for (let j = 0; j < allOffers[i].selected_applicants.length; j++) {
      if (_id === allOffers[i].selected_applicants[j].applicant_id) {
        console.log("found");
        myOffers.push(allOffers[i]);
      }
    }
  }
  console.log(myOffers);
  res.json({ status: 200, offers: myOffers });
};

const getNews = async (req, res, next) => {
  let news;
  try {
    news = fetch(
      "https://newsdata.io/api/1/news?apikey=pub_198561604e298373f3b46663b31ff10631502&language=en&category=business,technology",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let response = await news;
    response = await response.json();

    if (response.status === "success") {
      console.log("=========================worked=========================");
      res.json({ status: 200, news: response });
    } else {
      const error = new HttpError(
        "Something went wrong, could not find news.",
        500
      );
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find news.",
      500
    );
    return next(error);
  }
};

const getBookmarks = async (req, res, next) => {
  let _id = req.params._id;
  let existingEmployee;

  try {
    existingEmployee = await Employee.findById(_id).exec();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a employee.",
      500
    );
    return next(error);
  }


  if (existingEmployee.bookmarks.length === 0) {
    const error = new HttpError("No bookmarks yet", 400);
    return next(error);
  }

  console.log(existingEmployee.bookmarks);
  let myBookmarks = [];

  try {
    let allJobs = await Job.find().exec();
    let allIds = [];

    allJobs.forEach((job) => {
      job = job.toObject({ getters: true });
      allIds.push(job.id);
    });

    existingEmployee.bookmarks.forEach((bookmark) => {
      if (!allIds.includes(bookmark)) {
        myBookmarks.splice(bookmark, 1);

      }
    });

    existingEmployee.bookmarks.forEach((bookmark) => {
      allJobs.forEach((job) => {
        job = job.toObject({ getters: true });
        if (job.id === bookmark) {
          myBookmarks.push(job);
        }
      });
    });

    console.log(myBookmarks);

  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a job.",
      500
    );
    return next(error);
  }


  res.json({ status: 200, bookmarks: myBookmarks });
};

const addBookmark = async (req, res, next) => {
  let _id = req.params._id;
  console.log(req.userData)
  const auth_id = await req.userData._id;
  const auth_type = await req.userData.type;
  console.log("auth_id : " + auth_id);
  console.log("auth_type : " + auth_type);
  let existingEmployee;
  let bookmark = req.body.jobPostingId;

  try {
    existingEmployee = await Employee.findById(auth_id);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something went wrong, could not find a employee.",
      500
    );
    return next(error);
  }


  if (existingEmployee.bookmarks.includes(bookmark)) {
    console.log("Already bookmarked");
    const error = new HttpError("Already bookmarked", 400);
    return next(error);
  }

  existingEmployee.bookmarks.push(bookmark);

  try {

    let result = await existingEmployee.save({ new: true });
    console.log(result.bookmarks);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not add bookmark.",
      500
    );
    return next(error);
  }

  res.json({ status: 200, message: "Added bookmark" });
};

const deleteBookmark = async (req, res, next) => {
  let _id = req.params._id;
  const auth_id = req.userData._id;
  const auth_type = req.userData.type;
  console.log("auth_id : " + auth_id);
  console.log("auth_type : " + auth_type);
  let bookmarkToDelete = req.body.index;
  let existingEmployee;

  try {
    existingEmployee = await Employee.findById(auth_id);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find employee.",
      500
    );
    return next(error);
  }


  console.log(existingEmployee.bookmarks);
  existingEmployee.bookmarks.splice(bookmarkToDelete, 1);
  console.log(existingEmployee.bookmarks);

  try {
    existingEmployee.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could delete bookmark.",
      500
    );
    return next(error);
  }

  res.json({ status: 200, message: "Deleted bookmark" });
};


exports.getAllEmployess = getAllEmployess;
exports.getEmployeeById = getEmployeeById;
exports.registerEmployee = registerEmployee;
exports.updateEmployee = updateEmployee;
exports.deleteEmployee = deleteEmployee;
exports.loginEmployee = loginEmployee;
exports.getAllOffers = getAllOffers;
exports.getNews = getNews;
exports.getBookmarks = getBookmarks;
exports.addBookmark = addBookmark;

exports.deleteBookmark = deleteBookmark;
