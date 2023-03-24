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
import { Divider } from "@mui/material";


  let b64 = localStorage.getItem("resume") ? localStorage.getItem("resume") : null;

function EditProfilePage() {

  const [resume, setResume] = useState(localStorage.getItem("resume") ? localStorage.getItem("resume") : null);

  const [resumeName, setResumeName] = useState(null);

  const [employeeInfo, setEmployeeInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    education: {
      school: "",
      degree: "",
      start: "",
      end: "",
    },
    resumeName: "",
    resume: resume,
    experience: [
      {
        company: "",
        position: "",
        description: "",
        start: "",
        end: "",
      },
    ],
  });
  useEffect(() => {
    async function getEmployeeInfo() {
      let response_from_backend;
      response_from_backend = await fetch(
        "http://localhost:8080/api/employee/getone/" +
          localStorage.getItem("_id"),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response_from_backend);
      let response = await response_from_backend.json();
      console.log(response);
      localStorage.setItem("resume", response.employee.resume)
      setEmployeeInfo(response.employee);
      setResume(response.employee.resume);
      setResumeName(response.employee.resumeName);
    }
    getEmployeeInfo();
  }, []);


   function  handleResumeChange (event) {
    console.log("click");
    console.log(event.target.files[0])
    let file = event.target.files[0],
      reader = new FileReader();

    reader.onloadend = function () {
      b64 = reader.result.replace(/^data:.+;base64,/, "");
      console.log(b64);
      setResume(b64);
    };
    reader.readAsDataURL(file);
    console.log("logging b64")
    console.log(file)
    setResumeName(file.name);
    console.log("logging resume")
  };

  let resume_name = resumeName ? resumeName : "No file chosen";

  async function updateService(event) {
    console.log(event.currentTarget);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("sending to : " + localStorage.getItem("_id") );
    let response_from_backend = await fetch(
      "http://localhost:8080/api/employee/" +
        localStorage.getItem("_id"),
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          resume: b64,
          resumeName:  resumeName,
          education: {
            school: data.get("school"),
            degree: data.get("degree"),
            start: data.get("dateStartedSchool"),
            end: data.get("dateCompletedSchool"),
          },
          experience: [
            {
              company: data.get("companyName"),
              position: data.get("position"),
              description: data.get("description"),
              start: data.get("dateStartedWork"),
              end: data.get("dateCompletedWork"),
            },
          ],
        }),
      }
    );
    console.log(response_from_backend)
    let response = await response_from_backend.json();
    console.log(response);
    if(response_from_backend.status === 200){
      localStorage.setItem("resume", response.employee.resume)
      console.log(response.employee);
      alert("Profile Updated")
    }else{
      alert("Profile Update Failed")
    }
  }

  return (
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
        <Typography component="h1" variant="h4" sx={{ p: 2 }}>
          Edit Profile
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              fullWidth
              id="firstName"
              label="First Name"
              value={employeeInfo.firstName}
              onChange={(e) => {setEmployeeInfo({...employeeInfo, firstName: e.target.value})}}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              value={employeeInfo.lastName}
              onChange={(e) => {setEmployeeInfo({...employeeInfo, lastName: e.target.value})}}
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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid item xs={"auto"}>
                <Typography component="h1" variant="h4" marginBottom={2}>
                  Work Experience
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="position"
                      required
                      fullWidth
                      id="position"
                      label="Position"
                      value={employeeInfo.experience[0].position}
                      onChange={(e) => {setEmployeeInfo({...employeeInfo, experience: [{...employeeInfo.experience[0], position: e.target.value}]})}}
                    />
                  </Grid>
                  <Grid item xs={12} sm={20}>
                    <TextField
                      name="companyName"
                      required
                      fullWidth
                      id="companyName"
                      label="Company Name"
                      value={employeeInfo.experience[0].company}
                      onChange={(e) => {setEmployeeInfo({...employeeInfo, experience: [{...employeeInfo.experience[0], company: e.target.value}]})}}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="dateStartedWork"
                      required
                      fullWidth
                      id="dateStartedWork"
                      type="date"
                      value={employeeInfo.experience[0].start}
                      onChange={(e) => {setEmployeeInfo({...employeeInfo, experience: [{...employeeInfo.experience[0], start: e.target.value}]})}}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="dateCompletedWork"
                      fullWidth
                      id="dateCompletedWork"
                      type="date"
                      onChange={(e) => {setEmployeeInfo({...employeeInfo, experience: [{...employeeInfo.experience[0], end: e.target.value}]})}}
                      value={employeeInfo.experience[0].end}
                    />
                  </Grid>
                  <Grid item xs={12} sm={20}>
                    <TextField
                      multiline={true}
                      rows={4}
                      name="description"
                      fullWidth
                      id="description"
                      label="Description"
                      type="text"
                      onChange = {(e) => {setEmployeeInfo({...employeeInfo, experience: [{...employeeInfo.experience[0], description: e.target.value}]})}}
                      value={employeeInfo.experience[0].description}
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
            <Divider sx={{ mb: 2 }} />
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
                      value={employeeInfo.education.school}
                      onChange={(e) => {setEmployeeInfo({...employeeInfo, education: {...employeeInfo.education, school: e.target.value}})}}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      required
                      fullWidth
                      name="degree"
                      label="Degree"
                      id="degree"
                      value={employeeInfo.education.degree}
                      onChange={(e) => {setEmployeeInfo({...employeeInfo, education: {...employeeInfo.education, degree: e.target.value}})}}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      name="dateStartedSchool"
                      required
                      fullWidth
                      id="dateStartedSchool"
                      type="date"
                      value={employeeInfo.education.start}
                      onChange={(e) => {setEmployeeInfo({...employeeInfo, education: {...employeeInfo.education, start: e.target.value}})}}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      name="dateCompletedSchool"
                      fullWidth
                      id="dateCompletedSchool"
                      type="date"
                      value={employeeInfo.education.end}
                      onChange={(e) => {setEmployeeInfo({...employeeInfo, education: {...employeeInfo.education, end: e.target.value}})}}
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
  );
}

export default EditProfilePage;