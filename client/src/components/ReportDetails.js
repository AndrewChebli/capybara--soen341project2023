import React from "react";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";

function ReportDetails(props) 
{
  let report = props.report;
  if(report.type === "Job"){
    return (

      <div>
        <Typography variant="h6" gutterBottom component="div">
          Job Title: {report.data.title}
          </Typography>
      </div>
  )
    }else if (report.type === "User"){
    return (
      <div>
        <Typography variant="h6" gutterBottom component="div">
          User Name: {report.data.userName}
          </Typography>
      </div>
    )
  }else if (report.type === "Company"){
    return (
    <div>
      <Typography variant="h6" gutterBottom component="div">
        Company Name: {report.data.companyName}
        </Typography>
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