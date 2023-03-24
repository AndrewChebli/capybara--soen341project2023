import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Item from "@mui/material/Grid"
import Button from "@mui/material/Button"
import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";


function JobPostingDetail() {

  const [applied, setApplied] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false); //////////////
  const [openError, setOpenError] = React.useState(false); /////////////


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };


  const url = useParams();
  console.log(url)
  const id = url.id;
  let main_font_size = 30
  let sub_font_size = 17

   
  const [data, setData] = React.useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    requirements: "",
    benefits: "",
  });
  
  useEffect(() => {
    console.log("USEEFFECT");
    async function getOneJob() {
      let response;
      response = await fetch("http://localhost:8080/api/job/getone/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      console.log("RESPONSE" + JSON.stringify(response));
      setData(response.job);
    }
    getOneJob();
  }, [id]);

  async function applyToJob() {
    console.log("apply to job");
    console.log(localStorage.getItem("_id"));

    const reponse = await fetch(
      `http://localhost:8080/api/job/add/applicant/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          job_id: id,
          applicant_id: localStorage.getItem("_id"),
        }),
      }
    );
    console.log(reponse);
    const data = await reponse.json();
    if (reponse.status === 500) {
      setOpenError(true);
      setApplied(true);
    } else {
      setOpenSuccess(true);
      setApplied(true);
    }
    console.log(data);
    setApplied(true);
  }
  

  return (
    <div>
      <Box sx={{ width: 1000, maxWidth: 1000 , flexDirection: 'column', justifyContent: 'flex-start'} }>
          {/* <Avatar {...stringAvatar(company)} sx={{width:100, height: 100}} /> */}
            <Box sx={{pb:5}}></Box>
            <Box
              sx={{
                display: 'grid',
                gap: 1,
                gridTemplateColumns: 'repeat(2, 1fr)',
                gridAutoColumns: '1fr',
                
              }}
            >
              <Item sx={{gridColumn: '1/5'}} >
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: main_font_size}}>
                  {"Company: "}
                </Typography>
              </Item>
              <Item sx={{gridColumn: '2/5'}} >
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left', fontSize: main_font_size }}>
                  {data.company}
                </Typography>
              </Item>

              <Item sx={{gridColumn: '1/5'}} >
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: main_font_size}}>
                  {"Position: "}
                </Typography>
              </Item>
              <Item sx={{gridColumn: '2/5'}} >
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left', fontSize: main_font_size-4 }}>
                  {data.title}
                </Typography>
              </Item>
              
              <Item sx={{gridColumn: '1/5'}}>
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: main_font_size}}>
                  {"Description: "}
                </Typography>
              </Item>
              <Item sx={{gridColumn: '2/5'}}>
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left', fontSize: sub_font_size  }}>
                  {data.description}
                </Typography>
              </Item>

              <Item sx={{gridColumn: '1/5'}}>
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: main_font_size}}>
                  {"Requirements: "}
                </Typography>
              </Item>
              <Item sx={{gridColumn: '2/5'}}>
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left', fontSize: sub_font_size  }}>
                  {data.requirements}
                </Typography>
              </Item>

              <Item sx={{gridColumn: '1/5'}}>
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: main_font_size}}>
                  {"Benefits: "}
                </Typography>
              </Item>
              <Item sx={{gridColumn: '2/5'}}>
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left', fontSize: sub_font_size  }}>
                  {data.benefits}
                </Typography>
              </Item>

              <Item sx={{gridColumn: '1/5'}}>
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: main_font_size}}>
                  {"Salary: "}
                </Typography>
              </Item>
              <Item sx={{gridColumn: '2/5'}}>
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left', fontSize: main_font_size  }}>
                  {data.salary}
                </Typography>
              </Item>
            </Box>
            <Box>
        <Button variant="contained" size="large" onClick={applyToJob}
          name = "apply"
          id="apply"
        >
          Apply
        </Button>
      </Box>
           
      </Box>
      
      <Box sx= {{ pb: 5}}></Box>
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Application Successful!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          You already Applied to this Job!
        </Alert>
      </Snackbar>
      <Box sx={{ pb: 5 }}></Box>
    </div>
  );
}

export default JobPostingDetail;