//import job_postings from "../job_postings.json";
import JobPosting from "../components/JobPosting";
import Box from "@mui/material/Box";
import PropTypes from 'prop-types';
import React from "react";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {

  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};


let job_postings ;

function Dashboard() {
  
  // let [data, setData] = React.useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:8080/getAllJobs")
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // }, []);
  
  
  // ================START OF FRONT-END ENDPOINT=====================
  async function get_all_jobs_json(event){
    //event.preventDefault();
    const response = await fetch("http://localhost:8080/getAllJobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        
        })
    });

    // console.log(response);
    // console.log("here");
    const resp = await response.json();

    

    if (resp.status === "success") {
      //console.log(resp.status);
      job_postings = (JSON.stringify(resp.data));
      console.log(job_postings);
      //console.log(job_postings);
    }else{
      alert("Invalid Credentials");
    }
  }
  // ================END OF FRONT-END ENDPOINT=====================

  return (
    <div>
      {get_all_jobs_json()}
      <h1>Dashboard</h1>
      <h4>
        This is the dashboard page. It will display a list of job postings that
        a user can apply to.
      </h4>
      <div style={{ width: "100%" }}>
        <Box
          sx={{
            display: "inline-flex",
            flexWrap: "wrap",
            alignContent: "baseline",
            p: 10,
            m: 10,
            bgcolor: "background.paper",
            maxWidth: 1200,
            height: 300,
            borderRadius: 1,
            justifyContent: 'center' 
          }}
        >
          {console.log(job_postings)}
          {job_postings.map((job_posting) => (
            <JobPosting data={job_posting} key={job_posting._id} />
            
          ))}
          {console.log("Bruh")}
        </Box>
      </div>
    </div>
  );
}

export default Dashboard;