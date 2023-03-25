import JobPostingDetail from "../components/JobPostingDetail";
import Box from "@mui/material/Box";
import React from "react";
import Typography from "@mui/material/Typography";

function JobPostingPage() {

  return (
    <div style={{ width: "100%" }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ p: 5, mt: 10 }}
        >
          Job Posting
        </Typography>
      <Box
        sx={{
          display: "inline-flex",
          flexWrap: "wrap",
          alignContent: "baseline",
          bgcolor: "background.paper",
          maxWidth: 1200,
          height: 300,
          borderRadius: 5,
          boxShadow: 15,
          justifyContent: "center",
        }}
      >
          <JobPostingDetail  />
      </Box>
    </div>
  );
}

export default JobPostingPage;
