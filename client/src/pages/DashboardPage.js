import JobPostingSummary from "../components/JobPostingSummary";
import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";
import { Grid } from "@mui/material";
import JobPostingDetail from "../components/JobPostingDetail";
import Pagination from '@mui/material/Pagination';


function Dashboard() {
  const [data, setData] = React.useState([]);
  const [currentLink, setCurrentLink] = React.useState();
  const [page, setPage] = React.useState(1);
  const [currentView, setCurrentView] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const page_size = Math.floor(data.length / 5);
  console.log(data.length);
  console.log(page_size);

  const handleChange = (event, value) => {
    setPage(value);
    setCurrentView(data.slice((value-1)*5,value*5));
  };

  useEffect(() => {
    async function getAllJobs() {
     let response = await fetch("http://localhost:8080/api/job/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      let data = await response.json();
      setData(data);
      setCurrentView(data.slice(0,5));
      setCurrentLink(data[0]._id);
    }
    getAllJobs();
  }, []);

  if (localStorage.getItem("loginStatus") === "false") {
    window.location.href = "/SignInPage";
  }

  const onLinkChange = (id) => {
    setCurrentLink(id);
  };

  return (
    <div >
      <Grow in={true} timeout={3000}>
        <Typography
          variant="h2"
          component="h1"
          sx={{ p: 5, mt: 10 }}
        >
          Job Postings
        </Typography>
      </Grow>
      <Grid
        container
        justifyContent="center"
      >
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          xs = {4}
          overflow="auto"
        >
          <Grid item xs={12}>
            {currentView.map((job_posting) => (
              <JobPostingSummary
                handleLinkChange={onLinkChange}
                data={job_posting}
                key={job_posting._id}
              />
            ))}
          </Grid>
        </Grid>
        <Grid item xs={7}>
          <JobPostingDetail id={currentLink} />
        </Grid>
        <Pagination  sx = {{ my: 15 }} size = "large" color= "primary" count={page_size} page={page} onChange={handleChange} />
      </Grid>
      
    </div>
  );
}

export default Dashboard;
