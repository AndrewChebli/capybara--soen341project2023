import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ProfileSidebar from "../components/ProfileSidebar";
import ResumeViewer from "../components/ResumeViewer";


function ProfilePage() {

  const user = {
    name:
      localStorage.getItem("firstName") +
      "      " +
      localStorage.getItem("lastName"),
    email: localStorage.getItem("email"),
  };

  let parsed_ed = JSON.parse(localStorage.getItem("education"));
  const education = {
    school: parsed_ed.School,
    degree: parsed_ed.Degree,
    start: "Start   " + parsed_ed.Start,
    end: "End    " + parsed_ed.End,
  };
  console.log(education);
  let parsed_work = JSON.parse(localStorage.getItem("experience"));
  const experience = {
    company: parsed_work[0].Company,
    position: parsed_work[0].Position,
    description: parsed_work[0].Description,
    start: "Start" +parsed_work[0].Start,
    end: "End  " + parsed_work[0].End,
  };
  console.log(experience);
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
      <ProfileSidebar user={user} />
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
        {user.name}
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
          {education.school}  {education.degree}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {education.start}{' '}  {education.end}
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
          {experience.company}{' '}{experience.position}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {experience.start}     {experience.end}
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
        <ResumeViewer></ResumeViewer>
        </Box>
    </Box>
  );
}

export default ProfilePage;
