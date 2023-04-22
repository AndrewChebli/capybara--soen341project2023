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






function Reports() {
  
  const [expanded, setExpanded] = React.useState(false);
  const [reports, setReports] = React.useState([]);
  const [jobs_exist, set_jobs_exist] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const deleteOffender = async(index) => {
    try {
      let _id = reports[index].offender_id;
      console.log(JSON.stringify("ID : " + _id))
      // console.log(reports[index])
      const response = await fetch(`http://localhost:8080/api/admin/job/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }); 
      const resp = await response.json();
      console.log(resp);      
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

    try {
      let _id = reports[index]._id;
      console.log(JSON.stringify("ID : " + _id))
      // console.log(reports[index])
      const response = await fetch(`http://localhost:8080/api/report/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }); 
      const resp = await response.json();
      console.log(resp);      
      if (response.status === 200) {
        alert('report deleted successfully')
      } else {
        throw new Error('Error deleting report');
      }
  
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('Error deleting job');
    }
  };


  const deleteReport = async(index) => {
    try{
    let _id = reports[index]._id;
      console.log(JSON.stringify("ID : " + _id))
      // console.log(reports[index])
      const response = await fetch(`http://localhost:8080/api/report/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }); 
      const resp = await response.json();
      console.log(resp);      
      if (response.status === 200) {
        alert('report deleted successfully')
      } else {
        throw new Error('Error deleting report');
      }
  
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('Error deleting job');
    }
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

  // if (reports.length > 0) {
  //   set_jobs_exist(true);

  // }

  if (reports.length > 0) {
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
                          onClick={() => deleteReport(index)}
                          // onClick= {deleteReport(index)} 
                        >
                          Ignore
                        </Button>
                      </Grid>
                    </Grid>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => deleteOffender(index)}
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

  else{
    return(
      <div style={{ width: "100%" , mt : 100}}>
       <Typography variant = "h3" sx={{ mt: 20 }}>
                        No reports to show
                      </Typography>
      </div>
    );
  }

  
}

export default Reports;
