const MongoCLient = require("mongodb").MongoClient;

const url = "mongodb+srv://root:1234@soen341.xywwhkp.mongodb.net/SOEN341";


const createUser = async (req, res, next) => {
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    resume: req.body.resume,
    dateStartedSchool: req.body.dateStartedSchool,
    dateCompletedSchool: req.body.dateCompletedSchool,
    school: req.body.school,
    academicProgram: req.body.academicProgram,
    dateStartedWork: req.body.dateStartedWork,
    dateCompletedWork: req.body.dateCompletedWork,
    companyName: req.body.companyName,
    jobTitle: req.body.jobTitle,
    Description: req.body.Description,
  };

  const client = new MongoCLient(url);

  try {
    await client.connect();
    const db = client.db();
    const result = await db.collection("users").insertOne(newUser);
    console.log(result);
  }catch (error) {
    console.log(error);
  }

  client.close();
  res.json({ status: "success" });

};
