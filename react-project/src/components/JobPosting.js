import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Avatar from "@mui/material/Avatar";

function stringToColor(string) {
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
  console.log(job.CompanyName);
  let title = job.CompanyName;
  return (
    <Card sx={{ maxWidth: 1500 }}>
      <CardActionArea>
        <CardContent>
        <Avatar {...stringAvatar(title)} />
          <Typography gutterBottom variant="h4" component="div">
            {job.CompanyName}
          </Typography>
        
          <Typography gutterBottom variant="h5" component="div">
            {job.JobTitle}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {job.Description}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {job.Requirements}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {job.Benefits}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {job.Salary}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default JobPosting;
