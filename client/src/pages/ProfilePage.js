import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ProfileSidebar from "../components/ProfileSidebar";
import ResumeViewer from "../components/ResumeViewer";
import { useState, useEffect } from "react";



function  ProfilePage() {

  const [resume, setResume] = useState(null);
  const [employeeInfo, setEmployeeInfo] = useState({});
  
  useEffect(() => {
    async function getEmployeeInfo() {
      await fetch("http://localhost:8080/api/employee/getone/" + localStorage.getItem("_id"), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json())
      .then((response) => {
        setEmployeeInfo(response.employee);
        setResume(response.employee.resume);
        console.log(response.employee.firstName)
        localStorage.setItem("resume", response.employee.resume);
      }
      );
    }
    getEmployeeInfo();
  },[]);

  let resume_name = resume ? resume.name : "No file chosen";
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 8,
        marginBottom: 8,
      }}
    >
      <ProfileSidebar user={employeeInfo} />
      <Box sx={{ marginTop: 2 }}>
        <Typography
          component="h1"
          variant="h4"
          sx={{ fontWeight: "bold", marginBottom: 2 }}
        >
          Your Profile
          <Divider
          sx={{ background: "#746e62", height: "3px", marginBottom: 2 }}
        />
        </Typography>
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Personal Info
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
        {employeeInfo.firstName} {employeeInfo.lastName}
        </Typography>
        <Divider
          sx={{ background: "#746e62", height: "3px", marginBottom: 2 }}
        />
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Education
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {/* {employeeInfo.education.school}  {employeeInfo.degree} */}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {/* {employeeInfo.education.start}{' '}  {employeeInfo.education.end} */}
        </Typography>
        <Divider
          sx={{ background: "#746e62", height: "3px", marginBottom: 2 }}
        />
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Work Experience
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {/* {employeeInfo.experience.company}{' '}{employeeInfo.experience.position} */}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {/* {employeeInfo.experience.start}     {employeeInfo.experience.end} */}
        </Typography>
        <Divider
          sx={{ background: "#746e62", height: "3px", marginBottom: 2 }}
        />
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Skills
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          React, Node.js, JavaScript
        </Typography>
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Resume
        </Typography>
        <ResumeViewer ></ResumeViewer>
        </Box>
    </Box>
  );
}

export default ProfilePage;
