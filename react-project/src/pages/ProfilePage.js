import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import ProfileSidebar from "../components/ProfileSidebar";



function ProfilePage() {
  const user = {
    name:
      localStorage.getItem("firstName") +
      " " +
      localStorage.getItem("lastName"),
    email: localStorage.getItem("email"),
    profilePicture: "https://via.placeholder.com/150",
  };

  const base64_resume = localStorage.getItem("resume");
  
  console.log(base64_resume)
  var bin = atob(base64_resume);
  console.log('File Size:', Math.round(bin.length / 1024), 'KB');
  
  // Embed the PDF into the HTML page and show it to the user
  var obj = document.createElement('object');
  obj.style.width = '80%';
  obj.style.height = '842pt';
  obj.type = 'application/pdf';
  obj.data = 'data:application/pdf;base64,' + base64_resume;
  document.body.appendChild(obj);

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
        <Avatar
          sx={{ width: 128, height: 128, marginBottom: 2 }}
          src={user.profilePicture}
          alt="Profile picture"
        />
        <Typography
          component="h1"
          variant="h4"
          sx={{ fontWeight: "bold", marginBottom: 2 }}
        >
          {user.name}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {user.email}
        </Typography>
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        <a download= "wontwork.pdf" href={base64_resume} title='Download pdf document' />
        </Typography>
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Personal Info
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          New York, USA
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
          University of Oxford - Computer Science
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Started: 2010-09-01 | Completed: 2014-06-30
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
          Software Engineer at Google
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
    </Box>
  );
}

export default ProfilePage;
