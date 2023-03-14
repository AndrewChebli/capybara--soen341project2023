import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

function CreateJobPostingPage() {
  styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const  handlePersonalInfoSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      title: data.get("title"),
      company: data.get("company"),
      day: data.get("day"),
      month: data.get("month"),
      year: data.get("year"),
      description: data.get("description"),
      salary: data.get("salary"),
      benefits: data.get("benefits"),
      requirements: data.get("requirements"),
      location: data.get("location"),
    });

    //===============FRONTEND ENDPOINT=================
    const response_from_backend = await fetch("http://localhost:8080/api/job/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.get("title"),
        description: data.get("description"),
        location: data.get("location"),
        salary: data.get("salary"),
        company: localStorage.getItem("companyName"),
        Dday: data.get("day"),
        Dmonth: data.get("month"),
        Dyear: data.get("year"),
        benefits: data.get("benefits"),
        requirements: data.get("requirements"),
        company_id: localStorage.getItem("_id"),
      }),
    });

    console.log(response_from_backend);
    if(response_from_backend.status === 201){
      alert("Job Posting Created Successfully");
    }else{
      alert("Job Posting Creation Failed");
    }
  };

  return (
    <Box
      sx={{
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "70%",
        margin: "auto",
      }}
    >
      <Typography component="h1" variant="h2" sx={{ mt: 20, pb: 10 }}>
        Create Job Posting:
      </Typography>
      <form onSubmit={handlePersonalInfoSubmit} noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              name="title"
              required
              fullWidth
              id="title"
              label="Job Title / Job Position"
              autoFocus
            />
          </Grid>
          <Grid item xs={6}>
            <Typography component="h1" variant="h6">
              Deadline:
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="day"
              label="Deadline Day"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              name="day"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="month"
              type="number"
              label="Deadline Month"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              name="month"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="year"
              type="number"
              label="Deadline Year"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              name="year"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              required
              fullWidth
              multiline
              id="description"
              label="Job Description"
              autoFocus
              rows={5}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="requirements"
              required
              fullWidth
              multiline
              id="requirements"
              label="Job Requirements"
              autoFocus
              rows={2}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="salary"
              required
              fullWidth
              id="salary"
              label="Salary"
              autoFocus
              rows={2}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="benefits"
              required
              fullWidth
              multiline
              id="benefits"
              label="Benefits"
              autoFocus
              rows={3}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Grid item xs={12} sm={12}>
            <TextField
              name="location"
              required
              fullWidth
              id="location"
              label="location"
              autoFocus
            />
          </Grid>

        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create Job Posting
        </Button>
      </form>
    </Box>
  );
}

export default CreateJobPostingPage;
