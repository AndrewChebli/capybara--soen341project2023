import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import { Divider, ListItem, Paper } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

const ApplicantBox = (applicant_id, job_id) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  console.log(applicant_id.applicant_id);

  const [applicant, setApplicant] = React.useState(null);
  const [selected, setSelected] = React.useState(false);

  React.useEffect(() => {
    const fetchApplicant = async () => {
      await applicant_id;
      let _id = applicant_id.applicant_id;
      console.log(_id);
      const response = await fetch(
        "http://localhost:8080/api/employee/getone/" + _id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      setApplicant(responseData.employee);
    };
    fetchApplicant();
  }, [applicant_id, job_id]);

  async function selectApplicant() {
    const response = await fetch(
      "http://localhost:8080/api/company/selectApplicant/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          job_id: applicant_id.job_id,
          applicant_id: applicant_id.applicant_id,
        }),
      }
    );
    const responseData = await response.json();
    console.log(responseData);
    if (response === 500) {
      console.log("error");
    } else if (response === 200) {
      setSelected(true);
      window.alert("Applicant selected");
    } else if (response.status === 422) {
      window.alert("Applicant already selected");
    }
    console.log(responseData);
  }

  if (!applicant) {
    return <div />;
  } else {
    return (
      <Box sx={{ width: "70%", ml: "15%" }}>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          sx={{
            mb: 1,
            backgroundColor: "#f5f5f5",
            borderRadius: 4,
            border: 1,
            borderColor: "divider",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              {applicant.firstName} {applicant.lastName}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {applicant.email}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2} direction="row">
              <Grid item xs={6}>
                <Paper sx={{ p: 2, m: 2 }}>
                  <Typography sx={{ color: "text.secondary" }}>
                    <Typography variant="h6" sx={{ color: "text.secondary" }}>
                      Bio
                    </Typography>
                    {applicant.bio}
                  </Typography>
                </Paper>
                <Paper sx={{ p: 2, m: 2 }}>
                  <Typography sx={{ color: "text.secondary" }}>
                    <SchoolIcon sx={{ mx: 2 }} />
                    {applicant.education.degree}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {applicant.education.school}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={6}>
                <Paper sx={{ p: 2, m: 2 }}>
                  <Typography variant="h6" sx={{ color: "text.secondary" }}>
                    Skills
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {applicant.skills.map((skill) => (
                      <ListItem key={skill}>{skill}</ListItem>
                    ))}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" sx={{ color: "text.secondary" }}>
                  Experience
                </Typography>
              </Grid>
              {applicant.experience.map((exp) => (
                <Grid item xs={6} key={exp.position}>
                  <Paper sx={{ p: 2, m: 2 }}>
                    <Typography variant="h5" sx={{ color: "text.secondary" }}>
                      {exp.position}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="h6" sx={{ color: "text.secondary" }}>
                      {exp.company}
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {exp.description}
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {exp.start_date}
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {exp.end_date}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <Grid item container direction="row" xs={12} sx={{ my: 2 }}>
              <Grid item xs={4}>
                <Button fullWidth  disabled={selected}
                color = "secondary"
                  onClick={() => {  
                    window.location.href = `/ProfilePage/${applicant_id.applicant_id}`;
                  }}
                >
                  Full Profile
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button fullWidth onClick={selectApplicant} disabled={selected}>
                  Select
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  color="error"
                  onClick={selectApplicant}
                  disabled={selected}
                >
                  Reject
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>
    );
  }
};

export default ApplicantBox;
