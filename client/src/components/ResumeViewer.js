import { Typography } from "@mui/material";
import React from "react";

function ResumeViewer(props) {
  const base64_resume = sessionStorage.getItem("resume");
  console.log("Resume Viewer");
  // console.log(base64_resume)
  if (base64_resume === "undefined") {
    return (
      <Typography>
        No resume uploaded, go to edit profile page to upload one.
      </Typography>
    );
  } else {
    var bin = atob(base64_resume);
    console.log("File Size:", Math.round(bin.length / 1024), "KB");

    var obj = document.createElement("object");
    obj.style.width = "70%";
    obj.style.height = "842pt";
    obj.style.marginLeft = "220pt";
    obj.type = "application/pdf";
    obj.data = "data:application/pdf;base64," + base64_resume;
    document.body.append(obj);

    return <div className="resume-viewer"></div>;
  }
}

export default ResumeViewer;
