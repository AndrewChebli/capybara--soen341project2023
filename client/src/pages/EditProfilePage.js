import React from "react";
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
import { useState, useEffect } from "react";

let b64;

function EditProfilePage() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#394727",
      },
    },
    typography: {
      fontFamily: "Roboto",
    },
    transitions: {
      easing: {
        easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
        easeIn: "cubic-bezier(0.4, 0, 1, 1)",
        easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
        sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
      },
    },
  });

  const [employeeInfo, setEmployeeInfo] = useState({});

  useEffect(() => {
    async function getEmployeeInfo() {
      await fetch(
        "http://localhost:8080/api/employee/getone/" +
          localStorage.getItem("_id"),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response.employee);
          setEmployeeInfo(response.employee);
        });
    }
    getEmployeeInfo();
    console.log(employeeInfo);
  }, []);

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

  async function updateService(event) {
    console.log("clicked");
    console.log(event.currentTarget);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  }

  console.log(employeeInfo.firstName);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          component="form"
          noValidate
          onSubmit={updateService}
          sx={{
            marginTop: 15,
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
                defaultValue={employeeInfo.firstName}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                defaultValue={employeeInfo.lastName}
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
                        // defaultValue={employeeInfo.employee.experience.position}
                      />
                    </Grid>
                    <Grid item xs={12} sm={20}>
                      <TextField
                        name="companyName"
                        required
                        fullWidth
                        id="companyName"
                        label="Company Name"
                        // defaultValue={employeeInfo.employee.experience.company}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="dateStartedWork"
                        required
                        fullWidth
                        id="dateStartedWork"
                        type="date"
                        // defaultValue={employeeInfo.employee.experience.start}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="dateCompletedWork"
                        fullWidth
                        id="dateCompletedWork"
                        type="date"
                        // defaultValue={employeeInfo.employee.experience.end}
                      />
                    </Grid>
                    <Grid item xs={12} sm={20}>
                      <TextField
                        multiline={true}
                        // defaultValue={employeeInfo.employee.experience.Description}
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
                        // defaultValue={employeeInfo.employee.education.school}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        required
                        fullWidth
                        name="academicProgram"
                        label="Academic Program"
                        id="academicProgram"
                        // defaultValue={employeeInfo.employee.degree}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        name="dateStartedSchool"
                        required
                        fullWidth
                        id="dateStartedSchool"
                        type="date"
                        // defaultValue={employeeInfo.employee.education.start}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        name="dateCompletedSchool"
                        fullWidth
                        id="dateCompletedSchool"
                        type="date"
                        // defaultValue={employeeInfo.employee.education.end}
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
