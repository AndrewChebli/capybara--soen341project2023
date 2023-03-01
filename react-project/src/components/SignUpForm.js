import * as React from "react";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import PersonalInformationBox from "./PersonalInformationBox";
import WorkExperienceBox from "./WorkExperienceBox";
import EducationBox from "./EducationBox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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

    // //Experience Block
    // console.log(data.get(`companyName`));
    // console.log(data.get(`jobTitle`));
    // console.log(data.get(`Description`));
    // console.log(data.get(`dateStartedWork`));
    // console.log(data.get(`dateCompletedWork`));

    // //Education Block
    // console.log(data.get(`school`));
    // console.log(data.get(`academicProgram`));
    // console.log(data.get(`dateStartedSchool`));
    // console.log(data.get(`dateCompletedSchool`));

    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
        resume: b64,
        companyName: data.get("companyName"),
        jobTitle: data.get("jobTitle"),
        dateStartedWork: data.get("dateStartedWork"),
        dateCompletedWork: data.get("dateCompletedWork"),
        Description: data.get("Description"),

        school: data.get("school"),
        academicProgram: data.get("academicProgram"),
        dateStartedSchool: data.get("dateStartedSchool"),
        dateCompletedSchool: data.get("dateCompletedSchool"),
      }),
    });
    console.log(response);

    if (response.status === 200) {
      alert("Registration Successful");
      window.location.href = "/SignIn";
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
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Grid container spacing={3} sm={12} alignContent="center">
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Grid item xs={4}>
                {/* <label htmlFor="photoInput">
                  <input
                    id="photoInput"
                    name="photo"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handlePhotoChange}
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label> */}
              </Grid>
              <Grid
                item
                xs={4}
                sx={{ pl: 20, justifyContent: "center", display: "flex" }}
              >
                <Avatar
                  sx={{ width: 128, height: 128, marginBottom: 2 }}
                  alt="Profile picture"
                />
              </Grid>

              <Grid sx={{ display: "flex", justifyContent: "center" }}>
                <Avatar
                  sx={{
                    m: 5,
                    mr: 3,
                    bgcolor: "secondary.main",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h1" sx={{ mb: 2 }}>
                  Sign up
                </Typography>
              </Grid>
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
          <Button type="submit" variant="contained">
            Sign Up
          </Button>
        </Grid>
      </Box>

      <Copyright marginTop={4} />
    </Container>
  );
}
