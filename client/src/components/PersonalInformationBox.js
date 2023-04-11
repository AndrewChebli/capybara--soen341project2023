import React from "react";
import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function PersonalInformationBox(props) {
  const [personalInfo, setPersonalInfo] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [bio, setBio] = React.useState("");
  
  //creating state to check if an email is valid or not
  const [isValidEmail, setIsValidEmail] = React.useState(false);

  const handleFirstNameChange = (e) => {
    let data = { ...personalInfo };
    data.firstName = e.target.value;
    setPersonalInfo(data);
    props.handlePersonalInfo(personalInfo);
  };

  const handleLastNameChange = (e) => {
    let data = { ...personalInfo };
    data.lastName = e.target.value;
    setPersonalInfo(data);
    props.handlePersonalInfo(personalInfo);
  };

  const handleEmailChange = (e) => {
    let data = { ...personalInfo };
    data.email = e.target.value;
    setPersonalInfo(data);
    props.handlePersonalInfo(personalInfo);

    // email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(e.target.value));
    props.handleEmailValidation(isValidEmail);
  };

  const handlePasswordChange = (e) => {
    let data = { ...personalInfo };
    data.password = e.target.value;
    setPersonalInfo(data);
    props.handlePersonalInfo(personalInfo);
  };

  const handlePhoneNumberChange = (e) => {
    let data = { ...personalInfo };
    data.phoneNumber = e.target.value;
    setPersonalInfo(data);
    props.handlePersonalInfo(personalInfo);
  };

  const handlePasswordConfirmChange = (e) => {
    let data = { ...personalInfo };
    data.passwordConfirm = e.target.value;
    setPersonalInfo(data);
    props.handlePersonalInfo(personalInfo);
  };

  const handleBioChange = async (e) => {
    setBio(e.target.value);
    props.handleBio(bio);
  };

  useEffect(() => {
    props.handlePersonalInfo(personalInfo);
  }, [personalInfo, props]);

  useEffect(() => {
    props.handleBio(bio);
    console.log(bio)
  }, [bio, props]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="stretch">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              component="h1"
              variant="h4"
              marginBottom={3}
              marginLeft={4}
            >
              Personal Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={"auto"} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => {
                    handleFirstNameChange(e);
                  }}
                />
              </Grid>
              <Grid item xs={"auto"} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={(e) => {
                    handleLastNameChange(e);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => {
                    handleEmailChange(e);
                  }}
                  error={!isValidEmail}
                />
              </Grid>
                            <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phone"
                  type="tel"
                  onChange={(e) => {
                    handlePhoneNumberChange(e);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => {
                    handlePasswordChange(e);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  onChange={(e) => {
                    handlePasswordConfirmChange(e);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                aria-required
                  fullWidth
                  name="bio"
                  label="Short Bio"
                  id="bio"
                  multiline={true}
                  rows={4}
                  onChange={(e) => {
                    handleBioChange(e);
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default PersonalInformationBox;
