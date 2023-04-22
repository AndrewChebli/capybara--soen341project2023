import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useEffect } from "react";
function EditProfilePage() {
  const theme = createTheme();
  const [companyInfo, setCompanyInfo] = React.useState({});


  const handlePersonalInfoSubmit = async (event) => {
    const data = new FormData(event.currentTarget);
    console.log({
      companyName: data.get("companyName"),
      email: data.get("email"),
      password: data.get("password"),
      address: data.get("address"),
      phone: data.get("phone"),
    });
    event.preventDefault();
    let response;
    response = await fetch(
      "http://localhost:8080/api/company/" +
        sessionStorage.getItem("_id"),
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify(companyInfo),
      }
    );
    if (response.status === 200) {
      window.alert("Profile updated successfully");
    } else {
      window.alert("Error updating profile");
    }
  };
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (event) => {
    setPhoto(URL.createObjectURL(event.target.files[0]));
  };

  useEffect(() => {
    const getCompanyInfo = async () => {
      const response = await fetch(
        "http://localhost:8080/api/company/getone/" +
          sessionStorage.getItem("_id"),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(response);
      console.log(data);
      if (response.status === 200) {
        setCompanyInfo(data);
      } else {
        window.alert("Error loading company data");
      }
    };
    getCompanyInfo();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Profile
          </Typography>
          <form onSubmit={handlePersonalInfoSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <label htmlFor="photoInput">
                  <input
                    id="photoInput"
                    name="photo"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handlePhotoChange}
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="companyName"
                  required
                  fullWidth
                  id="companyName"
                  label="Company Name"
                  value={companyInfo.companyName}
                  onChange={(e) => {
                    setCompanyInfo({
                      ...companyInfo,
                      companyName: e.target.value,
                    });
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={companyInfo.email}
                  onChange={(e) => {
                    setCompanyInfo({ ...companyInfo, email: e.target.value });
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="address"
                  id="address"
                  value={companyInfo.address}
                  onChange={(e) => {
                    setCompanyInfo({ ...companyInfo, address: e.target.value });
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone"
                  id="phone"
                  value={companyInfo.phone}
                  onChange={(e) => {
                    setCompanyInfo({ ...companyInfo, phone: e.target.value });
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  name="website"
                  label="phone"
                  id="phone"
                  value={companyInfo.website}
                  onChange={(e) => {
                    setCompanyInfo({ ...companyInfo, website: e.target.value });
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  multiline={true}
                  rows={4}
                  name="description"
                  label="description"
                  id="description"
                  value={companyInfo.description}
                  onChange={(e) => {
                    setCompanyInfo({
                      ...companyInfo,
                      description: e.target.value,
                    });
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save Comapny Info
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default EditProfilePage;
