import React from "react";


function ResumeViewer()
{
  const base64_resume = localStorage.getItem("resume");
  // console.log(base64_resume)
  var bin = atob(base64_resume);
  console.log('File Size:', Math.round(bin.length / 1024), 'KB');
  
  // Embed the PDF into the HTML page and show it to the user
  var obj = document.createElement('object');
  obj.style.width = '70%';
  obj.style.height = '842pt';
  obj.style.marginLeft = '220pt';
  obj.type = 'application/pdf';
  obj.data = 'data:application/pdf;base64,' + base64_resume;
  document.body.append(obj)
  return (

    <div className="resume-viewer">

      </div>
  )
}

export default ResumeViewer;