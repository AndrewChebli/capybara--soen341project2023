const HttpError = require("../models/http-error");
const Company = require("../models/CompanyRegister.model.js");
const Employee = require("../models/EmployeeRegister.model.js");
const Job = require("../models/addJob.model.js");
const jwt = require("jsonwebtoken");

const getAllCompanies = (req, res, next) => {
  console.log("GET request to /company/getall");
  Company.find()
    .then((companies) => {
      res.json(companies);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

const getCompanyJobs = async (req, res, next) => {
  const company_id = req.params._id;
  let allCompanyJobs;
  try {
    allCompanyJobs = await Job.find({ company_id: company_id }).exec();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a job.",
      500
    );
    return next(error);
  }
  console.log(allCompanyJobs);

  if (!allCompanyJobs) {
    const error = new HttpError(
      "Could not find a job for the provided company id.",
      404
    );
    return next(error)
  }

  allCompanyJobs.forEach((job) => {
    console.log("=====================================");
    job.applicants.forEach((applicant) => {
      applicant.new = "false";
    });
    job.save();
  });

  res.json({ status: 200, jobs: allCompanyJobs });
};

const loginCompany = async (req, res, next) => {
  const { email, password } = req.body;
  let existingCompany;
  try {
    existingCompany = await Company.find({ email: email, password: password });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }
  if (!existingCompany) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }
  if (existingCompany.length === 0) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }
  const _id = existingCompany[0]._id;
  console.log(_id);

  let token;

  try {
    token = jwt.sign(
      {_id : _id,
      email: email},
      "capybaraSoen341",
      {expiresIn: "1h"}
    );
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  res.status(201).json({
    message: "Logged in!",
    _id: _id,
    companyName: existingCompany[0].companyName,
    token : token
  });
};

const getCompanyById = (req, res, next) => {
  console.log("GET request to /company/getone/:_id");
  const _id = req.params._id;
  console.log(_id);
  Company.findById(_id)
    .then((company) => res.json(company))
    .catch((err) => res.status(400).json("Error: " + err));
};

const registerCompany = async (req, res, next) => {
  const createdCompany = new Company({
    companyName: req.body.companyName,
    email: req.body.email,
    password: req.body.password,
    description: req.body.description,
    website: req.body.website,
    address: req.body.address,
    phone: req.body.phone,
    logo: req.body.logo,
    logoName: req.body.logoName,
    jobs: req.body.jobs,
  });

  try {
    await createdCompany.save();
  } catch (error) {
    const err = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(err);
  }
  res.status(201).json({ company: createdCompany });
};

const removeCompany = async (req, res, next) => {

  const auth_id = req.userData._id;
  let company;
  try {
    company = await Company.findById(auth_id).exec();
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not delete company.",
      500
    );
    return next(err);
  }

  if (!company) {
    const err = new HttpError("Could not find company for this id.", 404);
    return next(err);
  } else {
    try {
      await company.remove();
    } catch (error) {
      const err = new HttpError(
        "Something went wrong, could not delete company.",
        500
      );
      return next(err);
    }
    res.status(200).json({ message: "Deleted company." });
  }
};

const updateCompany = (req, res, next) => {
  console.log("POST request to /company/update/:_id");
  const _id = req.params._id;
  console.log(_id);
};

const selectApplicant = async (req, res, next) => {
  const auth_id = req.userData._id;
  const { job_id, applicant_id } = req.body;
  let existingJob;

  // adding the applicant to the selected applicants
  try {
    existingJob = await Job.findById(job_id).exec();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a job.",
      500
    );
    return next(error);
  }
  if (!existingJob) {
    const error = new HttpError("Could not find job for the provided id.", 404);
    return next(error);
  }

  //looking for duplicate applicants
  let existingJobObject = existingJob.toObject({ getters: true });
  if(existingJobObject.company_id !== auth_id)
  {
    const error = new HttpError("You are not authorized to select applicants for this job.", 401);
    return next(error);
  }


  let duplicate = false;
  existingJobObject.selected_applicants.forEach((applicant) => {
    if (applicant.applicant_id === applicant_id) {
      console.log("triggered");
      duplicate = true;
    }
  });
  if (duplicate) {
    const error = new HttpError(
      "You have already selected this applicant.",
      422
    );
    return next(error);
  }

  //adding the applicant to the selected applicants
  existingJob.selected_applicants.push({ applicant_id: applicant_id });

  try {
    await existingJob.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not select applicant.",
      500
    );
    return next(error);
  }

  // adding the offer to the employee
  let existingEmployee;
  try {
    existingEmployee = await Employee.findById(applicant_id).exec();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a employee.",
      500
    );
    return next(error);
  }
  if (!existingEmployee) {
    const error = new HttpError(
      "Could not find employee for the provided id.",
      404
    );
    return next(error);
  }
  existingEmployee.offers.push(job_id);
  try {
    await existingEmployee.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not select applicant.",
      500
    );
    return next(error);
  }

  res.status(200).json({ job: existingJob.toObject({ getters: true }) });
};

//obsolete code
const notifyApplicant = async (req, res, next) => {
  const { job_id, applicant_id } = req.body;

  let selectedUser;
  try {
    selectedUser = await Employee.findById(applicant_id).exec();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a user.",
      500
    );
    return next(error);
  }

  if (!selectedUser) {
    const error = new HttpError(
      "Could not find user for the provided id.",
      404
    );
    return next(error);
  }

  selectApplicant.offers.push(job_id);

  try {
    await selectedUser.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not select applicant.",
      500
    );
    return next(error);
  }
  res.status(200).json({ job: selectedUser.toObject({ getters: true }) });
};

exports.getAllCompanies = getAllCompanies;
exports.getCompanyById = getCompanyById;
exports.registerCompany = registerCompany;
exports.loginCompany = loginCompany;
exports.removeCompany = removeCompany;
exports.updateCompany = updateCompany;
exports.selectApplicant = selectApplicant;
exports.notifyApplicant = notifyApplicant;
exports.getCompanyJobs = getCompanyJobs;
