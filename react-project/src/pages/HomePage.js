import React from "react";
import Image from "mui-image";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Typography } from "@mui/material";
import register_image from "../images/download.jpeg";
import keyboard_image from "../images/keyboard_typing.jpg";
import windows_xp_background from "../images/background_xp.jpg";

function Home() {
  return (
    <div>
      <Image
        src={windows_xp_background}
        style={{
          height: "100%",
          width: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          top: 0,
          opacity: 0.9,
          easing: "cube-bezier(0.075, 0.82, 0.165, 1)",
        }}
      ></Image>
      <Card
        sx={{
          maxWidth: 400,
          display: "inline-flex",
          alignContent: "center",
          backgroundColor: "transparent",
          marginTop: 30,
          opacity: 0.9,
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
              color="common.white"
              fontFamily={"Helvetica"}
            >
              Log in
            </Typography>
            <Typography
              variant="h5"
              color="common.white"
              fontFamily={"Helvetica"}
            >
              Connect, collaborate and grow with us! You are one step closer to
              your next adventure.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card
        sx={{
          maxWidth: 400,
          display: "inline-flex",
          marginLeft: 15,
          alignContent: "center",
          backgroundColor: "transparent",
          marginTop: 30,
          opacity: 0.9,
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
              color="common.white"
              fontFamily={"Helvetica"}
            >
              Register
            </Typography>
            <Typography
              variant="h5"
              color="common.white"
              fontFamily={"Helvetica"}
            >
              Join a worldwide community, full of opportunities! Your next
              adventure awaits you..
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default Home;
