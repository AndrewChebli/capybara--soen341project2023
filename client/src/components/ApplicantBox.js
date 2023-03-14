import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";



const ApplicantBox = (applicant_id , job_id) => {
  console.log(applicant_id.applicant_id);

  const [applicant, setApplicant] = React.useState(null);
  const [selected, setSelected] = React.useState(false);

  
  React.useEffect(() => {
    const fetchApplicant = async () => {
      await applicant_id;
      let _id =  applicant_id.applicant_id;
      console.log(_id)
      const response = await fetch(
        "http://localhost:8080/api/employee/getone/" + _id
      ,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
      );
      const responseData = await response.json();
      setApplicant(responseData.employee);
    };
    fetchApplicant();
  }, [applicant_id, job_id]);

  async function selectApplicant() {
    const response = await fetch(
      "http://localhost:8080/api/company/selectApplicant/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          job_id: applicant_id.job_id,
          applicant_id: applicant_id.applicant_id,
        }),
      }
    );
    const responseData = await response.json();
    if(response === 500){
      console.log("error");
    }
    if(response === 200){
      setSelected(true);
      console.log("success");
      
    }
    console.log(responseData);
  }



  return (
    <Box>
      {applicant && (
        <Typography variant="h6" gutterBottom>
          {applicant.firstName}{applicant.lastName}
        </Typography>
      )}

      {applicant && (
        <Typography variant="h6" gutterBottom>
          {applicant.email}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={selectApplicant}
        disabled={selected}
      >
        Select & Notify
      </Button>

    </Box>
   
  );
};

export default ApplicantBox;
