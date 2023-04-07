const Report = require("../models/Report.model");
const HttpError = require("../models/http-error");

const getAllReports = async (req, res, next) => {
  let reports;
  try {
    reports = await Report.find();
  } catch (err) {
    const error = new HttpError(
      "Fetching reports failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    reports: reports.map((report) => report.toObject({ getters: true })),
  });
};

const getOneReport = async (req, res, next) => {
  let report;
  try {
    report = await Report.find({ _id: req.params._id });
  } catch (err) {
    const error = new HttpError(
      "Fetching report failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    report: report.map((report) => report.toObject({ getters: true })),
  });
};

const report = async (req, res, next) => {
  let type = req.body.type;
  console.log("=================REPORT==================")
  console.log("=================" + type + "==================")
  console.log(req.body);
  let report = new Report({
    type: type,
    message : req.body.message,
    whilestblower_name: req.body.whilestblower_name,
    whilestblower_id: req.body.whilestblower_email,
    offender_id: req.body.offender_id,
    offender_name: req.body.offender_name,
    data : req.body.data,
  });
  try {
    await report.save();
  }
  catch (err) {
    const error = new HttpError(
      "Something went wrong, could not report job.",
      500
    );
    return next(error);
  }
  res.status(201).json({ report: report.toObject({ getters: true }) });
};

const removeReport = async (req, res, next) => {
  let report;
  try {
    report = await Report.findById(req.params._id);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete report.",
      500
    );
    return next(error);
  }

  if (!report) {
    const error = new HttpError("Could not find report for this id.", 404);
    return next(error);
  }

  try {
    await report.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete report.",
      500
    );
    return next(error);
  }
  res.status(200).json({ message: "Deleted report." });
};




exports.getAllReports = getAllReports;
exports.getOneReport = getOneReport;
exports.report = report;
exports.removeReport = removeReport;

