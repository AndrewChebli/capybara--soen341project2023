import * as React from "react";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import SignUpBox from "./SignUpBox";
import WorkExperienceBox from "./WorkExperienceBox";
import EducationBox from "./EducationBox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

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

export default function SignUpForm() {
  async function registerService(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    //Prints the data to the console
    //User Block
    console.log (data.get(`firstName`))
    console.log (data.get(`lastName`))
    console.log (data.get(`email`))
    console.log(data.get(`password`))
    console.log(data.get(`confirmPassword`))

    //Experience Block
    console.log(data.get(`companyName`))
    console.log(data.get(`jobTitle`))
    console.log(data.get(`Description`))
    console.log(data.get(`dateStartedWork`))
    console.log(data.get(`dateCompletedWork`))

    //Education Block
    console.log(data.get(`school`))
    console.log(data.get(`academicProgram`))
    console.log(data.get(`dateStartedSchool`))
    console.log(data.get(`dateCompletedSchool`))


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

    if (response.status === 200){
      alert("Registration Successful")
      window.location.href = "/SignIn";
    }else{
      alert("Registration Failed")
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
        <Grid container spacing={3} sm={"auto"} alignContent="center">
          <SignUpBox />
          <Grid item xs={12}>
            <WorkExperienceBox />
          </Grid>
          <Grid item xs={12}>
            <EducationBox />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2, alignContent: "center" }}
        >
          Sign Up
        </Button>
      </Box>
      <Copyright marginTop={4} />
    </Container>
  );
}
