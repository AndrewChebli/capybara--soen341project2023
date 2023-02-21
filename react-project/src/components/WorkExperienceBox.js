import React from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";

function WorkExperienceBox(registerService) {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid item xs={"auto"}>
        <Typography component="h1" variant="h5" marginBottom={2}>
          Work Experience
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="jobTitle"
              required
              fullWidth
              id="jobTitle"
              label="Job Title"
            />
          </Grid>
          <Grid item xs={12} sm={20}>
            <TextField
              name="companyName"
              required
              fullWidth
              id="companyName"
              label="Company Name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="dateStartedWork"
              required
              fullWidth
              id="dateStartedWork"
              type="date"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="dateCompletedWork"
              fullWidth
              id="dateCompletedWork"
              type="date"
            />
          </Grid>
          <Grid item xs={12} sm={20}>
            <TextField
              name="Description"
              fullWidth
              id="Description"
              label="Description"
              type="text"
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default WorkExperienceBox;
