import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
const theme = createTheme();

function EducationBox(props) {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="stretch">
        <Typography component="h1" variant="h4" margin={2} marginTop={6}>
          Education
        </Typography>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Grid item xs={"auto"}>
            <Grid container spacing={2}>
              <Grid item xs={"auto"} sm={6}>
                <TextField
                  name="school"
                  required
                  fullWidth
                  id="school"
                  label="School Name"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="academicProgram"
                  label="Academic Program"
                  id="academicProgram"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  name="dateStartedSchool"
                  required
                  fullWidth
                  id="dateStartedSchool"
                  type="date"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  name="dateCompletedSchool"
                  fullWidth
                  id="dateCompletedSchool"
                  type="date"
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default EducationBox;
