import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
function JobPosting(job_posting)
{
  let job = job_posting.data;
  console.log(job)
  return (
    <Card sx={{ maxWidth: 1500}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h7" component="div">
            {job.JobTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
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