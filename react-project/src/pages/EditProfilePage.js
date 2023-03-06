import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
// import { CardActionArea } from "@mui/material";
// import CardContent from '@mui/material';

let b64;

function EditProfilePage() {
  const theme = createTheme();

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

  function updateLocalStorage(resp) {
    localStorage.setItem("response", JSON.stringify(resp));
    localStorage.setItem("firstName", resp.db_response.firstname);
    localStorage.setItem("lastName", resp.db_response.lastname);
    localStorage.setItem("resume", resp.db_response.resume);
    localStorage.setItem("resumeName", resp.db_response.resumeName);
    localStorage.setItem("education",JSON.stringify(resp.db_response.education));
    localStorage.setItem("experience",JSON.stringify(resp.db_response.previousExperience));
  }

  async function updateService(event) {
    console.log("clicked");
    console.log(event.currentTarget);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const temp = JSON.parse(localStorage.getItem("response"));
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
        email: localStorage.getItem("email"),
        resume: b64,
        resumeName: resume_name,
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
    const resp = await response.json();
    console.log("response");
    console.log(resp);
    console.log(resp.db_response)
    console.log(resp.db_response.education)
    // console.log("Test result: " + )
    if (response.status === 200) {
      updateLocalStorage(resp);
      alert("Updated the profile!");
    } else {
      alert("Something went wrong! please try again!");
    }
  }

  let firstName = localStorage.getItem("firstName");
  let lastName = localStorage.getItem("lastName");
  let email = localStorage.getItem("email");
  let resumeName = localStorage.getItem("resumeName");
  let educ_non_parsed = localStorage.getItem("education");
  let educ = JSON.parse(educ_non_parsed);
  let work_non_parsed = localStorage.getItem("experience");
  let work = JSON.parse(work_non_parsed);
  console.log(work[0].Start);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          component="form"
          noValidate
          onSubmit={updateService}
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ p: 2 }}>
            Edit Profile
          </Typography>
          <Grid container spacing={2}>
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
            <Grid item xs={12}>
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Grid item xs={"auto"}>
                  <Typography component="h1" variant="h4" marginBottom={2}>
                    Work Experience
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        name="jobTitle"
                        required
                        fullWidth
                        id="jobTitle"
                        label="Job Title"
                        defaultValue={work[0].Position}
                      />
                    </Grid>
                    <Grid item xs={12} sm={20}>
                      <TextField
                        name="companyName"
                        required
                        fullWidth
                        id="companyName"
                        label="Company Name"
                        defaultValue={work[0].Company}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="dateStartedWork"
                        required
                        fullWidth
                        id="dateStartedWork"
                        type="date"
                        defaultValue={work[0].Start}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="dateCompletedWork"
                        fullWidth
                        id="dateCompletedWork"
                        type="date"
                        defaultValue={work[0].End}
                      />
                    </Grid>
                    <Grid item xs={12} sm={20}>
                      <TextField
                        multiline={true}
                        defaultValue={work[0].Description}
                        rows={4}
                        name="Description"
                        fullWidth
                        id="Description"
                        label="Description"
                        type="text"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography component="h1" variant="h4" margin={2} marginTop={6}>
                Education
              </Typography>
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mt: 3,
                }}
              >
                <Grid item xs={"auto"}>
                  <Grid container spacing={2}>
                    <Grid item xs={"auto"} sm={6}>
                      <TextField
                        name="school"
                        required
                        fullWidth
                        id="school"
                        label="School Name"
                        defaultValue={educ.School}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        required
                        fullWidth
                        name="academicProgram"
                        label="Academic Program"
                        id="academicProgram"
                        defaultValue={educ.Degree}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        name="dateStartedSchool"
                        required
                        fullWidth
                        id="dateStartedSchool"
                        type="date"
                        defaultValue={educ.Start}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        name="dateCompletedSchool"
                        fullWidth
                        id="dateCompletedSchool"
                        type="date"
                        defaultValue={educ.End}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
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
