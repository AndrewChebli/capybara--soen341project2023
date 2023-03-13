const mongoose = require("mongoose");

const CompanyRegisterModel = new mongoose.Schema(
  {
    companyName: { type: String, unique: false },
    email: { type: String, unique: false, required: true },
    password: { type: String, unique: false, required: true },
    description: { type: String, unique: false },
    website: { type: String, unique: false },
    address: { type: String, unique: false },
    phone: { type: String, unique: false },
    logo: { type: String, unique: false },
    logoName: { type: String, unique: false },
    jobs: [
      {
        jobId : {type: String, unique: false},
      }
    ],
  },
  { collection: "companies" }
);

const CompanyRegister = mongoose.model(
  "CompanyRegister",
  CompanyRegisterModel,
  "companies"
);

module.exports = CompanyRegister;