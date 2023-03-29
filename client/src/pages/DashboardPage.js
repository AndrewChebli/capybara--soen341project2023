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
  const [currentLink, setCurrentLink] = React.useState();

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
          setCurrentLink(response[0]._id);
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
    <div >
      <Grow in={true} timeout={3000}>
        <Typography
          variant="h2"
          component="h1"
          sx={{ p: 5, mt: 10 }}
        >
          Job Postings
        </Typography>
      </Grow>
      <Grid
        container
        justifyContent="center"
      >
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          xs = {4}
          overflow="auto"
        >
          <Grid item xs={12}>
            {data.map((job_posting) => (
              <JobPostingSummary
                handleLinkChange={onLinkChange}
                data={job_posting}
                key={job_posting._id}
              />
            ))}
          </Grid>
        </Grid>
        <Grid item xs={7}>
          <JobPostingDetail id={currentLink} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
