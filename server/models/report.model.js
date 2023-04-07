const mongoose = require("mongoose");
const ReportModel = new mongoose.Schema(
  {
    type : {type: String, required: true},
    message : {type : String, required: true},
    reason : {type : String, required: true},
    whistleblower_id : {type : String, required: true},
    offender_id : {type : String, required: true},
    offender_name : {type : String, required: true},
    data : {type : Object, required: true}
  },{collection: "reports"}
  );

const Report = mongoose.model("Report", ReportModel, "reports");


module.exports = Report;
