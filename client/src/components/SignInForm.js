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
import { Visibility, VisibilityOff } from "@mui/icons-material"; 
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
const bcrypt = require('bcryptjs');


const theme = createTheme();

export default function SignIn() {
    // ================START OF FRONT-END ENDPOINT=====================
      async function loginService(event){
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    
        const response = await fetch("http://localhost:8080/api/universal/login", {
        const hashpass = await bcrypt.hash(data.get('password'),12);

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
        if (response.status === 200) {
          const res = await response.json();
          console.log(res)
          console.log(res._id);

          sessionStorage.setItem("_id", res._id);
          sessionStorage.setItem("loginStatus", "true");
          sessionStorage.setItem("loginType", "employee");
          sessionStorage.setItem("token", res.token);
          alert("Login Successful");
          if(res.type === "employee"){
          window.location.href = "http://localhost:3000/DashboardPage";
          }
          else if(res.type === "company"){
          localStorage.setItem("companyName", res.user.companyName);
          window.location.href = "http://localhost:3000/CompanyJobApplicantsPage";
          }
          else if(res.type === "admin")
          window.location.href = "http://localhost:3000/ReportsPage";

        }else{
          alert("Invalid Credentials");
        }
      }


    // ================END OF FRONT-END ENDPOINT=====================
  const [showPassword, setShowPassword] = React.useState(false);
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = React.useState(false);
  const [emailHelperText, setEmailHelperText] = React.useState("");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  //function to show the password when pressing on the icon
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //boolean to enable and disable the signup button
  const isFormValid = !emailError && values.email && values.password;

  //handle the submit button
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: bcrypt.hashSync(data.get("password")), 
    });  
    if (!emailError && values.email && values.password) {
      loginService(event);
    }
  };
  
  //function that will specify what the email format should look like
  const validateEmail = (email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };

  //takes care of checking if the email inputted was good or not
  const handleEmailBlur = (event) => {
    const email = event.target.value;
    const isValid = validateEmail(email);
    if (!isValid) {
      setEmailError(true);
      setEmailHelperText("Please enter a valid email address");
    } else {
      setEmailError(false);
      setEmailHelperText("");
    }
  };
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={values.email}
              onChange={handleChange("email")}
              onBlur={handleEmailBlur}
              error={emailError}
              helperText={emailHelperText}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
              disabled={!isFormValid}
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