
import job_postings from "../job_postings.json";
import JobPosting from "../components/JobPosting";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom/client";
import Image from "mui-image";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Typography } from "@mui/material";
import handshake_image from "../images/download.jpeg";
import register_image from "../images/register_image.jpeg";

import { style } from "@mui/system";

function Home() {
  return (
    <div>
      <Image
        src="https://picsum.photos/id/492/2000"
        style={{
          height: "100%",
          width: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          top: 70,
          opacity: 0.8,
          easing: "cube-bezier(0.075, 0.82, 0.165, 1)",
        }}
      ></Image>
      <Card
        sx={{
          maxWidth: 400,
          display: "inline-flex",
          alignContent: "center",
          marginTop: 10,
          opacity: 0.8,
          easing: "cube-bezier(0.075, 0.82, 0.165, 1)",
        }}
      >
        <CardActionArea>
          <CardMedia style={{easing: "cube-bezier(0.075, 0.82, 0.165, 1)"}}
            component="img"
            height="250"
            image={handshake_image}
            alt="handshake"
            
          />
          <CardContent>
            <Typography gutterBottom variant="h3" component="div">
              Log in
            </Typography>
            <Typography variant="h6" color="text.primary">
              Connect, collaborate and grow with us!
              Welcome back! You are one step closer to your next adventure.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card
        sx={{
          maxWidth: 400,
          display: "inline-flex",
          alignContent: "center",
          marginTop: 10,
          marginLeft: 10,
          opacity: 0.8,
          easing: "cube-bezier(0.075, 0.82, 0.165, 1)",
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            image={register_image}
            alt="handshake"
          />
          <CardContent>
            <Typography gutterBottom variant="h3" component="div">
              Register
            </Typography>
            <Typography variant="h6" color="text.primary">
              Join a worldwide community, full of opportunities!
              Your next adventure awaits you.. 
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default Home;