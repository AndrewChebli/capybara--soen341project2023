import React from "react";
import Image from "mui-image";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Divider, Typography, Zoom } from "@mui/material";
import register_image from "../images/download.jpeg";
import keyboard_image from "../images/keyboard_typing.jpg";
import Grow from "@mui/material/Grow";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function Home() {
  const [checked, setChecked] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
  const [checked4, setChecked4] = React.useState(false);
  const [checked5, setChecked5] = React.useState(false);

  setTimeout(() => {
    setChecked(true);
  }, 1000);

  setTimeout(() => {
    setChecked2(true);
  }, 2000);

  setTimeout(() => {
    setChecked3(true);
  }, 3000);

  setTimeout(() => {
    setChecked4(true);
  }, 4000);

  setTimeout(() => {
    setChecked5(true);
  }, 5000);

  return (
    <div>
      <Grow in={true} timeout={3000}>
        <Typography
          marginTop="140px"
          marginBottom="50px"
          variant="h2"
          fontFamily={"Roboto"}
        >
          Welcome to JobHive!
        </Typography>
      </Grow>
      <Grid container spacing={2} direction="row">
        <Grid item container direction="column" xs={3} spacing = {5}>
          <Grid item>
            <Grow in={checked} timeout={2000}>
              <Typography variant="h3" color={"primary"}>
                Connect
              </Typography>
            </Grow>
          </Grid>
          <Grid item>
            <Grow in={checked2} timeout={2000}>
              <ArrowDownwardIcon color="primary" sx={{ fontSize: 40 }} />
            </Grow>
          </Grid>
          <Grid item>
            <Grow in={checked3} timeout={2000}>
              <Typography variant="h3" color={"primary"}>
                Apply
              </Typography>
            </Grow>
          </Grid>
          <Grid item>
            <Grow in={checked4} timeout={2000}>
              <ArrowDownwardIcon color="primary" sx={{ fontSize: 40 }} />
            </Grow>
          </Grid>
          <Grid item>
            <Grow in={checked5} timeout={2000}>
              <Typography variant="h3" color={"primary"}>
                Grow
              </Typography>
            </Grow>
          </Grid>
        </Grid>

        <Grid item xs={3}>
          <Grow in={true} timeout={4000}>
            <Card
              sx={{
                maxWidth: 400,
                display: "inline-flex",
                alignContent: "center",
                transition: "max-height 1s ease-in",
                backgroundColor: "#1d8bf8",
                opacity: 0.9,
                borderRadius: 5,
                boxShadow: 5,
                easing: "cube-bezier(0.075, 0.82, 0.165, 1)",
                "&:hover": {
                  boxShadow: 20,
                },
              }}
            >
              <CardActionArea href="SignInPage">
                <CardMedia>
                  <Image
                    src={keyboard_image}
                    sx={{
                      height: 300,
                      width: 400,
                      easing: "cube-bezier(0.075, 0.82, 0.165, 1)",
                    }}
                  ></Image>
                </CardMedia>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h3"
                    component="div"
                    color={"white"}
                    fontFamily={"Roboto"}
                  >
                    Log in
                    <Divider variant="middle" color="white" sx={{ m: 2 }} />
                  </Typography>
                  <Typography
                    variant="h5"
                    color={"white"}
                    fontFamily={"Roboto"}
                  >
                    Connect, collaborate and grow with us! You are one step
                    closer to your next adventure.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grow>
        </Grid>
        <Grid item xs={3}>
          <Grow in={true} timeout={4000}>
            <Card
              sx={{
                display: "inline-flex",
                alignContent: "center",
                maxWidth: 400,
                borderRadius: 5,
                opacity: 0.9,
                boxShadow: 5,
                backgroundColor: "#1d8bf8",
                easing: "cube-bezier(0.075, 0.82, 0.165, 1)",
                "&:hover": {
                  boxShadow: 20,
                },
              }}
            >
              <CardActionArea href="SignUpPage">
                <CardMedia>
                  <Image src={register_image}></Image>
                </CardMedia>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h3"
                    component="div"
                    color={"white"}
                    fontFamily={"Roboto"}
                  >
                    Register
                    <Divider variant="middle" color="white" sx={{ m: 2 }} />
                  </Typography>
                  <Typography
                    variant="h5"
                    color={"white"}
                    fontFamily={"Roboto"}
                  >
                    Join a worldwide community, full of opportunities! Your next
                    adventure awaits you..
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grow>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
