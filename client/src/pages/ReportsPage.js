import React from "react";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionActions, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import ReportDetails from "../components/ReportDetails";
import { Button } from "@mui/material";
import { useEffect } from "react";

const deleteReport = (index) => {
  if(window.confirm("Are you sure you want to delete this report?")){
    deleteOffender(index);
  }
};

const deleteOffender = (index) => {
};
function Reports() {
  
  const [expanded, setExpanded] = React.useState(false);
  const [reports, setReports] = React.useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    let getAllReports;
    getAllReports = async () => {
      try {
        const response = await fetch
        ("http://localhost:8080/api/report/getAll"
        , {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        setReports(data.reports);
      } catch (error) {
        console.log(error);
      }
    }
    getAllReports();
  }, []);


  return (
    <div style={{ width: "100%" }}>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{ p: 5, mt: 10 }}
      ></Typography>
      <div>
        {reports.map((report, index) => (
          <Box
            sx={{ width: "80%", bgcolor: "background.paper", pl: "10%" }}
            key={report._id}
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
                      {"A  "} {report.type} {" was reported for "}{" "}
                      {report.reason}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={{ color: "text.primary" }}>
                      {"Offender:  "}
                      {report.offender_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography>{report.message}</Typography>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <ReportDetails report={report} />
              </AccordionDetails>
              <AccordionActions>
                <Grid container direction="row" justifyContent="flex-end">
                  <Grid item xs={3}>
                    <Grid item xs={3}>
                      <Button
                        size="small"
                        color="success"
                        onClick={(index) => deleteReport(index)}
                      >
                        Ignore
                      </Button>
                    </Grid>
                  </Grid>
                  <Button
                    size="small"
                    color="error"
                    onClick={(index) => deleteOffender(index)}
                  >
                    Delete
                  </Button>
                </Grid>
              </AccordionActions>
            </Accordion>
          </Box>
        ))}
      </div>
    </div>
  );
}

export default Reports;
