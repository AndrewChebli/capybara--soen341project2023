import JobPostingSummary from "../components/JobPostingSummary";
import Box from "@mui/material/Box";
import React from "react";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";
import { Grid } from "@mui/material";
import { useState } from "react";
import JobPostingDetail from "../components/JobPostingDetail";

function Dashboard() {
  const [data, setData] = React.useState([]);
  const [currentLink, setCurrentLink] = React.useState("");

  useEffect(() => {
    async function getAllJobs() {
      await fetch("http://localhost:8080/api/job/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          setData(response);
        });
    }
    getAllJobs();
  }, []);

  if (localStorage.getItem("loginStatus") === "false") {
    window.location.href = "/SignInPage";
  }

  const onLinkChange = (id) => {
    setCurrentLink(id);
  };

  return (
    <div style={{ width: "100%" }}>
      <Grow in={true} timeout={3000}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ p: 5, mt: 10 }}
        >
          Job Postings
        </Typography>
      </Grow>
      <Grid container spacing = {-20} justifyContent="center" alignItems="center">
        <Grid
          item
          xs={6}
          sx={{
            display: "inline-flex",
            flexWrap: "wrap",
            alignContent: "baseline",
            justifyContent: "center",
            bgcolor: "background.paper",
            maxWidth: 450,
            minWidth: 450,
            height: 300,
          }}
        >
          {data.map((job_posting) => (
            <JobPostingSummary
              handleLinkChange={onLinkChange}
              data={job_posting}
              key={job_posting._id}
            />
          ))}
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "inline-flex",
              flexWrap: "wrap",
              alignContent: "baseline",
              justifyContent: "center",
              bgcolor: "background.paper",
              maxWidth: 450,
              height: 300,
            }}
          >
            <JobPostingDetail id={currentLink} />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
