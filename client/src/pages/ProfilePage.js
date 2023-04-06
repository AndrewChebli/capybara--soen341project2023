import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ResumeViewer from "../components/ResumeViewer";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { 
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import EmailIcon from "@mui/icons-material/Email";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import SchoolIcon from "@mui/icons-material/School";
import Paper from "@mui/material/Paper";
import Grow from "@mui/material/Grow";
import Carousel from "react-material-ui-carousel";
import { useParams } from "react-router-dom";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

function ProfilePage(props) {
  const [news, setNews] = useState([]);

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
    skills: [],
    resume: "",
  });
  let url = useParams().id;
  useEffect(() => {
    async function getEmployeeInfo() {
      let id = localStorage.getItem("_id");
      if (url !== undefined) {
        id = url;
      }
      console.log(id);
      let response_from_backend = await fetch(
        "http://localhost:8080/api/employee/getone/" + id,
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
  }, [url]);

  useEffect(() => {
    async function getNews() {
      let response_from_backend = await fetch(
        "http://localhost:8080/api/employee/news",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let response = await response_from_backend.json();
      console.log("NEWS");
      console.log(response);
      setNews(response.news.results);
    }
    getNews();
  }, []);


  return (
    <Box>
      <Box sx={{ mt: 15, maxWidth: " 80%", pl: "10%" }}>
        <Grid container direction="row">
          <Grid item container direction="column" xs={8}>
            {url !== undefined ? (
              <Button
                variant="contained"
                sx={{ mb: 5 }}
                href="../CompanyJobApplicantsPage"
              >
                Return to Applicants
              </Button>
            ) : (
              <div></div>
            )}
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
                        label={employeeInfo.education.degree}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper
                      sx={{
                        p: 2,
                        flexGrow: 1,
                        borderRadius: 5,
                        mt: 2,
                      }}
                    >
                      <Typography variant="h6" sx={{ textAlign: "left" }}>
                        {employeeInfo.bio}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Typography variant="h3" sx={{ my: 5, textAlign: "left" }}>
                    Work Experience
                  </Typography>
                  {employeeInfo.experience.map((experience) => (
                    <Grid item xs={12} key={experience.position}>
                      <Divider sx={{ my: 4 }} />
                      <Paper
                        sx={{
                          p: 2,
                          flexGrow: 1,
                          borderRadius: 5,
                        }}
                      >
                        <Typography
                          variant="h4"
                          sx={{ textAlign: "left", my: 1 }}
                        >
                          {experience.position}
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{ textAlign: "left", my: 1 }}
                        >
                          At {experience.company}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ textAlign: "left", mx: 5, my: 1 }}
                        >
                          {experience.description}
                        </Typography>
                        <Divider variant="middle" sx={{ my: 2 }}>
                          <Typography
                            variant="body3"
                            sx={{ textAlign: "right" }}
                          >
                            {experience.start} {" to "}
                            {experience.end}
                          </Typography>
                        </Divider>
                      </Paper>
                    </Grid>
                  ))}
                </CardContent>
              </Card>
            </Grid>
            <Grid item sx={{ mt: 5 }}>
              <Typography variant="h2">Resume</Typography>
              <Document file={`data:application/pdf;base64,${employeeInfo.resume}`}>
                <Page pageNumber={1}  renderTextLayer={false}/>
              </Document>
            </Grid>
          </Grid>
          <Grid
            sx={{ ml: 2 }}
            item
            container
            direciton="column"
            xs={3}
            spacing={2}
          >
            <Grid item sx={12}>
              <Typography
                variant="h3"
                color="primary"
                sx={{ textAlign: "left" }}
              >
                Skills
              </Typography>
            </Grid>
            {employeeInfo.skills.map((skill, index) => (
              <Grow key={skill} in={true} timeout={index * 1000}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    transition: "max-height 1s ease-in",
                    easing: "cube-bezier(0.075, 0.82, 0.165, 1)",
                  }}
                >
                  <Card sx={{ borderRadius: 5, backgroundColor: "#f5f5f5" }}>
                    <CardContent>
                      <Typography
                        variant="h5"
                        color="primary"
                        component="div"
                        sx={{ textAlign: "left" }}
                      >
                        {skill}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grow>
            ))}

            <Grid item sx={12}>
              <Typography
                variant="h3"
                color="primary"
                sx={{ textAlign: "left" }}
              >
                News
              </Typography>
            </Grid>
            <Carousel
              autoPlay={true}
              interval={5000}
              animation="slide"
              sx={{
                maxHeight: "100%",
                minHeight: "100%",
                width: "100%",
              }}
            >
              {news.map((article) => (
                <Grid
                  key={article.title}
                  item
                  xs={12}
                  sx={{
                    transition: "max-height 1s ease-in",
                    easing: "cube-bezier(0.075, 0.82, 0.165, 1)",
                  }}
                >
                  <Card sx={{ borderRadius: 5, backgroundColor: "#f5f5f5" }}>
                    <CardActionArea href={article.link}>
                      <CardContent>
                        <Typography
                          variant="h5"
                          color="primary"
                          component="div"
                        >
                          {article.title}
                        </Typography>
                        <Box
                          sx={{
                            position: "relative",
                            backgroundColor: "white",
                            borderRadius: 5,
                            shadow: 5,
                            p: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <Typography variant="body2">
                            {article.description}
                          </Typography>
                        </Box>
                        <Typography variant="body2">{article.url}</Typography>
                        <Typography variant="body2">
                          {article.publishedAt}
                        </Typography>
                        <Typography variant="body2"></Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Carousel>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ProfilePage;
