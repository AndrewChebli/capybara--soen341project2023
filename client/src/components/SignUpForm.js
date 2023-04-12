import * as React from "react";
import Container from "@mui/material/Container";
import PersonalInformationBox from "./PersonalInformationBox";
import WorkExperienceBox from "./WorkExperienceBox";
import EducationBox from "./EducationBox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepButton from "@mui/material/StepButton";
import ResumeBox from "./ResumeBox";

export default function SignUpForm() {
  const [resume, setResume] = useState(null);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [workExperience, setWorkExperience] = useState(null);
  const [education, setEducation] = useState(null);
  const [resumeName, setResumeName] = useState(null);
  const [skills, setSkills] = useState([""]);
  const [bio , setBio] = useState(null);
  const [isEmailValidated, setIsEmailValidated] = useState(false);

function handleEmailValidation(isValidEmail) {
  setIsEmailValidated(isValidEmail);
}


  const steps = [
    {
      label: "Personal Information",
      description: "Enter your personal information",
      component: <PersonalInformationBox handlePersonalInfo={setPersonalInfo} 
  handleBio={setBio} 
  handleEmailValidation={handleEmailValidation}/>,
    },
    {
      label: "Work Experience",
      description: "Enter your work experience",
      component: <WorkExperienceBox handleWorkExperience={setWorkExperience} />,
    },
    {
      label: "Education",
      description: "Enter your education",
      component: <EducationBox handleEducation={setEducation} handleSkills = {setSkills}/>,
    },
    {
      label: "Resume",
      description: "Upload your resume",
      component: <ResumeBox handleResume={setResume} handleResumeName = {setResumeName} />,
    },
  ];

  const [activeStep, setActiveStep] = React.useState(0);

  const handleChange = (event) => {
    if (activeStep === steps.length - 1 && resume !== null) {
      registerService();
    } else if (activeStep === steps.length - 1) {
      alert("Please upload your resume");
    } else {
      handleNext();
    }
  };
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };



  async function registerService() {

    console.log("Personal info: " + JSON.stringify(personalInfo));
    console.log("Work Experience: " + JSON.stringify(workExperience));
    console.log("Education: " + JSON.stringify(education));

    const response = await fetch(
      "http://localhost:8080/api/employee/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: personalInfo.firstName,
          lastName: personalInfo.lastName,
          email: personalInfo.email,
          password: personalInfo.password,
          phoneNumber: personalInfo.phoneNumber,
          bio : bio,
          skills: skills,
          experience: workExperience,
          education: education,
          resume: resume,
          resumeName: resumeName,

        }),
      }
    );
    console.log(response);

    if (response.status === 201) {
      alert("Registration Successful");
      window.location.href = "/SignInPage";
    } else {
      alert("Registration Failed");
    }
  }

  return (
    <Container component="main" maxWidth="200">
      <Box
        component="form"
        noValidate
        onSubmit={registerService}
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepButton onClick={() => setActiveStep(index)}>
                {step.label}
              </StepButton>
              <StepContent>
                {step.component}
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleChange}
                      sx={{ mt: 1, mr: 1 }}
                      disabled={!isEmailValidated}
                    >
                      {activeStep === steps.length - 1 ? "Submit" : "Next"}
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Container>
  );
}
