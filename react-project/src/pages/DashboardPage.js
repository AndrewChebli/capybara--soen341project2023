//import job_postings from "../job_postings.json";
import JobPosting from "../components/JobPosting";
import Box from "@mui/material/Box";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";

let job_postings;

function Dashboard() {
  const [data, setData] = React.useState([]);
  useEffect(() => {
    // ================START OF FRONT-END ENDPOINT=====================
    fetch("http://localhost:8080/getAllJobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((resp) => {
        if (resp.status === "success") {
          setData(resp.data);
          job_postings = JSON.stringify(resp.data);
          console.log(job_postings);
          setData(resp.data);
        } else {
          alert("Failed to get jobs");
        }
      });
    // ================END OF FRONT-END ENDPOINT=====================
  }, []);


    return (
      <div style={{ width: "100%" }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{p: 5}}>
          Job Postings
        </Typography>
        <Box
          sx={{
            display: "inline-flex",
            flexWrap: "wrap",
            alignContent: "baseline",
            p: 10,
            m: 10,
            bgcolor: "background.paper",
            maxWidth: 1200,
            height: 300,
            borderRadius: 1,
            justifyContent: 'center' 
          }}
        >
        {data.map((job_posting) => (
            <JobPosting data={job_posting} key={job_posting._id} />
          ))}
      </Box>
      </div>
    );
  }

export default Dashboard;
