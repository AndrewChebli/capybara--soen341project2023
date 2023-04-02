import React from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";

function WorkExperienceBox(props) {

  const [workExperience, setWorkExperience] = React.useState([
    {
      start: "",
      end: "",
      company: "",
      position: "",
      description: "",
    }
  ]);
  
  const handlePositionChange = (e) => {
    let data = [...workExperience];
    data[0].position = e.target.value;
    setWorkExperience(data);
    props.handleWorkExperience(workExperience);
  }

  const handleNameChange = (e) => {
    let data = [...workExperience];
    data[0].company = e.target.value;
    setWorkExperience(data);
    props.handleWorkExperience(workExperience);
  }

  const handleStartDateChange = (e) => {
    let data = [...workExperience];
    data[0].start = e.target.value;
    setWorkExperience(data);
    props.handleWorkExperience(workExperience);
  }

  const handleEndDateChange = (e) => {
    let data = [...workExperience];
    data[0].end = e.target.value;
    setWorkExperience(data);
    props.handleWorkExperience(workExperience);
  }

  const handleDescriptionChange = (e) => {
    let data = [...workExperience];
    data[0].description = e.target.value;
    setWorkExperience(data);
    props.handleWorkExperience(workExperience);
  }

  return (
    <Box
      sx={{
        marginTop: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid item xs={"auto"}>
        <Typography component="h1" variant="h4" marginBottom={2}>
          Work Experience
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="Position"
              required
              fullWidth
              id="Position"
              label=" Position"
              onChange = {(e) => {handlePositionChange(e)}}
            />
          </Grid>
          <Grid item xs={12} sm={20}>
            <TextField
              name="company"
              required
              fullWidth
              id="copmany"
              label="Company"
              onChange = {(e) => {handleNameChange(e)}}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="dateStartedWork"
              required
              fullWidth
              id="dateStartedWork"
              type="date"
              onChange = {(e) => {handleStartDateChange(e)}}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="dateCompletedWork"
              fullWidth
              id="dateCompletedWork"
              type="date"
              onChange = {(e) => {handleEndDateChange(e)}}
            />
          </Grid>
          <Grid item xs={12} sm={20}>
            <TextField
              multiline={true}
              rows={4}
              name="Description"
              fullWidth
              id="Description"
              label="Description"
              type="text"
              onChange = {(e) => {handleDescriptionChange(e)}}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default WorkExperienceBox;
