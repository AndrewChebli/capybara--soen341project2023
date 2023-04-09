import JobPostingSummary from "../components/JobPostingSummary";
import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";
import { Grid } from "@mui/material";
import JobPostingDetail from "../components/JobPostingDetail";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";

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
    setCurrentView(data.slice((value - 1) * 5, value * 5));
  };

  useEffect(() => {
    async function getAllJobs() {
      let response = await fetch("http://localhost:8080/api/job/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      setData(data);
      setCurrentView(data.slice(0, 5));
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredData = data.filter((jobPosting) => {
      return jobPosting.title.toLowerCase().includes(event.target.value.toLowerCase()) ||
             jobPosting.description.toLowerCase().includes(event.target.value.toLowerCase()) ||
             jobPosting.company.toLowerCase().includes(event.target.value.toLowerCase()) ||
             jobPosting.location.toLowerCase().includes(event.target.value.toLowerCase()) ||
             jobPosting.requirements.join(" ").toLowerCase().includes(event.target.value.toLowerCase());
    });
    setCurrentView(filteredData.slice(0, 5));
  };

  const filteredData = data.filter((jobPosting) => {
    return jobPosting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           jobPosting.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
           jobPosting.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
           jobPosting.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
           jobPosting.requirements.join(" ").toLowerCase().includes(searchTerm.toLowerCase());
  });
  

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim() === "") {
      setCurrentView(data.slice(0, 5));
    } else {
      setCurrentView(filteredData.slice(0, 5));
    }
  };

  return (
    <div>
      <Grow in={true} timeout={3000}>
        <Typography variant="h2" component="h1" sx={{ p: 5, mt: 10 }}>
          Job Postings
        </Typography>
      </Grow>
      <Grid container justifyContent="center">
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          xs={4}
          overflow="auto"
        >
          <Grid item xs={12}>
            <form onSubmit={handleSearchSubmit}>
              <TextField
                id="search"
                label="Search"
                type="search"
                variant="outlined"
                size="small"
                fullWidth
                value={searchTerm}
                onChange={handleSearch}
                sx={{ mt: 2, mb: 2, width: '95%' }} // added this line to adjust width and spacing
              />
            </form>
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
        <Pagination
          sx={{ my: 15 }}
          size="large"
          color="primary"
          count={page_size}
          page={page}
          onChange={handleChange}
        />
      </Grid>
    </div>
  );
}

export default Dashboard;