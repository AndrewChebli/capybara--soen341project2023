import JobPostingDetail from "../components/JobPostingDetail";
import Box from "@mui/material/Box";
import React from "react";
import Typography from "@mui/material/Typography";

function JobPostingPage() {
  return (
    <Box sx={{ ml: "10%" }}>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{ p: 5, mt: 10 , mr : "10%"}}
      >
        Job Posting
      </Typography>

      <JobPostingDetail />
    </Box>
  );
}

export default JobPostingPage;
