import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
    if (response === 500) {
      console.log("error");
    }
    if (response === 200) {
      setSelected(true);
      console.log("success");
    }
    console.log(responseData);
  }

  //
  // {applicant.email}
  if (!applicant) {
    return <div />;
  } else {
    return (
      <Box sx={{ width: "70%", ml: "15%" }}>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
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
            <Typography>
              {applicant.education.school}
              {applicant.education.degree}
              {applicant.education.start}
              {applicant.education.end}
            </Typography>
            <Typography>
              {applicant.experience.company}
              {applicant.experience.position}
              {applicant.experience.description}
              {applicant.experience.start}
              {applicant.experience.end}
              <Button
                sx={{ ml: 10 }}
                variant="contained"
                onClick={selectApplicant}
                disabled={selected}
              >
                Select
              </Button>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    );
  }
};

export default ApplicantBox;
