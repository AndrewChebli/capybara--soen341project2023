import React from "react";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import ReportDetails from "../components/ReportDetails";

let sample = [
  {
    _id: "60f9b0f1b1b1b1b1b1b1b1b1",
    type: "Job",
    message: "This job posting is a scam",
    reason: "Spam",
    whistleblower_id: "60f9b0f1b1b1b1b1b1b1b1b1",
    whistleblower_name: "Edward Snowden",
    offender_id: "60f9b0f1b1b1b1b1b1b1b1b1",
    offender_name: "Google",
    data: {
      _id: "60f9b0f1b1b1b1b1b1b1b1b1",
      title: "Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      salary: "$100,000",
      description: "This is a job posting for a software engineer at Google",
      date: "2021-07-20T00:00:00.000Z",
      __v: 0,
    },
  },
  {
    _id: "60f9b0f1b1b1b1b1b1b1b1b1",
    type: "User",
    message: "This user is a scam",
    reason: "Spam",
    whistleblower_id: "60f9b0f1b1b1b1b1b1b1b1b1",
    whistleblower_name: "Edward Snowden",
    offender_id: "60f9b0f1b1b1b1b1b1b1b1b1",
    offender_name: "John Doe",
    data: {
      _id: "60f9b0f1b1b1b1b1b1b1b1b1",
      name: "John Doe",
      email: "johndoe@hotmail.com",
      password: "password",
      __v: 0,
    },
  },
  {
    _id: "60f9b0f1b1b1b1b1b1b1b1b1",
    type: "Company",
    message: "This company is a scam",
    reason: "Spam",
    whistleblower_id: "60f9b0f1b1b1b1b1b1b1b1b1",
    whistleblower_name: "Edward Snowden",
    offender_id: "60f9b0f1b1b1b1b1b1b1b1b1",
    offender_name: "Google",
    data: {
      _id: "60f9b0f1b1b1b1b1b1b1b1b1",
      name: "Google",
      email: "google@google.com",
      password: "password",
      __v: 0,
    },
  },
];

function Reports() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div style={{ width: "100%" }}>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{ p: 5, mt: 10 }}
      ></Typography>
      <div>
        {sample.map((report, index) => (
          <Box 
            sx={{ width: "80%", bgcolor: "background.paper", pl: "10%" }}
            key = {report._id}
          >
          <Accordion
            expanded={expanded === index}
            onChange={handleChange(index)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent={"center"}
              >
                <Grid item xs={3}>
                  <Typography sx={{ color: "text.secondary" }}>
                    {"A  "} {report.type} {" was reported for "} {report.reason}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography sx = {{color :"text.primary"}}>
                    {report.whistleblower_name}
                    {" reported "} {report.offender_name}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography >
                    {report.message}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <ReportDetails report = {report}/>
            </AccordionDetails>
          </Accordion>
          </Box>
        ))}
      </div>
    </div>
  );
}

export default Reports;
