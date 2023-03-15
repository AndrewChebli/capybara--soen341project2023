import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CardActionArea } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Item from "@mui/material/Grid"

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


    
    

function JobPostingDetail(job_posting) {
  console.log("JobPosting.js");
  console.log(job_posting.data)

  let title = job_posting.data.title;
  let company = job_posting.data.company;
  let description = job_posting.data.description;
  let requirements = job_posting.data.requirements;
  let benefits = job_posting.data.benefits;
  let salary = job_posting.data.salary;
  console.log("title" + title)
  let spacing = 2;

  return (
    <div>
      <Box sx={{ width: 1000, maxWidth: 1000 , flexDirection: 'column', justifyContent: 'flex-start'} }>
          <Avatar {...stringAvatar(company)} sx={{width:100, height: 100}} />
            <Box sx={{pb:5}}></Box>
            <Box
              sx={{
                display: 'grid',
                gap: 1,
                gridTemplateColumns: 'repeat(2, 1fr)',
                gridAutoColumns: '1fr',
              }}
            >
              <Item>
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left' }}>
                  {"Company: "}
                </Typography>
              </Item>
              <Item>
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left' }}>
                  {company}
                </Typography>
              </Item>
              
              <Item>
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left' }}>
                  {"Description: "}
                </Typography>
              </Item>
              <Item>
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left' }}>
                  {description}
                </Typography>
              </Item>

              <Item>
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left' }}>
                  {"Requirements: "}
                </Typography>
              </Item>
              <Item>
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left' }}>
                  {requirements}
                </Typography>
              </Item>

              <Item>
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left' }}>
                  {"Benefits: "}
                </Typography>
              </Item>
              <Item>
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left' }}>
                  {benefits}
                </Typography>
              </Item>

              <Item>
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left' }}>
                  {"Salary: "}
                </Typography>
              </Item>
              <Item>
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left' }}>
                  {salary}
                </Typography>
              </Item>
            </Box>
          
            
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>

            <Box sx= {{ fontWeight: 'bold', fontSize: 15, pb: spacing }}> {"Description: "} 
              <Box sx= {{ fontWeight: 'regular', fontSize: 15, }}> {description} </Box>
            </Box>

            <Box sx= {{ fontWeight: 'bold', fontSize: 15, pb: spacing }}> {"Requirements: "} 
              <Box sx= {{ fontWeight: 'regular', fontSize: 15, }}> {requirements} </Box>
            </Box>

            <Box sx= {{ fontWeight: 'bold', fontSize: 15, pb: spacing }}> {"Benefits: "} 
              <Box sx= {{ fontWeight: 'regular', fontSize: 15, }}> {benefits} </Box>
            </Box>

            <Box sx= {{ fontWeight: 'bold', fontSize: 15, pb: spacing }}> {"Salary: "} 
              <Box sx= {{ fontWeight: 'regular', fontSize: 15, }}> {salary} </Box>
            </Box>
        
      
        
      </Box>
      <Box sx= {{ pb: 5}}></Box>
    </div>
  );
}

export default JobPostingDetail;