import job_postings from "../job_postings.json";
import JobPosting from "../components/JobPosting";
import Box from "@mui/material/Box";
import PropTypes from 'prop-types';


function Home() {
  return (
    <div>
      <Box sx={{justifyContent: 'Center', alignItems: 'Center', mx: 'auto', pt:50}}>
        <Box sx={{fontSize: 30}}>
          <h1>
            Placeholder for About Page
          </h1>
        </Box>
      </Box>
    </div>
  );
}

export default Home;