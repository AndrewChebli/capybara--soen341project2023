const mongoose = require("mongoose");

const AddJob = new mongoose.Schema(
  {
    title: { type: String, unique: false, required: true },
    company: { type: String, unique: false, required: true },

    description: { type: String, unique: false, required: true },
    
    Dday: { type: String, unique: false, required: true },
    Dmonth: { type: String, unique: false, required: true },
    Dyear: { type: String, unique: false, required: true },
    
    salary: { type: String, unique: false, required: true },

    benefits: { type: String, unique: false, required: true },

    requirements: { type: String, unique: false, required: true}

    
  },
  { collection: "job_postings" }
);

const AddJobModel = mongoose.model(
  "AddJobModel",
  AddJob,
  "job_postings"
);

module.exports = AddJobModel;