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



const theme = createTheme();

export default function SignInFormCompany() {
    // ================START OF FRONT-END ENDPOINT=====================
      async function loginService(event){
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    
        const response = await fetch("http://localhost:8080/api/company/login", {
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
        if (response.status === 201) {
          const res = await response.json();
          console.log(res)
          console.log(res._id);
          localStorage.setItem("_id", res._id);
          localStorage.setItem("loginStatus", "true");
          localStorage.setItem("loginType", "company");
          localStorage.setItem("companyName", res.companyName);
          alert("Login Successful");
          window.location.href = "http://localhost:3000/CompanyJobApplicantsPage";
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