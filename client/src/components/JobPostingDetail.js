import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Item from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { CardContent, List, ListItem } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import CircleIcon from "@mui/icons-material/Circle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Chip from "@mui/material/Chip";
import PaidIcon from "@mui/icons-material/Paid";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import WorkIcon from "@mui/icons-material/Work";

function JobPostingDetail(props) {
  const [applied, setApplied] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false); //////////////
  const [openError, setOpenError] = React.useState(false); /////////////
  const [loaded, setLoaded] = React.useState(false);
  const [id, setId] = React.useState(props.id);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };

  let main_font_size = 30;
  let sub_font_size = 17;

  const [data, setData] = React.useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    requirements: [],
    benefits: [],
    remote: "",
    type: "",
    deadline: "",
  });

  useEffect(() => {
    async function getOneJob() {
      let response_from_backend;
      response_from_backend = await fetch(
        "http://localhost:8080/api/job/getone/" + props.id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let response = await response_from_backend.json();
      console.log("response " + response_from_backend);
      if (response.status === 200) {
        console.log(response);
        setLoaded(true);
        setData(response.job);
      } else {
        console.log(response);
        console.log(response_from_backend);
        if (response_from_backend.status === 200) {
          setLoaded(true);
          setData(response.job);
        }
      }
    }
    getOneJob();
  }, [props]);

  async function applyToJob() {
    console.log("apply to job");
    console.log(localStorage.getItem("_id"));

    const reponse = await fetch(
      `http://localhost:8080/api/job/add/applicant/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          job_id: props.id,
          applicant_id: localStorage.getItem("_id"),
        }),
      }
    );
    console.log(reponse);
    const data = await reponse.json();
    if (reponse.status === 500) {
      setOpenError(true);
      setApplied(true);
    } else {
      setOpenSuccess(true);
      setApplied(true);
    }
    console.log(data);
    setApplied(true);
  }
  if (!loaded) {
    return (
      <div>
        <h1>loading</h1>
      </div>
    );
  } else {
    return (
      <div>
        <Card
          sx={{
            minWidth: 750,
            maxWidth: 750,
            bgcolor: "#f5f5f5",
            borderRadius: 5,
            boxShadow: 10,
            p: 2,
          }}
        >
          <CardContent>
            <Grid container spacing={2} direction="column">
              <Grid item xs={12}>
                <Typography
                  gutterBottom
                  variant="h3"
                  component="div"
                  sx={{ textAlign: "left", fontWeight: "bold" }}
                >
                  {data.title}
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={8}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ textAlign: "left", fontWeight: "bold" }}
                >
                  {data.company}
                </Typography>
              </Grid>

              <Grid
                item
                container
                xs={12}
                spacing={1}
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid item xs="auto">
                  <Chip
                    icon={<LocationOnIcon fontSize="small" />}
                    label={data.location}
                  />
                  <Chip
                    icon={<PaidIcon fontSize="small" />}
                    label={data.salary}
                  />
                </Grid>
                <Grid item xs="auto">
                  <Chip
                    icon={<EmojiTransportationIcon fontSize="small" />}
                    label={data.remote}
                  />
                  <Chip
                    icon={<WorkIcon fontSize="small" />}
                    label={data.type}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                  sx={{
                    pt: 2,
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: main_font_size,
                  }}
                >
                  Company
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  gutterBottom
                  component="div"
                  sx={{ textAlign: "left" }}
                >
                  {data.companyDescription}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                sx={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: main_font_size,
                  py: 2,
                }}
              >
                Job Description
              </Typography>
              <Typography
                gutterBottom
                component="div"
                sx={{ textAlign: "left" }}
              >
                {data.description}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                sx={{
                  pt: 2,
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: main_font_size,
                }}
              >
                Requirements
              </Typography>
            </Grid>
            <Item sx={{ gridColumn: "2/5" }}>
              <List>
                {data.requirements.map((requirement, index) => (
                  <ListItem>
                    <CircleIcon sx={{ fontSize: 8, px: 2 }} />
                    <Typography
                      key={index}
                      gutterBottom
                      variant="h4"
                      component="div"
                      sx={{ textAlign: "left", fontSize: sub_font_size }}
                    >
                      {requirement}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Item>

            <Item sx={{ gridColumn: "1/5" }}>
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                sx={{
                  pt: 2,
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: main_font_size,
                }}
              >
                {"Benefits "}
              </Typography>
            </Item>
            <Item sx={{ gridColumn: "2/5" }}>
              <List>
                {data.benefits.map((benefit, index) => (
                  <ListItem>
                    <CircleIcon sx={{ fontSize: 8, px: 2 }} />
                    <Typography
                      key={index}
                      gutterBottom
                      variant="h4"
                      component="div"
                      sx={{
                        fontSize: sub_font_size,
                        textAlign: "left",
                      }}
                    >
                      {benefit}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Item>
            <Box>
              <Button
                variant="contained"
                size="large"
                onClick={applyToJob}
                name="apply"
                id="apply"
              >
                Apply
              </Button>
            </Box>

            <Snackbar
              open={openSuccess}
              autoHideDuration={6000}
              onClose={() => setOpenSuccess(false)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Application Successful!
              </Alert>
            </Snackbar>
            <Snackbar
              open={openError}
              autoHideDuration={6000}
              onClose={() => setOpenError(false)}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert
                onClose={handleClose}
                severity="warning"
                sx={{ width: "100%" }}
              >
                You already Applied to this Job!
              </Alert>
            </Snackbar>
            <Box sx={{ pb: 5 }}></Box>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default JobPostingDetail;
