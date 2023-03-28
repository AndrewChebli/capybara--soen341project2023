const Report = require("../models/report-model");
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

const reportJob = async (req, res, next) => {
  const createTheme = new Report({
    type: req.body.type,
    message: req.body.message,
    reason: req.body.reason,
    whistleblower_id: req.body.whistleblower_id,
    whistleblower_name: req.body.whistleblower_name,
    offender_id: req.body.offender_id,
    offender_name: req.body.offender_name,
    data: req.body.data,
  });
  try {
    await createTheme.save();
  } catch (err) {
    const error = new HttpError("Reporting job failed, please try again.", 500);
    return next(error);
  }
  res.status(201).json({ report: createTheme });
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
exports.reportJob = reportJob;
exports.removeReport = removeReport;
