import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CardActionArea } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { spacing } from '@mui/system';

function stringToColor(string) { // assigns a color to the icon of a job posting card.
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}



function stringAvatar(name) {
  if (name.split(" ").length === 1) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name[0]}`,
    };
  } else {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
}


    
    

function JobPosting(job_posting) {

  
  let job = job_posting.data;
  //console.log(job.CompanyName);
  let title = job.CompanyName;
  let spacing = 2;

  localStorage.setItem("company", job.company);
  console.log(localStorage.getItem("company"));
  return (
    <div>
      <Card sx={{ width: 1000, maxWidth: 1000 , flexDirection: 2, justifyContent: 'center'} }>
        <CardActionArea>
          <CardContent>
          {console.log("bruh" + job.title)}
          <Avatar {...stringAvatar(title)} />
            <Typography gutterBottom variant="h4" component="div">
              {job.company}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {job.title}
            </Typography>

            <Box sx= {{ fontWeight: 'bold', fontSize: 15, pb: spacing }}> {"Description: "} 
              <Box sx= {{ fontWeight: 'regular', fontSize: 15, }}> {job.description} </Box>
            </Box>

            <Box sx= {{ fontWeight: 'bold', fontSize: 15, pb: spacing }}> {"Requirements: "} 
              <Box sx= {{ fontWeight: 'regular', fontSize: 15, }}> {job.requirements} </Box>
            </Box>

            <Box sx= {{ fontWeight: 'bold', fontSize: 15, pb: spacing }}> {"Benefits: "} 
              <Box sx= {{ fontWeight: 'regular', fontSize: 15, }}> {job.benefits} </Box>
            </Box>

            <Box sx= {{ fontWeight: 'bold', fontSize: 15, pb: spacing }}> {"Salary: "} 
              <Box sx= {{ fontWeight: 'regular', fontSize: 15, }}> {job.salary} </Box>
            </Box>
        
      
          </CardContent>
        </CardActionArea>
      </Card>
      <Box sx= {{ pb: 5}}></Box>
    </div>
  );
}

export default JobPosting;