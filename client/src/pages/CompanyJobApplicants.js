import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import ApplicantBox from "../components/ApplicantBox";

const CompanyJobApplicants = () => {
  const [jobs, setJobs] = useState([]);


  let company_id = localStorage.getItem("_id");
  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch(
        "http://localhost:8080/api/company/getCompanyJobs/" + company_id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      setJobs(responseData);
      if (response.status === 500) {
        window.alert("Trouble fetching the jobs");
      } else if (response.status === 200) {
        localStorage.setItem("company_id", responseData._id);
        setJobs(responseData.jobs);
      } else {
        if (responseData.jobs.length === 0) {
          window.alert("You have no jobs");
        }
      }
    };
    fetchJobs();


  }, [company_id]);



  return jobs ? (
    <Box sx={{ mt: 20 }}>
      <Typography variant="h3">Applicants</Typography>
      {jobs.map((job) => (
        <Box key={job._id} sx={{ mt: 5 }}>
          <Typography variant="h4">{job.title}</Typography>
          <Typography variant="h6">
            JOB ID {"----->"} {job._id}
          </Typography>
          {job.applicants.map((applicant) => (
            <Typography key = {applicant} variant="h6">
              Applicant ID {"----->"} {applicant}
              <ApplicantBox
                key={applicant}
                applicant_id={applicant}
                job_id={job._id}
              />
            </Typography>
          ))}
        </Box>
      ))}
    </Box>
  ) : null ;
};

export default CompanyJobApplicants;
