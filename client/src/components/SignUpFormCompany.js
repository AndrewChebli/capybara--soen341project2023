import * as React from "react";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";


function SignUpFormCompany() {

  async function registerCompany(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("companyName"));
    console.log(data.get("email"));
    console.log(data.get("password"));
    console.log(data.get("Description"));
    console.log(data.get("website"));
    console.log(data.get("address"));
    console.log(data.get("phone"));
    //console.log(data.get("logo"));
    console.log(data.get("logoName"));
    //===============FRONTEND ENDPOINT=================
    const response_from_backend = await fetch("http://localhost:8080/api/company/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyName: data.get("companyName"),
        email: data.get("email"),
        password: data.get("password"),
        description: data.get("Description"),
        website: data.get("website"),
        address: data.get("address"),
        //logo: data.get("logo"),
        logoName: data.get("logoName"),       
        phone: data.get("phone"),
        jobs: [],
      }),
    });

    console.log(response_from_backend);
    if(response_from_backend.status === 201){
      alert("Company Registered Successfully");
    }else{
      alert("Company Registration Failed");
    }
  }

  return (
    <Container component="main" maxWidth="lg">
      <Box
        component="form"
        noValidate
        onSubmit={registerCompany}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Grid container spacing={3} sm={12} mt={5} alignContent="center">
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: "center" }}>
                <Avatar
                  sx={{
                    mt: 0.85,
                    ml: 4,
                    mb: 3,
                    mr: 1,
                    bgcolor: "secondary.main",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <LockOutlinedIcon />
                </Avatar>

                <Typography component="h3" variant="h3" sx={{ mb: 2, mr: 2 }}>
                  Join the Hive!
                </Typography>
                {/* </Grid> */}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: "center" }}>
                <Grid
                  item
                  xs={1}
                >
                  <Avatar
                    sx={{ width: 128, height: 128, marginBottom: 5 }}
                    alt="Profile picture"
                  />
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="companyName"
                label="Company Name"
                name="companyName"
                autoComplete="Company Name"
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="Email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="Password"
              />
            </Grid>
            
          <Grid item xs={12}>
            <TextField
              multiline={true}
              rows={4}
              name="Description"
              fullWidth
              id="Description"
              label="Description"
              type="text"
              required
            />
          </Grid>
          <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="website"
                label="Website"
                name="website"
                autoComplete="Website"
                
              />
            </Grid>
          
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
              />
            </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              autoComplete="tel"
            />
          </Grid>
          {/* <Grid item xs={12}>
            <TextField
            required
            fullWidth
            id="logo"
            label="Logo"
            name="logo"
            type="file"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid> */}
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="logoName"
            label="Logo Name"
            name="logoName"
          />
        </Grid>
            
            <Grid item xs={12}>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 5, ml: 2 }}
          >
            <Button type="submit" variant="contained">
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* <Copyright marginTop={4} /> */}
    </Container>
  );
}


export default SignUpFormCompany;