import React, { useState, useEffect } from "react";
import JobOfferCard from "../components/JobOfferCard";
import Box from "@mui/material/Box";


function Offers({ employeeId }) {
  const [jobOffers, setJobOffers] = useState([]);
  const [sortCriterion, setSortCriterion] = useState("date");

  useEffect(() => {
    async function fetchJobOffers() {
      // Replace this URL with your actual API URL
      const response = await fetch("/api/job-offers/employee/" + localStorage.getItem("_id"),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const data = await response.json();
      if( response.status === 200)
      {
        setJobOffers(data);  
      }else{
        alert("YOU SUCK");
      }
      
    }

    fetchJobOffers();
  }, [employeeId]);

  useEffect(() => {
    const sortedJobOffers = [...jobOffers].sort((a, b) => {
      switch (sortCriterion) {
        case "title":
          return a.title.localeCompare(b.title);
        case "company":
          return a.company.localeCompare(b.company);
        case "email":
          return a.email.localeCompare(b.email);
        default:
          return 0;
      }
    });
  
    setJobOffers(sortedJobOffers);
  }, [sortCriterion]);

  return (
    <Box marginTop={15}>
      <select
        value={sortCriterion}
        onChange={(e) => setSortCriterion(e.target.value)}
      >
        <option value="email">Email</option>
        <option value="title">Job Title</option>
        <option value="company">Company Name</option>
      </select>
  
      {jobOffers.map((jobOffer) => (
        <JobOfferCard key={jobOffer.id} jobOffer={jobOffer} />
      ))}
    </Box>
  );



  
}



export default Offers;
