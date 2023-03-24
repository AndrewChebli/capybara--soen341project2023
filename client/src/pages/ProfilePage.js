import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ProfileSidebar from "../components/ProfileSidebar";
import ResumeViewer from "../components/ResumeViewer";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";

function ProfilePage() {
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
    experience: [
      {
        company: "",
        position: "",
        description: "",
        start: "",
        end: "",
      },
    ],
    offers: [],
  });

  useEffect(() => {
    async function getEmployeeInfo() {
      let response_from_backend = await fetch(
        "http://localhost:8080/api/employee/getone/" +
          localStorage.getItem("_id"),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let response = await response_from_backend.json();
      console.log(response);
      setEmployeeInfo(response.employee);
    }
    getEmployeeInfo();
  }, [setEmployeeInfo]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 15,
        marginBottom: 8,
      }}
    >
      <ProfileSidebar user={employeeInfo} />

      <Grid container sx={{ ml: 20 }} maxWidth="70%" spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ fontSize: 30 , mr: 50, mb: 4}} >
            <Typography variant="h1" color="primary" fontFamily={"Roboto"}>
              Your Profile
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={6}>
          <Typography variant="h6">Personal Info</Typography>
          <Divider variant="middle" sx={{ mb: 2 }} />
          <Typography id = "profileName" variant="body1" sx={{ marginBottom: 2 }}>
            {employeeInfo.firstName} {employeeInfo.lastName}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            {employeeInfo.email}
          </Typography>
        </Grid>
        <Grid item xs={6} md={6}>
          <Grid item xs={3} md={6}>
            <Typography variant="h6">Education</Typography>
            <Divider variant="middle" sx={{ mb: 2 }} />
          </Grid>
          <Grid item xs={3} md={6}>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              {employeeInfo.education.school} {employeeInfo.education.degree}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              {employeeInfo.education.start} {employeeInfo.education.end}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={6} md={6}>
          <Typography variant="h6">Work Experience</Typography>
          <Divider variant="middle" sx={{ mb: 2 }} />
          <Typography variant="body1" sx={{ mb: 2, mt: 2 }}>
            {employeeInfo.experience[0].company}{" "}
            {employeeInfo.experience[0].position}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            {employeeInfo.experience[0].start} {employeeInfo.experience[0].end}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            {employeeInfo.experience[0].description}
          </Typography>
        </Grid>
        <Grid item xs={3} md={6}>
          <Grid item xs={3} md={6}>
            <Typography variant="h6">Skills</Typography>
          </Grid>
          <Grid item xs={3} md={6}>
            <Divider variant="middle" sx={{ mb: 2 }} />
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              React, Node.js, JavaScript
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ fontWeight: "bold", mt: 10 }}>
        Resume
        <Divider variant="middle" sx={{ mb: 2 }} />
      </Typography>

      <ResumeViewer></ResumeViewer>
    </Box>
  );
}

export default ProfilePage;
