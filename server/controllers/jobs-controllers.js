const HttpError = require("../models/http-error");
const Job = require("../models/addJob.model.js");

const getAllJobs = async (req, res, next) => {
  let allJobs = await Job.find();
  res.json(allJobs);
};

const getJobById = async (req, res, next) => {
  const _id = req.params._id;
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
  const { title, description, location, salary, company, Dday, Dmonth, Dyear, benefits, requirements} = req.body;
  let applicants = [];
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
    requirements
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

  res.status(201).json({ job: createdJob });
};

const addApplicant = async (req, res, next) => {
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
  existingJob.applicants.push(applicant_id);

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

exports.getAllJobs = getAllJobs;
exports.getJobById = getJobById;
exports.addJob = addJob;
exports.addApplicant = addApplicant;
