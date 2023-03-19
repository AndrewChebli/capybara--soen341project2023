const HttpError = require("../models/http-error");
const Job = require("../models/addJob.model.js");
const Company = require("../models/CompanyRegister.model.js");

const getAllJobs = async (req, res, next) => {
  let allJobs = await Job.find().exec();
  res.json(allJobs);
};

const getJobById = async (req, res, next) => {
  const _id = req.params._id;
  console.log(_id)
  try {
    let existingJob;
    existingJob = await Job.findById(_id);
    if (!existingJob) {
      throw new Error("Could not find job.");
    }
    res.json({ job: existingJob.toObject({ getters: true }) });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a job.",
      500
    );
    return next(error);
  }
};

const addJob = async (req, res, next) => {
  const {
    title,
    description,
    location,
    salary,
    company,
    Dday,
    Dmonth,
    Dyear,
    benefits,
    requirements,
    company_id,
  } = req.body;
  let applicants = [];
  let selected_applicants = [];
  const createdJob = new Job({
    title,
    description,
    location,
    salary,
    company,
    applicants,
    Dday,
    Dmonth,
    Dyear,
    benefits,
    requirements,
    company_id,
    selected_applicants,
  });

  try {
    await createdJob.save();
  } catch (error) {
    const err = new HttpError(
      "Adding job failed, please try again later.",
      500
    );
    return next(err);
  }

  let job_id = createdJob._id;
  let existingCompany;
  try {
    existingCompany = await Company.findById(company_id).exec();
  } catch (err) {
    const error = new HttpError(
      "Adding job failed, cannot find related company.",
      500
    );
    return next(error);
  }
  if (!existingCompany) {
    const error = new HttpError("Could not find company for this id.", 404);
    return next(error);
  }
  existingCompany.jobs.push(job_id);
  res.status(201).json({ job: createdJob });
};

const addApplicant = async (req, res, next) => {
  console.log(req.body);
  const { job_id, applicant_id } = req.body;
  let existingJob;
  try {
    existingJob = await Job.findById(job_id).exec();
  } catch (err) {
    const error = new HttpError(
      "Adding applicant failed, please try again later.",
      500
    );
    return next(error);
  }
  if (!existingJob) {
    const error = new HttpError("Could not find job for this id.", 404);
    return next(error);
  }
  console.log(existingJob);
  let result;
  try {
    result = await existingJob.applicants.find(
      (applicant) => applicant === applicant_id
    );
    console.log(result)
  } catch (err) {
    const error = new HttpError("problem looking for duplicates", 500);
    return next(error);
  }



  const new_Applicant = {
    applicant: applicant_id,
    new: true,
  };

  existingJob.applicants.push(new_Applicant);

  try {
    await existingJob.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update job.",
      500
    );
    return next(error);
  }

  res.status(200).json({ job: existingJob.toObject({ getters: true }) });
};

const deleteJobById = async (req, res, next) => {
  const _id = req.params._id;

  try {
    let existingJob;
    existingJob = await Job.findById(_id);
    if (!existingJob) {
      throw new Error("Could not find job.");
    }
    await existingJob.remove();
    res.status(200).json({ message: "Job deleted successfully." });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete the job.",
      500
    );
    return next(error);
  }
};

exports.getAllJobs = getAllJobs;
exports.getJobById = getJobById;
exports.addJob = addJob;
exports.addApplicant = addApplicant;
exports.deleteJobById = deleteJobById;
