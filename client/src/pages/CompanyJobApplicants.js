import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import ApplicantBox from "../components/ApplicantBox";
import Paper from "@mui/material/Paper";




const CompanyJobApplicants = () => {
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState("");
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
      console.log(responseData);
      console.log(responseData.jobs);
      if (response.jobs === 500) {
        window.alert("Trouble fetching the jobs");
      } else if (response.status === 200) {
        setJobs(responseData.jobs);
      } else {
        if (responseData.jobs === []) {
          alert("You have no jobs");
        }
      }
    };
    fetchJobs();
  }, [company_id]);

  return jobs ? (
    <Box sx={{ mt: 20 }}>
      <Typography variant="h3" sx={{mb: 5}}>Applicants</Typography>
      {jobs.map((job) => (
          <Paper elevation={3} sx={{ mb: 5,  ml: "10%", width: "80%" }}>
            <Box
              sx={{
                p: 2,
                bgcolor: "background.default",
                elevation: 12,
                mt: "10" 
              }}
            >
              <Box key={job._id} sx={{ mt: 5 , mb: 5 }}>
                <Typography variant="h4">
                  {job.title} {job.Dday}/{job.Dmonth}/{job.Dyear}
                </Typography>
                {job.applicants.map((applicant) => (
                  <Typography key={applicant.applicant} variant="h6">
                    <ApplicantBox
                      key={applicant.applicant}
                      applicant_id={applicant.applicant}
                      job_id={job._id}
                    />
                  </Typography>
                ))}
              </Box>
            </Box>
          </Paper>
      ))}
    </Box>
  ) : null;
};

export default CompanyJobApplicants;
