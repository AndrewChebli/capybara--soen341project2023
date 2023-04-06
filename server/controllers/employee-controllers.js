const HttpError = require("../models/http-error");
const Employee = require("../models/EmployeeRegister.model.js");
const Job = require("../models/addJob.model.js");
const { getJobById } = require("./jobs-controllers");
const { all } = require("../routes/employee-routes");

const getAllEmployess = async (req, res, next) => {
  Employee.find()
    .then((employees) => {
      res.json(employees);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

const loginEmployee = async (req, res, next) => {
  const { email, password } = req.body;
  let existingEmployee;
  try {
    existingEmployee = await Employee.find({
      email: email,
      password: password,
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
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }
  if (existingEmployee.length === 0) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }
  const _id = existingEmployee[0]._id;
  console.log(_id);
  res.status(201).json({
    message: "Logged in!",
    _id: _id,
    resume: existingEmployee[0].resume,
    resumeName: existingEmployee[0].resumeName,
  });
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
  const createdEmployee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    resume: req.body.resume,
    resumeName: req.body.resumeName,
    skills: req.body.skills,
    phoneNumber: req.body.phoneNumber,
    bio: req.body.bio,
    experience: req.body.experience,
    education: req.body.education,
  });

  try {
    await createdEmployee.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
  res.status(201).json({ employee: createdEmployee });
};

const deleteEmployee = async (req, res, next) => {
  const employeeId = req.params._id;
  console.log(employeeId);
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
    employee = await Employee.findById(employeeId);
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
  console.log("PATCH " + employeeId);

  let existingEmployee;
  try {
    existingEmployee = await Employee.findByIdAndUpdate(employeeId, req.body, {
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

  if(existingEmployee.bookmarks.length === 0){
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

  res.json({ status: 200, bookmarks: myBookmarks});
};

const addBookmark = async (req, res, next) => {
  let _id = req.params._id;
  console.log(_id + "  Addbookmark");
  let existingEmployee;
  let bookmark = req.body.jobPostingId;
  console.log("Job Id Bookmark : " + bookmark);

  try {
    existingEmployee = await Employee.findById(_id);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something went wrong, could not find a employee.",
      500
    );
    return next(error);
  }
  

  if(existingEmployee.bookmarks.includes(bookmark)){
    console.log("Already bookmarked");
    const error = new HttpError("Already bookmarked", 400);
    return next(error);
  }

  existingEmployee.bookmarks.push(bookmark);

  try {
    let result = await existingEmployee.save(
      { new: true },
    );
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

  existingEmployee.bookmarks = existingEmployee.bookmarks.filter(
    (bookmark) => bookmark._id !== req.body._id
  );
    
  try {
    await existingEmployee.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete bookmark.",
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