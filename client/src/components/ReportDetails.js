import React from "react";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

function ReportDetails(props) 
{
  let report = props.report;
  if(report.type === "job"){
    return (

      <div>
        <Typography variant="h6" gutterBottom component="div">
          Job Title: {report.data.title}
          </Typography>
          <Typography variant="h6" gutterBottom component="div">
          Reason: {report.reason}
          </Typography>
          <Button variant="contained" color="primary" href={`/JobPostingPage/${report.data._id}`}>View Job</Button>
      </div>
  )
    }else if (report.type === "user"){
    return (
      <div>
        <Typography variant="h6" gutterBottom component="div">
          User Name: {report.data.userName}
          </Typography>
          <Typography variant="h6" gutterBottom component="div">
          Reason: {report.reason}
          </Typography>
          <Button variant="contained" color="primary" href={`/ProfilePage/${report.data._id}`}>View Profile</Button>
      </div>
    )
  }else if (report.type === "company"){
    return (
    <div>
      <Typography variant="h6" gutterBottom component="div">
        Company Name: {report.data.companyName}
        </Typography>
        <Typography variant="h6" gutterBottom component="div">
        Reason: {report.reason}
        </Typography>
        <Button variant="contained" color="primary" href={`/CompanyPage/${report.data._id}`}>View Company</Button>
    </div>
    )
  }else {
    return (
      <div>
        <Typography variant="h6" gutterBottom component="div">
          unknown 
          </Typography>
      </div>
    )
  }
}

export default ReportDetails;