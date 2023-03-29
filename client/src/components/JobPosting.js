// src/components/JobPosting.js
import React from "react";
import Typography from "@mui/material/Typography";

function JobPosting({ job }) {
  return (
    <div>
      <Typography variant="h6">Title: {job.title}</Typography>
      <Typography>Company: {job.company}</Typography>
      <Typography>Location: {job.location}</Typography>
      <Typography>Salary: {job.salary}</Typography>
      <Typography>Description: {job.description}</Typography>
      <Typography>Date: {job.date}</Typography>
    </div>
  );
}

export default JobPosting;
