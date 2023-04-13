import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Divider from "@mui/material/Divider";

function CreateJobPostingPage() {
  
  styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [requirements, setRequirements] = React.useState([""]);
  const [benefits, setBenefits] = React.useState([""]);

  const handleFormChange = (event, index) => {
    let data = [...requirements];
    data[index] = event.target.value;
    console.log(data);
    setRequirements(data);
  };

  const addRequirement = () => {
    setRequirements([...requirements, ""]);
  };

  const removeRequirement = (index) => {
    let data = [...requirements];
    data.splice(index, 1);
    setRequirements(data);
  };

  const handleBenefitsChange = (event, index) => {
    let data = [...benefits];
    data[index] = event.target.value;
    setBenefits(data);
  };

  const addBenefit = () => {
    setBenefits([...benefits, ""]);
  };

  const removeBenefit = (index) => {
    let data = [...benefits];
    data.splice(index, 1);
    setBenefits(data);
  };

  const handlePersonalInfoSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      title: data.get("title"),
      company: sessionStorage.getItem("companyName"),
      description: data.get("description"),
      salary: data.get("salary"),
      benefits: benefits,
      requirements: requirements,
      location: data.get("location"),
      deadline: data.get("deadline"),
      company_id: sessionStorage.getItem("_id"),
      remote: data.get("remote"),
      type: data.get("type"),
    });

    //===============FRONTEND ENDPOINT=================
    const response_from_backend = await fetch(
      "http://localhost:8080/api/job/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: data.get("title"),
          description: data.get("description"),
          location: data.get("location"),
          salary: data.get("salary"),
          company: sessionStorage.getItem("companyName"),
          benefits: benefits,
          requirements: requirements,
          deadline: data.get("deadline"),
          company_id: sessionStorage.getItem("_id"),
          remote: data.get("remote"),
          type: data.get("type"),
        }),
      }
    );

    console.log(response_from_backend);
    let result = await response_from_backend.json();
    console.log(result);
    if (response_from_backend.status === 201) {
      alert("Job Posting Created Successfully");
    } else {
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
            <Divider variant="middle">
              <Typography component="h1" variant="h6">
                Requirements
              </Typography>
            </Divider>
            {requirements.map((requirement, index) => {
              return (
                <div key={index}>
                  <Grid container direction={"row"} spacing={1} sx={{ my: 1 }}>
                    <Grid item xs={10}>
                      <TextField
                        name="requirement"
                        required
                        fullWidth
                        id={index}
                        label="Job Requirements"
                        placeholder="Enter a requirement"
                        value={requirement}
                        onChange={(event) => handleFormChange(event, index)}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Button onClick={() => removeRequirement(index)}>
                        <RemoveCircleIcon />
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              );
            })}
            <Button onClick={addRequirement} sx={{ ml: "84%" }}>
              <AddCircleIcon />
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Divider variant="middle">
              <Typography component="h1" variant="h6">
                Benefits
              </Typography>
            </Divider>
            {benefits.map((benefit, index) => {
              return (
                <div key={index}>
                  <Grid container direction={"row"} spacing={1} sx={{ my: 1 }}>
                    <Grid item xs={10}>
                      <TextField
                        name="benefits"
                        required
                        fullWidth
                        id="benefits"
                        label="Benefits"
                        placeholder="Enter a benefit"
                        value={benefit}
                        onChange={(event) => handleBenefitsChange(event, index)}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Button onClick={removeBenefit}>
                        <RemoveCircleIcon />
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              );
            })}
            <Button onClick={addBenefit} sx={{ ml: "84%" }}>
              <AddCircleIcon />
            </Button>
          </Grid>
        </Grid>
        <Divider variant="middle">
          <Typography component="h1" variant="h6">
            Details
          </Typography>
        </Divider>
        <Grid container direction={"row"} spacing={2} sx={{ my: 1 }}>
          <Grid item xs={6} sm={6}>
            <TextField
              name="location"
              required
              fullWidth
              id="location"
              label="Location"
              autoFocus
            />
          </Grid>
          <Grid item xs={6}>
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
        </Grid>
        <Grid container direction={"row"} spacing={2} sx={{ my: 1 }}>
          <Grid item xs={6} sm={6}>
            <TextField
              name="type"
              required
              fullWidth
              id="type"
              label="Full time / Part time"
              autoFocus
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="remote"
              required
              fullWidth
              id="remote"
              label="Remote / In office / Hybrid"
              autoFocus
              rows={2}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography component="h1" variant="h6">
              Deadline
            </Typography>
            <TextField
              name="deadline"
              required
              fullWidth
              id="deadline"
              autoFocus
              type="date"
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
