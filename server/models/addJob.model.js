const mongoose = require("mongoose");

const AddJob = new mongoose.Schema(
  {
    title: { type: String, unique: false, required: true },
    company: { type: String, unique: false, required: true },

    description: { type: String, unique: false, required: true },
    
    deadline : { type: String, unique: false, required: true},    
    salary: { type: String, unique: false, required: true },

    benefits: { type: Array, unique: false, required: true },

    requirements: { type: Array, unique: false, required: true},

    type : { type: String, unique: false, required: true},

    remote : { type: String, unique: false, required: true},

    location: { type: String, unique: false, required: true },

    applicants: { type: Array, unique: false, required: false },

    company_id: { type: String, unique: false, required: true },

    selected_applicants: { type: Array, unique: false, required: false },

    companyDescription: { type: String, unique: false, required: false },
    
  },
  { collection: "job_postings" }
);

const AddJobModel = mongoose.model(
  "AddJobModel",
  AddJob,
  "job_postings"
);

module.exports = AddJobModel;