import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


function CreateJobPostingPage() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const theme = createTheme();

  const handlePersonalInfoSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      title: data.get('title'),
      company: data.get('company'),
      day: data.get('day'),
      month: data.get('month'),
      year: data.get('year'),
      description: data.get('description'),
      salary: data.get('salary'),
      benefits: data.get('benefits')
    });
  };
  

  return (
    <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         
          <Typography component="h1" variant="h5" sx={{pb: 10}}>
            Create Job Posting:
          </Typography>
          <form onSubmit={handlePersonalInfoSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              
              <Grid item xs={12} sm={12}>
                <TextField
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Job Title / Job Position"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="company"
                  label="Company Name"
                  name="company"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="day"
                  label="Deadline Day"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  name="day"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="month"
                  type="number"
                  label="Deadline Month"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  name="month"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="year"
                  type="number"
                  label="Deadline Year"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  name="year"
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  name="description"
                  required
                  fullWidth
                  multiline
                  id="description"
                  label="Job Description"
                  autoFocus
                  rows={5}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  name="requirements"
                  required
                  fullWidth
                  multiline
                  id="requirements"
                  label="Job Requirements"
                  autoFocus
                  rows={2}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  name="salary"
                  required
                  fullWidth
                  
                  id="salary"
                  label="Salary"
                  autoFocus
                  rows={2}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  name="benefits"
                  required
                  fullWidth
                  multiline
                  id="benefits"
                  label="Benefits"
                  autoFocus
                  rows={3}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Job Posting
            </Button>
          </form>
    </Box>
  );
}

export default CreateJobPostingPage;