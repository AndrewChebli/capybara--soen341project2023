import * as React from "react";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import PersonalInformationBox from "./PersonalInformationBox";
import WorkExperienceBox from "./WorkExperienceBox";
import EducationBox from "./EducationBox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";


let b64;

export default function SignUpForm() {

  const [resume, setResume] = useState(null);

  const handleResumeChange = (event) => {
    
    console.log("click");
    let file = event.target.files[0],
      reader = new FileReader();

    reader.onloadend = function () {
      b64 = reader.result.replace(/^data:.+;base64,/, "");
      console.log("triggered");
      console.log(b64);
    };
    reader.readAsDataURL(file);
    setResume(event.target.files[0]);
  };

  let resume_name = resume ? resume.name : "No file chosen";

  async function registerService(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    //Prints the data to the console
    //User Block
    console.log(data.get(`firstName`));
    console.log(data.get(`lastName`));
    console.log(data.get(`email`));
    console.log(data.get(`password`));

    console.log(data.get(`resume`));



    const response = await fetch("http://localhost:8080/api/employee/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
        resumeName: resume_name,
        resume: b64,
        experience: {
          company: data.get("companyName"),
          title: data.get("jobTitle"),
          start: data.get("dateStartedWork"),
          end: data.get("dateCompletedWork"),
          description: data.get("Description"),
        },
        education : {
        school: data.get("school"),
        degree: data.get("academicProgram"),
        start: data.get("dateStartedSchool"),
        end: data.get("dateCompletedSchool"),
        }
        }),
    });
    console.log(response);

    if (response.status === 201) {
      alert("Registration Successful");
      window.location.href = "/SignInPage";
    } else {
      alert("Registration Failed");
    }
  }

  return (
    <Container component="main" maxWidth="200" marginTop={15}>
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
        <Grid container spacing={3} sm={12} alignContent="center">
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Grid item xs={4}>
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: "center" }}> 
                <Avatar
                  sx={{
                    mt: 0.85,
                    ml: 4,
                    mb: 3,
                    mr: 1,
                    bgcolor: "secondary.main",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <LockOutlinedIcon />
                </Avatar>

                <Typography component="h3" variant="h3" sx={{ mb: 2, mr: 2 }}>
                  Join the Hive! 
                </Typography>
              {/* </Grid> */}
              </Box>


              <Box sx={{ display: 'flex', justifyContent: "center" }}> 
                <Grid 
                  item
                  xs={1}
                >
                <Avatar
                  sx={{ width: 128, height: 128, marginBottom: -5 }}
                  alt="Profile picture"
                />
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <PersonalInformationBox />
              <Grid item xs={12} sx={{ m: 3 }}>
                <label htmlFor="resumeInput">
                  <Typography component="h4" variant="h6">
                    {`${resume_name}`}{" "}
                  </Typography>
                  <input
                    id="resumeInput"
                    name="resume"
                    type="file"
                    accept=".pdf, .docx"
                    hidden
                    onChange={handleResumeChange}
                  />
                  <AttachFileOutlinedIcon
                    fontSize="large"
                    color="primary"
                    name = "resumeIcon"
                  ></AttachFileOutlinedIcon>
                </label>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <WorkExperienceBox />
          </Grid>
          <Grid item xs={12}>
            <EducationBox />
          </Grid>

          <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ mb: 5, ml: 2 }}
          >
          <Button type="submit" variant="contained">
            Sign Up
          </Button>
          </Grid>
        </Grid>
      </Box>

      {/* <Copyright marginTop={4} /> */}
    </Container>
  );
}
