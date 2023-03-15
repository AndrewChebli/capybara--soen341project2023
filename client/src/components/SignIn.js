import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
    // ================START OF FRONT-END ENDPOINT=====================
      async function loginService(event){
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    
        const response = await fetch("http://localhost:8080/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: data.get('email'),
              password: data.get('password'),
            })
        });

        console.log(response);
        const resp = await response.json();

        if (resp.status === "success") {
          console.log(resp.status);
          console.log(JSON.stringify(resp.data.firstname));
          localStorage.setItem("firstName", resp.data.firstname);
          localStorage.setItem("lastName", resp.data.lastname);
          localStorage.setItem("email", resp.data.email);
          localStorage.setItem("education", JSON.stringify(resp.data.education));
          console.log(localStorage.getItem("education"));

          localStorage.setItem("experience", JSON.stringify(resp.data.previousExperience));
          localStorage.setItem("response", JSON.stringify(resp.data));
          localStorage.setItem("loginStatus", "true");
          localStorage.setItem("loginType", "user");
          localStorage.setItem("resume", resp.data.resume);
          console.log(resp.data.resumeName)
          localStorage.setItem("resumeName", resp.data.resumeName);

          alert("Login Successful");
          window.location.href = "http://localhost:3000/DashboardPage";
        }else{
          alert("Invalid Credentials");
        }
      }


    // ================END OF FRONT-END ENDPOINT=====================

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: "center" }}> 
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h3" variant="h3" sx={{ mb: 2, mr: 2 , ml : 2}}>
            Sign in
          </Typography>
          </Box>
          <Box component="form" onSubmit={loginService} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container sx={{justifyContent:'center'}}>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="../SignUpPage" variant="body2" sx={{justifyContent:'center'}}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}