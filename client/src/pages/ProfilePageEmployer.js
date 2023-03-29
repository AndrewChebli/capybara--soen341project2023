import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Card, CardContent, CardMedia } from "@mui/material";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import WebIcon from "@mui/icons-material/Web";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import Chip from "@mui/material/Chip";
import JobPostingSummary from "../components/JobPostingSummary";

function ProfilePageEmployer() {
  const [companyInfo, setCompanyInfo] = React.useState({});
  const [companyJobs, setCompanyJobs] = React.useState([]);
  const [currentLink, setCurrentLink] = React.useState();

  useEffect(() => {
    async function getCompanyInfo() {
      const response = await fetch(
        "http://localhost:8080/api/company/getone/642363fb3184b0dc63800a4c",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        setCompanyInfo(data);
      } else {
        window.location.href = "/SignInPage";
      }
    }
    getCompanyInfo();

    async function getCompanyJobs() {
      const response = await fetch(
        "http://localhost:8080/api/company/getCompanyJobs/642363fb3184b0dc63800a4c",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        console.log(data.jobs);
        setCompanyJobs(data.jobs);
      } else {
        // window.location.href = "/SignInPage";
      }
    }
    getCompanyJobs();
  }, []);

  return (
    <Box sx={{ mt: 15, maxWidth: " 80%", pl: "10%" }}>
      <Grid container direction="row ">
        <Grid item container direction=" column " xs={8}>
          <Grid item>
            <Card sx={{ borderRadius: 5 }}>
              <CardMedia sx={{ height: 305, mt: 5 }}>
                <img
                  style={{ borderRadius: 20 }}
                  alt="Remy Sharp"
                  src="https://picsum.photos/900/300"
                />
                <Box
                  sx={{
                    position: "relative",
                    top: -100,
                    left: 70,
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="https://picsum.photos/100/100"
                    sx={{
                      width: 100,
                      height: 100,
                      border: 4,
                      borderColor: "white",
                    }}
                  />
                </Box>
              </CardMedia>
              <CardContent sx={{ ml: 5 }}>
                <Typography variant="h2" sx={{ textAlign: "left", mt: 2 }}>
                  {companyInfo.companyName}
                </Typography>
                <Grid container direction="column" spacing={2}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                    sx={{ mt: 2 }}
                  >
                    <Grid item xs={3}>
                      <Chip
                        icon={<PhoneEnabledIcon fontSize="small" />}
                        label={companyInfo.phone}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Chip
                        icon={<EmailIcon fontSize="small" />}
                        label={companyInfo.email}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Chip
                        icon={<BusinessIcon fontSize="small" />}
                        label={companyInfo.address}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper
                      sx={{
                        p: 2,
                        flexGrow: 1,
                        borderRadius: 5,
                      }}
                    >
                      <Typography variant="h6" sx={{ textAlign: "left" }}>
                        {companyInfo.description}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item container direction="column" xs={4}>
                    {companyJobs.map((job) => (
                      <JobPostingSummary data={job} key={job._id} />
                    ))}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProfilePageEmployer;
