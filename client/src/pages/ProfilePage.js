import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ResumeViewer from "../components/ResumeViewer";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { Card, CardContent, CardMedia } from "@mui/material";
import Chip from "@mui/material/Chip";
import EmailIcon from "@mui/icons-material/Email";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import SchoolIcon from "@mui/icons-material/School";
import Paper from "@mui/material/Paper";

function ProfilePage() {
  const [employeeInfo, setEmployeeInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    education: {
      school: "",
      degree: "",
      start: "",
      end: "",
    },
    experience: [
      {
        company: "",
        position: "",
        description: "",
        start: "",
        end: "",
      },
    ],
    offers: [],
  });

  useEffect(() => {
    async function getEmployeeInfo() {
      let response_from_backend = await fetch(
        "http://localhost:8080/api/employee/getone/" +
          localStorage.getItem("_id"),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let response = await response_from_backend.json();
      console.log(response);
      setEmployeeInfo(response.employee);
    }
    getEmployeeInfo();
  }, [setEmployeeInfo]);

  return (
    <Box>
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
                  <Typography variant="h2" component="div" gutterBottom>
                    {employeeInfo.firstName} {employeeInfo.lastName}
                  </Typography>
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
                        label={"514-123-4567"}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Chip
                        icon={<EmailIcon fontSize="small" />}
                        label={employeeInfo.email}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Chip
                        icon={<SchoolIcon fontSize="small" />}
                        label={"Bachelor's in " + employeeInfo.education.degree}
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
                        I'm a software engineer with over five years of
                        experience in developing and maintaining complex
                        software systems. My expertise lies in developing
                        scalable, maintainable, and secure applications using
                        programming languages such as Java, Python, and
                        JavaScript. I have a deep understanding of software
                        design patterns, algorithms, and data structures, which
                        allows me to write efficient and robust code.
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx = {{ my : 2 }} />
                    <Paper
                      sx={{
                        p: 2,
                        flexGrow: 1,
                        borderRadius: 5,
                      }}
                    >
                      <Typography variant="h4" sx={{ textAlign: "left" }}>
                        {employeeInfo.experience[0].position}

                        </Typography>
                        <Typography variant="h5" sx={{ textAlign: "left" }}>
                        At {employeeInfo.experience[0].company}
                        
                        </Typography>
                        <Typography variant="h6" sx={{ textAlign: "left" }}>
                        {employeeInfo.experience[0].description}
                        
                        </Typography>
                        <Typography variant="h6" sx={{ textAlign: "left" }} >
                        {"from " } {employeeInfo.experience[0].start} {" to "}{employeeInfo.experience[0].end}
                        </Typography>
                    </Paper>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ProfilePage;
