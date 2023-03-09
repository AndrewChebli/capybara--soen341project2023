import React, { useState } from 'react';
import { AppBar, Avatar, Box,  Typography, Button } from '@mui/material';

const ProfileSidebar = ({ user }) => {
  const [file, setFile] = useState(null);

  const handlePictureClick = () => {
    document.getElementById('file-input').click();
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    // Upload file here
  };
  function handleEditClick()
  {
    window.location.href = "/EditProfilePage";
  }
  return (
<AppBar style={{ background: '#427a87'}}  position="fixed" sx={{ width: 250, zIndex: (theme) => theme.zIndex.drawer +1, left: 0, top: '69px',height:'100%'}}>
  
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: 'calc(100% - 64px)', padding: 2 , backgroundColor: "746e62" }}>
        <Avatar sx={{ width: 80, height: 80, mb: 2 }} src={user.photo} alt="Profile picture" />
        <Typography variant="h6" component="div">
          {`${user.name}`}
        </Typography>
        <Typography variant="body2" component="div" sx={{ marginBottom: 2 }}>
          {user.email}
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