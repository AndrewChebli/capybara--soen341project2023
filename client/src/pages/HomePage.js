import React from "react";
import Image from "mui-image";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Typography } from "@mui/material";
import register_image from "../images/download.jpeg";
import keyboard_image from "../images/keyboard_typing.jpg";
import Grow from "@mui/material/Grow";

function Home() {
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
              </Typography>
              <Typography variant="h5" color={"white"} fontFamily={"Roboto"}>
                Connect, collaborate and grow with us! You are one step closer
                to your next adventure.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grow>
      <Grow in={true} timeout={4000}>
      <Card
        sx={{
          maxWidth: 400,
          display: "inline-flex",
          marginLeft: 15,
          alignContent: "center",
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
            </Typography>
            <Typography variant="h5" color={"white"} fontFamily={"Roboto"}>
              Join a worldwide community, full of opportunities! Your next
              adventure awaits you..
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </Grow>
    </div>
  );
}

export default Home;
