import React, { userState } from "react";
import { useState } from "react";

import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";

export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, set_firstname] = useState("");
  const [lastname, set_lastname] = useState("");
  const [account_type, set_account_type] = useState("Employee");
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      firstname: data.get("firstname"),
      lastname: data.get("lastname"),
      email: data.get("email"),
      password: data.get("password"),
      account_type: data.get("account_type"),
    });
  };

  const handleEmployeeChange = (e) => {
    set_account_type("Employee");
  };
  const handleEmployerChange = (e) => {
    set_account_type("Employer");
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4">
            Join the Hive!
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  name="firstname"
                  autoFocus
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  // control={control}
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  // control={control}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  // control={control}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>

            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <FormControl>
                <FormLabel id="account_type_radio">Account Type</FormLabel>
                <RadioGroup
                  row={true}
                  aria-labelledby="account_type_radio"
                  name="account_type_radio"
                >
                  <FormControlLabel
                    value="employee"
                    control={<Radio />}
                    label="Employee"
                    checked={account_type === "Employee"}
                    onChange={handleEmployeeChange}
                  />
                  <FormControlLabel
                    value="employer"
                    control={<Radio />}
                    label="Employer"
                    checked={account_type === "Employer"}
                    onChange={handleEmployerChange}
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            {/* Button for signing up */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>

            <Grid container justifyContent="center">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
