import job_postings from "../job_postings.json";
import JobPosting from "../components/JobPosting";
import Box from "@mui/material/Box";
import PropTypes from 'prop-types';
import image from '../images/stock_image.jpg'
import React from 'react';
import ReactDOM from 'react-dom/client';

import { style } from "@mui/system";

function Home() {
  return (
    <div>
      <div style={{backgroundimage: `url(${image})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
      </div>
      <Box sx={{justifyContent: 'Center', alignItems: 'Center', mx: 'auto', pt:20}}>
        <Box sx={{fontSize: 30}}>
          <h1>
            Welcome to the Job Hive.
          </h1>
        </Box>
        <Box sx={{fontSize: 20, fontStyle: 'oblique'}}>
          <h2>
            Where professional dreams become reality.
          </h2>
        </Box>
        <Box sx={{fontSize: 20,fontStyle: '', pt: 15}}>
          <p>
            If you are not signed in, please do so by selecting "Login" or Create an account with the "SignUp" button.
          </p>
        </Box>
      </Box>
    </div>
  );
}

//</div>ReactDOM.createRoot(document.getElementById('root')).render(<Home />);
export default Home;
