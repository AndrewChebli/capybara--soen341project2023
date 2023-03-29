import React from "react";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import JobPostingDetail from "./JobPostingDetail";
import Button from "@mui/material/Button";
import ProfilePage from "../pages/ProfilePage";
import Paper from "@mui/material/Paper";

function ReportDetails(props) {
  let report = props.report;
  localStorage.setItem("_id", "641e2fb711b3bddb0d051e30")

  if (report.type === "Job") {
    return (
      <Box sx={{ width: "100%", height: "100%", overflow: "auto", ml: "25%" }}>
        <JobPostingDetail id={"6423661ae92454b14245b464"} />
        <Button variant ="contained" color = "warning">Discard</Button>
        <Button variant ="contained" color = "error"  >Delete</Button>
        
      </Box>
    );
  } else if (report.type === "User") {
    return (
      <Box>
        <Paper elevation = {20}>
      <ProfilePage sx= {{mb: 10 }} />
      <Button variant ="contained" color = "warning">Discard</Button>
        <Button variant ="contained" color = "error"  >Delete</Button>
        </Paper>
      </Box>
    );
  } else if (report.type === "Company") {
    return (
      <div>
        <Typography variant="h6" gutterBottom component="div">
          Company Name: {report.data.name}
        </Typography>
        <Button variant ="contained" color = "warning">Discard</Button>
        <Button variant ="contained" color = "error"  >Delete</Button>
      </div>
    );
  } else {
    return (
      <div>
        <Box>
          <ProfilePage/>
          </Box>
      </div>
    );
  }
}

export default ReportDetails;
