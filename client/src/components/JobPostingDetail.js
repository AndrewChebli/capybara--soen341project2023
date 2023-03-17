import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CardActionArea } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Item from "@mui/material/Grid"
import Button from "@mui/material/Button"
import {useState, useEffect} from "react";

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
  console.log(job_posting.data.job)
// console.log(job_posting.data.job.title)
  // let title = job_posting.data.job.title;
  // let company = job_posting.data.job.company;
  // let description = job_posting.data.job.description;
  // let requirements = job_posting.data.job.requirements;
  // let benefits = job_posting.data.job.benefits;
  // let salary = job_posting.data.job.salary;
  let spacing = 2;
  let main_font_size = 30
  let sub_font_size = 17

  





  

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
                  {/* {company} */}
                </Typography>
              </Item>

              <Item sx={{gridColumn: '1/5'}} >
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: main_font_size}}>
                  {"Position: "}
                </Typography>
              </Item>
              <Item sx={{gridColumn: '2/5'}} >
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left', fontSize: main_font_size-4 }}>
                  {/* {title} */}
                </Typography>
              </Item>
              
              <Item sx={{gridColumn: '1/5'}}>
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: main_font_size}}>
                  {"Description: "}
                </Typography>
              </Item>
              <Item sx={{gridColumn: '2/5'}}>
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left', fontSize: sub_font_size  }}>
                  {/* {description} */}
                </Typography>
              </Item>

              <Item sx={{gridColumn: '1/5'}}>
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: main_font_size}}>
                  {"Requirements: "}
                </Typography>
              </Item>
              <Item sx={{gridColumn: '2/5'}}>
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left', fontSize: sub_font_size  }}>
                  {/* {requirements} */}
                </Typography>
              </Item>

              <Item sx={{gridColumn: '1/5'}}>
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: main_font_size}}>
                  {"Benefits: "}
                </Typography>
              </Item>
              <Item sx={{gridColumn: '2/5'}}>
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left', fontSize: sub_font_size  }}>
                  {/* {benefits} */}
                </Typography>
              </Item>

              <Item sx={{gridColumn: '1/5'}}>
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: main_font_size}}>
                  {"Salary: "}
                </Typography>
              </Item>
              <Item sx={{gridColumn: '2/5'}}>
                <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'left', fontSize: main_font_size  }}>
                  {job_posting.data.job.salary}
                </Typography>
              </Item>
            </Box>
          
           
      </Box>
      <Box>
        <Button variant="contained" size="large">
          Apply
        </Button>
      </Box>
      <Box sx= {{ pb: 5}}></Box>
    </div>
  );
}

export default JobPostingDetail;