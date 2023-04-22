import React from "react";
import Typography from "@mui/material/Typography";
import { Card, CardMedia } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardHeader } from "@mui/material";
import { CardActions } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";

import admin_img from "../images/icon-admin.png";


export default function SignUpAdmin() {

  const [email , setEmail] = React.useState("");
  const [password , setPassword] = React.useState(""); 

  const registerService = async () => {
    console.log(email);

    const response = await fetch("http://localhost:8080/api/admin/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    console.log(response);

    if (response.status === 201) {
      alert("Registration Successful");
      toast.warn("The team will review and approve your account within 24 hours");
    } else {
      alert("Registration Failed");
    }

  };



  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Admin" />
          <CardMedia  
            component="img"
            height="140"
            image={admin_img}
            alt="admin icon"
            sx = {{objectFit: 'contain'}}
          />

          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",

                "& > :not(style)": {
                  m: 1,
                  width: "25ch",
                },
              }}
            >
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField

                id="outlined-basic"
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
          </CardContent>
          <CardActions>
            <Button variant="contained" onClick = {registerService}>Sign Up</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}


              
