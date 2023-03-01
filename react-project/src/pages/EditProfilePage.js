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
// import { CardActionArea } from "@mui/material";
// import CardContent from '@mui/material';

function EditProfilePage() {
  const theme = createTheme();

  const handlePersonalInfoSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      city: data.get('city'),
      country: data.get('country'),
    });
  };
  const [photo, setPhoto] = useState(null);

const handlePhotoChange = (event) => {
  setPhoto(URL.createObjectURL(event.target.files[0]));
};
  const handleEducationSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      school: data.get('school'),
      academicProgram: data.get('academicProgram'),
      dateStarted: data.get('dateStarted'),
      dateCompleted: data.get('dateCompleted'),
    });
  };

  const handleWorkExperienceSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      workExperience: data.get('workExperience'),
      dateStarted: data.get('dateStarted'),
      dateCompleted: data.get('dateCompleted'),
    });
  };

  const handleSkillsSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      skills: data.get('skills'),
    });
  };

  

  let firstName = localStorage.getItem('firstName');
  let lastName = localStorage.getItem('lastName');
  let email = localStorage.getItem('email');
  let educ_non_parsed = localStorage.getItem('education');
  let educ = JSON.parse(educ_non_parsed);
  let work_non_parsed = localStorage.getItem('experience');
  let work = JSON.parse(work_non_parsed);
  console.log("HERE DUMBFUCK")
  console.log(work[0].Start)


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
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
          <form onSubmit={handlePersonalInfoSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <label htmlFor="photoInput">
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
                </label>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  defaultValue={firstName}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
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
                  required
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
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  defaultValue = "********"
                  id="password"
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="address-level2"
                  name="city"
                  required
                  fullWidth
                  id="city"
                  label="City"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="country"
                  label="Country"
                  id="country"
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save Personal Info
            </Button>
          </form>

          <form onSubmit={handleEducationSubmit} noValidate sx={{ mt: 3 }}>
            <Typography component="h2" variant="h6">
              Education
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="school"
                  required
                  fullWidth
                  id="school"
                  label="School Name"
                  defaultValue={educ.School}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="academicProgram"
                  label="Academic Program"
                  id="academicProgram"
                  defaultValue={educ.Degree}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="dateStarted"
                  required
                  fullWidth
                  id="dateStarted"
                  label="Date Started"
                  type="date"
                  defaultValue={educ.Start}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="dateCompleted"
                  fullWidth
                  id="dateCompleted"
                  label="Date Completed"
                  type="date"
                  defaultValue={educ.End}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save Education
            </Button>
          </form>
          
          <form onSubmit={handleWorkExperienceSubmit} noValidate sx={{ mt: 3 }}>
            <Typography component="h2" variant="h6">
              Work Experience
            
            </Typography>
            {/* Work experience start */}
            {/* Insert map */}
            {/* {{work.map((work) => (
            <work />
          ))} } */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="workExperience"
                  required
                  fullWidth
                  id="workExperience"
                  label="Work Experience"
                  defaultValue={work[0].Company}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="dateStarted"
                  required
                  fullWidth
                  id="dateStarted"
                  label="Date Started"
                  type="date"
                  defaultValue={work[0].Start}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="dateCompleted"
                  fullWidth
                  id="dateCompleted"
                  label="Date Completed"
                  type="date"
                  defaultValue={work[0].End}
                />
              </Grid>
            </Grid>
            {/* Work Experience end */}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save Work Experience
            </Button>
          </form>

          <form onSubmit={handleSkillsSubmit} noValidate sx={{ mt: 3 }}>
            <Typography component="h2" variant="h6">
              Skills
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="skills"
                  required
                  fullWidth
                  id="skills"
                  label="Skills"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save Skills
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default EditProfilePage;