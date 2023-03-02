import React, { useState } from 'react';
import { AppBar, Avatar, Box, IconButton, Toolbar, Typography, Button } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

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
<AppBar position="fixed" sx={{ width: 250, zIndex: (theme) => theme.zIndex.drawer +1, left: 0, top: '69px',height:'100%', backgroundColor: "746e62" }}>
      <Toolbar sx={{ bgcolor: '#fff' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="746e62">
          <Avatar
            src={file ? URL.createObjectURL(file) : user.photo}
            onClick={handlePictureClick}
          />
          <input
            type="file"
            id="file-input"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </IconButton>
      </Toolbar>
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
        <Button fullWidth variant="outlined" color="primary" sx={{ color: '#000' }} onClick ={handleEditClick}>
          Edit Profile
        </Button>
      </Box>
    </AppBar>
  );
};

export default ProfileSidebar;