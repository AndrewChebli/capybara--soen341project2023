//import job_postings from "../job_postings.json";
import JobPosting from "../components/JobPosting";
import Box from "@mui/material/Box";
import React from "react";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";


function Dashboard() {
  const [data, setData] = React.useState([]);
  useEffect(() => {
    async function getAllJobs() {
      await fetch("http://localhost:8080/api/job/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json())
      .then((response) => {
        console.log(response)
        setData(response);
      }
      );
    }
    getAllJobs();
  }, []);
    if(localStorage.getItem("loginStatus") === "false"){
      window.location.href = "/SignInPage";
    }

    return (
      <div style={{ width: "100%" }}>
        <Grow in={true} timeout={3000}>
        <Typography variant="h2" component="h1" gutterBottom sx={{p: 5, mt: 10}}>
          Job Postings
        </Typography>
        </Grow>
        <Box
          sx={{
            display: "inline-flex",
            flexWrap: "wrap",
            alignContent: "baseline",
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
