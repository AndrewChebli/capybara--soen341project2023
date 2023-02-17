import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ProfileSidebar from '../components/ProfileSidebar';

function ProfilePageEmployer() {
  const user = {
    name: 'Mid Industries',
    email: 'contact@mid.com',
    profilePicture: 'https://via.placeholder.com/150',
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8, marginBottom: 8 }}>
      <ProfileSidebar user={user} />
      <Box sx={{ marginTop: 2 }}>
        <Avatar sx={{ width: 128, height: 128, marginBottom: 2, alignItems: 'center' }} src={user.profilePicture} alt="Profile picture" />
        <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          {user.name}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {user.email}
        </Typography>
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Address
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          123 Sesame Street, QC, Canada
        </Typography>
        <Divider sx={{ background: '#2196f3', height: '3px', marginBottom: 2 }} />
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Telephone
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          678-999-8212
        </Typography>
        <Divider sx={{ background: '#2196f3', height: '3px', marginBottom: 2 }} />
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Hiring Manager
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Jane Doe
        </Typography>
        <Divider sx={{ background: '#2196f3', height: '3px', marginBottom: 2 }} />
      </Box>
    </Box>
  );
}

export default ProfilePageEmployer;
