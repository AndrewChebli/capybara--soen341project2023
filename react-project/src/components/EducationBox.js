import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";

function EducationBox(props) {
  return (
    <Box maxWidth={1300}
      alignContent="center"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5" margin = {2} marginTop = {6}>
        Education
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="school"
            required
            fullWidth
            id="school"
            label="School Name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            name="academicProgram"
            label="Academic Program"
            id="academicProgram"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="dateStartedSchool"
            required
            fullWidth
            id="dateStartedSchool"
            type="date"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="dateCompletedSchool"
            fullWidth
            id="dateCompletedSchool"
            type="date"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default EducationBox;
