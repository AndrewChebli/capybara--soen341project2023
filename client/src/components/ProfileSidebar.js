import React from 'react';
import { AppBar, Avatar, Box,  Typography, Button } from '@mui/material';
import Divider from '@mui/material/Divider';

const ProfileSidebar = ({ user }) => {

  function handleEditClick()
  {
    window.location.href = "/EditProfilePage";
  }
  return (
<AppBar style={{ background: '#394727l'}}  position="fixed" sx={{ borderRadius: "20px", marginTop: "30px" , width: 250, zIndex: (theme) => theme.zIndex.drawer +1, left: 0, top: '69px',height:'85%'}}>
  
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: 'calc(100% - 64px)', padding: 2 , backgroundColor: "#394727l" }}>
        <Avatar sx={{ width: 80, height: 80, mb: 2 }} src={user.photo} alt="Profile picture" />
        <Typography variant="h6" component="div">
          {`${user.firstName}`} {`${user.lastName}`} 
        </Typography>
        <Typography variant="body2" component="div" sx={{ marginBottom: 2 }}>
          {user.email}
        </Typography>
        <Typography variant="body2" component="div" sx={{ marginBottom: 2 }}>
        <Divider variant="middle" color = "white" sx={{ m: 2}} />
          
        I'm a Senior Engineer at Google with over 15 years of experience in software development. I've led multiple teams in developing and delivering products that have made a significant impact on the industry. My expertise lies in building scalable and reliable systems, and I'm passionate about mentoring and developing engineers to their full potential.
        <Divider variant="middle" color = "white" sx={{ m: 2}} />
        </Typography>

        <Button fullWidth variant="outlined" sx={{ marginBottom: 2 }} color="inherit">
          Personal Information
        </Button>
        <Button fullWidth variant="outlined" sx={{ marginBottom: 2 }} color="inherit">
          Work Experience
        </Button>
        <Button fullWidth variant="outlined" sx={{ marginBottom: 2 }} color="inherit">
          Education
        </Button>
        <Button fullWidth variant="outlined" sx={{ marginBottom: 2 }} color="inherit">
          Skills
        </Button>
        <Button fullWidth variant="outlined" color="primary" sx={{ color: '#FFFF' }} onClick ={handleEditClick}>
          Edit Profile
        </Button>
      </Box>
    </AppBar>
  );
};

export default ProfileSidebar;