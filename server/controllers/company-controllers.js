const HttpError = require("../models/http-error");
const Company = require("../models/CompanyRegister.model.js");

const getAllCompanies = (req, res, next) => {
  console.log("GET request to /company/getall");
  Company.find()
    .then((companies) => {
      res.json(companies);
    }
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

const getCompanyById = (req, res, next) => {

  console.log("GET request to /company/getone/:_id");
  const _id = req.params._id;
  console.log(_id);
  Company.findById(_id)
    .then((company) => res.json(company))
    .catch((err) => res.status(400).json("Error: " + err));
};

const addCompany = async (req, res, next) => {

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

  try{
    await createdCompany.save();
  }catch(error)
  {
    const err = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(err);
  }
    res.status(201).json({company: createdCompany});

};

const removeCompany = async (req, res, next) => {

  const companyId = req.params._id;
  let company;
  try {
    company = await Company.findById(companyId);
  }catch (error)
  {
    const err = new HttpError(
      'Something went wrong, could not delete company.',
      500
    );
    return next(err);

  }

  if(!company)
  {
    const err = new HttpError(
      'Could not find company for this id.',
      404
    );
    return next(err);
  }else{
    try{
      await company.remove();
    }catch(error)
    {
      const err = new HttpError(
        'Something went wrong, could not delete company.',
        500
      );
      return next(err);
    }
    res.status(200).json({message: 'Deleted company.'});
  }
};

const updateCompany = (req, res, next) => {
  console.log("POST request to /company/update/:_id");
  const _id = req.params._id;
  console.log(_id);
};

exports.getAllCompanies = getAllCompanies;
exports.getCompanyById = getCompanyById;
exports.addCompany = addCompany;
exports.removeCompany = removeCompany;
exports.updateCompany = updateCompany;
