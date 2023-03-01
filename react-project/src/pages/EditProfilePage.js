import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import WorkExperienceBox from '../components/WorkExperienceBox';
import EducationBox from '../components/EducationBox';
// import { CardActionArea } from "@mui/material";
// import CardContent from '@mui/material';

function EditProfilePage() {
  const theme = createTheme();


  const [photo, setPhoto] = useState(null);

const handlePhotoChange = (event) => {
  setPhoto(URL.createObjectURL(event.target.files[0]));
};

function updateLocalStorage(resp) {
    localStorage.setItem("response", JSON.stringify(resp));
    localStorage.setItem("firstName", resp.db_response.firstname);
    localStorage.setItem("lastName", resp.db_response.lastname);
    if(resp.education === undefined){
      resp.education = [];
    }else{
      localStorage.setItem("education", JSON.stringify(resp.db_resonse.education));
    }
    if(resp.experience === undefined){
      resp.experience = [];
    }else{
      localStorage.setItem("experience", JSON.stringify(resp.db_resonse.experience));
    }
}

async function updateService (event){
    console.log("clicked");
    console.log(event.currentTarget);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log(data.get("firstName"));
    const temp = JSON.parse(localStorage.getItem("response"));
    console.log(temp);
    const _id = temp._id;

    const response = await fetch("http://localhost:8080/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
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
    console.log(response)
    const resp = await response.json();
    
    // console.log("Test result: " + )
    console.log("data: " + JSON.stringify(resp.db_response));
    if(response.status === 200){
      updateLocalStorage(resp);
      alert("Updated the profile!")
    }else{
      alert("Something went wrong! please try again!")
    }
  }
  

  let firstName = localStorage.getItem('firstName');
  let lastName = localStorage.getItem('lastName');
  let email = localStorage.getItem('email');
  let educ_non_parsed = localStorage.getItem('education');
  let educ = JSON.parse(educ_non_parsed);
  let work_non_parsed = localStorage.getItem('experience');
  let work = JSON.parse(work_non_parsed);
  console.log(work[0].Start)


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          component= "form"
          noValidate
          onSubmit={updateService}
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Profile
          </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <label htmlFor="photoInput">
                  <input
                    id="photoInput"
                    name="photo"
                    type="file"
                    accept="image/*"
                    hidden
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  defaultValue={firstName}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  defaultValue={lastName}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  defaultValue={email}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  defaultValue = "********"
                  id="password"
                />
              </Grid>

            <Grid item xs={12}>
            <EducationBox />
          </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Profile
            </Button>
            </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default EditProfilePage;