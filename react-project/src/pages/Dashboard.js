import { React, useState, useContext } from "react";
import job_postings from "../job_postings.json";
import JobPosting from "../components/JobPosting";

function Dashboard() {
  return ( 
    <div>
      <h1>Dashboard</h1>
      <h4>
        This is the dashboard page. It will display a list of job postings that a user has applied to.
      </h4>
      {job_postings.map((job_posting) => (
        <JobPosting data = {job_posting} key = {job_posting.id}
        />
      ))}
                
    </div>
  );
}

export default Dashboard;
