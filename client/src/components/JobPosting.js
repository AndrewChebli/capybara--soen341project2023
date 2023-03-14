import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CardActionArea } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

function stringToColor(string) {
  // assigns a color to the icon of a job posting card.
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  if (name.split(" ").length === 1) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name[0]}`,
    };
  } else {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
}

function JobPosting(job_posting) {
  const [applied, setApplied] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);//////////////
  const [openError, setOpenError] = React.useState(false);/////////////

  async function applyToJob() {
    console.log("apply to job");
    console.log(job_posting.data._id);
    console.log(localStorage.getItem("_id"));

    const reponse = await fetch(
      `http://localhost:8080/api/job/add/applicant/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          job_id: job_posting.data._id,
          applicant_id: localStorage.getItem("_id"),
        }),
      }
    );
    console.log(reponse);
    const data = await reponse.json();
    if (reponse.status === 500) {//////////////////
      setOpenError(true);
      setApplied(true);
    } else {
      setOpenSuccess(true);
      setApplied(true);
    }
    console.log(data);
    setApplied(true);////////////////////////////
  }

  let title = job_posting.data.title;
  let company = job_posting.data.company;
  let description = job_posting.data.description;
  let requirements = job_posting.data.requirements;
  let benefits = job_posting.data.benefits;
  let salary = job_posting.data.salary;
  console.log("title" + title);
  let spacing = 2;

  return (
    <div>
      <Card
        sx={{
          width: 1000,
          maxWidth: 1000,
          flexDirection: 2,
          justifyContent: "center",
        }}
      >
        <CardActionArea>
          <CardContent>
            <Avatar {...stringAvatar(company)} />

            <Button
              type="submit"
              halfWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={applyToJob}
              disabled={applied}
            >
              Apply
            </Button>

            <Typography gutterBottom variant="h4" component="div">
              {company}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>

            <Box sx={{ fontWeight: "bold", fontSize: 15, pb: spacing }}>
              {" "}
              {"Description: "}
              <Box sx={{ fontWeight: "regular", fontSize: 15 }}>
                {" "}
                {description}{" "}
              </Box>
            </Box>

            <Box sx={{ fontWeight: "bold", fontSize: 15, pb: spacing }}>
              {" "}
              {"Requirements: "}
              <Box sx={{ fontWeight: "regular", fontSize: 15 }}>
                {" "}
                {requirements}{" "}
              </Box>
            </Box>

            <Box sx={{ fontWeight: "bold", fontSize: 15, pb: spacing }}>
              {" "}
              {"Benefits: "}
              <Box sx={{ fontWeight: "regular", fontSize: 15 }}>
                {" "}
                {benefits}{" "}
              </Box>
            </Box>

            <Box sx={{ fontWeight: "bold", fontSize: 15, pb: spacing }}>
              {" "}
              {"Salary: "}
              <Box sx={{ fontWeight: "regular", fontSize: 15 }}> {salary} </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>

      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          width: "15%",
          borderRadius: 5,
          backgroundColor: "#2e7d32", // green color
          color: "#ffffff", // white text
          "& .MuiSnackbarContent-root": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px", // larger padding
            textAlign: "center",
            margin: "16px 8px 8px 8px", // added margin
          },
          "& .MuiTypography-root": {
            fontSize: "1.2rem", // larger font size
            fontWeight: "bold",
            margin: "0 auto", // center text horizontally
          },
        }}
      >
        <Typography variant="body1">Application successful!</Typography>
      </Snackbar>

      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          width: "15%",
          borderRadius: 5,
          backgroundColor: "#ff9800", // orange color
          color: "#ffffff", // white text
          "& .MuiSnackbarContent-root": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px", // larger padding
            textAlign: "center",
            margin: "16px 8px 8px 8px", // added margin
          },
          "& .MuiTypography-root": {
            fontSize: "1.2rem", // larger font size
            fontWeight: "bold",
            margin: "0 auto", // center text horizontally
          },
        }}
      >
        <Typography variant="body1">
          You have already applied to this job
        </Typography>
      </Snackbar>

      <Box sx={{ pb: 5 }}></Box>
    </div>
  );
}

export default JobPosting;
