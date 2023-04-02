import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardMedia } from "@mui/material";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Grid, Typography } from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";


let b64;

function ResumeBox(props) {
  
  const [resume, setResume] = useState(null);

  const handleResumeChange = async  (event) => {
    console.log("click");
    let file = event.target.files[0],
      reader = new FileReader();

    reader.onloadend = function () {
      b64 = reader.result.replace(/^data:.+;base64,/, "");
      console.log("triggered");
      console.log(b64);
      setResume(event.target.files[0]);
      props.handleResume(b64);
      props.handleResumeName(event.target.files[0].name);
    };
    reader.readAsDataURL(file);
    props.handleResumeName(event.target.files[0].name);
    props.handleResume(b64);
  };

  let resume_name = resume ? resume.name : "Upload your Resume";

  return (
    <Grid item xs={12} sx={{ m: 3 }}>
      <label htmlFor="resumeInput">
        <Typography component="h4" variant="h6">
          {`${resume_name}`}{" "}
        </Typography>
        <input
          id="resumeInput"
          name="resume"
          type="file"
          accept=".pdf, .docx"
          hidden
          onChange={handleResumeChange}
        />
        <AttachFileOutlinedIcon
          fontSize="large"
          color="primary"
          name="resumeIcon"
          sx = {{cursor: "pointer", marginLeft: "10px", marginTop: "10px"}}
        />
      </label>
    </Grid>
  );
}
export default ResumeBox;
