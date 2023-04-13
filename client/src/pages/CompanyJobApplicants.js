import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import ApplicantBox from "../components/ApplicantBox";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CompanyJobApplicants = () => {
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState("");
  let company_id = sessionStorage.getItem("_id");

  const handleOpen = (job) => {
    setOpen(true);
    setJobToDelete(job);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/job/remove/${jobToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      
      if (response.status === 200) {
        alert('Job posting deleted successfully')
      } else {
        throw new Error('Error deleting job');
      }
  
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('Error deleting job');
    }
  };
  
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
    <Box sx={{ mt: 20}}>
      <Typography variant="h3" sx={{ mb: 5 }}>
        Applicants
      </Typography>
      {jobs.map((job) => (
        <Paper  key = {job} elevation={3} sx={{ mb: 5, ml: "10%", width: "80%", borderRadius : 4}}>
          <Box
            sx={{
              p: 2,
              bgcolor: "background.default",
              elevation: 12,
              mt: "10",
            }}
          >
            <Box
              key={job._id}
              sx={{
                mt: 3,
                mb: 3,
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <Typography variant="h4" align="center" sx={{ textAlign: "center" }}>
                {job.title }{" "}{ job.deadline}
              </Typography>
              <Typography variant="h4" align="center" sx={{  textAlign: "center" }}>
                {job.location}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>

              <Button
                variant="contained"
                color="warning"
                onClick={() => window.location.href = `/EditJobPostingPage/${job._id}`}
                sx = {{mr : 2}}
              >
                <EditIcon/>
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleOpen(job._id)}
              >
                <DeleteIcon/>
              </Button>
              </Box>

            </Box>
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
        </Paper>
      ))}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this job?
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
          <Button variant="contained" onClick={() => handleClose()}>
            Cancel
          </Button>
        </Box>
        
      </Modal>
    </Box>
  ) : null;
};

  const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  export default CompanyJobApplicants;