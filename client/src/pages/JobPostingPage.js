import JobPostingDetail from "../components/JobPostingDetail";
import Box from "@mui/material/Box";
import React from "react";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";
import { useParams } from "react-router-dom";
import { useState } from "react";

function JobPostingPage() {
  const params = useParams();
  console.log("PARAMS" + JSON.stringify(params));
   const id = params.id;
   let jobposting = "";
 
  const [data, setData] = React.useState([]);
  useEffect(() => {
    console.log("USEEFFECT");
    async function getOneJob() {
      let response;
      response = await fetch("http://localhost:8080/api/job/getone/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      console.log("RESPONSE" + JSON.stringify(response));
      setData(response);
    }
    getOneJob();
  }, [id]);

  console.log("BRUHHHHH" + id);
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
      <Box
        sx={{
          display: "inline-flex",
          flexWrap: "wrap",
          alignContent: "baseline",
          bgcolor: "background.paper",
          maxWidth: 1200,
          height: 300,
          borderRadius: 1,
          justifyContent: "center",
        }}
      >
          <JobPostingDetail data={data} />
      </Box>
    </div>
  );
}

export default JobPostingPage;
