import Box from "@mui/material/Box";
import { useEffect } from "react";
import { useState } from "react";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";


function Offers() {
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    async function getOffers() {
      let response_from_backend = await fetch(
        "http://localhost:8080/api/employee/getAllOffers/" +
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
      setOffers(response.offers);
    }
    getOffers();
  }, []);

  if (offers.length === 0) {
    return (
      <div>
        <Box
          sx={{
            justifyContent: "Center",
            alignItems: "Center",
            mx: "auto",
            pt: 50,
          }}
        >
          <Box sx={{ fontSize: 30 }}>
            <h1>You have no offers</h1>
          </Box>
        </Box>
      </div>
    );
  } else {
    return (
      <div>
        <Box
          sx={{
            justifyContent: "Center",
            alignItems: "Center",
            mx: "auto",
            width: "70%",
            ml: "15%",
            mt: 20,
          }}
        >
          <Box sx={{ fontSize: 30 }}>
            <Typography
              sx={{ p: 2 }}
              variant="h1"
              color="primary"
              mr={90}
            >
              Offers
            </Typography>
            <Divider></Divider>

            {offers.map((offerInfo) => (


              <Paper
              key={offerInfo._id}
              sx={{
                mt: 10,
                maxWidth: 600,
                flexGrow: 1,
                bgcolor: "background.paper",
                borderRadius: 1,
                elevation: 12,
              }}
              >

              <Grid container spacing={2}>
                <Grid item xs >
                    <Typography sx={{p: 2}} variant="h4" >
                    {offerInfo.company}
                    </Typography>
                </Grid>
                <Divider  orientation="vertical" flexItem  variant="middle"/>
                <Grid item xs>
                <Grid item >  
                  <Typography variant="h6" component="div">
                    {offerInfo.title}
                  </Typography>
                </Grid>
                <Grid item >
                  <Typography variant="h6" component="div">
                    {offerInfo.location}
                  </Typography>
                </Grid>
                <Grid item >
                  <Typography variant="body1" component="div">
                    {offerInfo.email}Will add email
                  </Typography>
                </Grid>
                <Grid item >
                  <Typography variant="body1" component="div">
                    {offerInfo.start} {offerInfo.end}
                  </Typography>
                </Grid>
                </Grid>
              </Grid>
            </Paper>
            ))}
          </Box>
        </Box>
      </div>
    );
  }
}
export default Offers;
