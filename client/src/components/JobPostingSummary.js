import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CardActionArea, Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
function stringToColor(string) {
  // assigns a color to the icon of a job posting card.
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  if (name.split(" ").length === 1) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name[0]}`,
    };
  } else {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
}
const handleClose = (event, reason) => {
  if (reason === "clickaway") {
    return;
  }
};

function JobPostingSummary(job_posting) {
  const [applied, setApplied] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false); //////////////
  const [openError, setOpenError] = React.useState(false); /////////////

  

  let title = job_posting.data.title;
  let company = job_posting.data.company;
  let description = job_posting.data.description;
  let requirements = job_posting.data.requirements;
  let benefits = job_posting.data.benefits;
  let salary = job_posting.data.salary;
  let id = job_posting.data._id;
  let location = job_posting.data.location;
  let Dday = job_posting.data.Dday;
  let Dmonth = job_posting.data.Dmonth;
  let Dyear = job_posting.data.Dyear;
  console.log("title" + title);
  let spacing = 2;

  return (
    <div>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: 1000,
          maxWidth: 1000,
          justifyContent: "center",
          flexGrow: 4,
          overflow: "hidden",
        }}
      >
        <CardActionArea href={"../JobPostingPage/" + id}>
          <CardContent>
            <Grid container wrap="nowrap" spacing={2} direction="row">
              <Grid item sx={2} paddingRight={2}>
                <Avatar {...stringAvatar(company)}></Avatar>
              </Grid>
              <Divider orientation="vertical" flexItem variant="middle" />
              <Grid item xs zeroMinWidth>
                <Grid
                  container
                  spacing={2}
                  justifyContent="left"
                  alignItem={"center"}
                  paddingTop={2}
                >
                  <Grid item sx="auto">
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ fontWeight: "bold" }}
                    >
                      {title}
                    </Typography>
                  </Grid>
                  <Grid item sx="auto">
                    <Divider variant="middle">
                      <Typography variant="h6">{"Description"}</Typography>
                    </Divider>
                    <Typography
                      gutterBottom
                      component={"div"}
                      variant="body"
                      textOverflow={"ellipsis"}
                      overflow={"hidden"}
                      display={"-webkit-box"}
                      WebkitLineClamp={3}
                      WebkitBoxOrient={"vertical"}
                      maxHeight={105}
                    >
                      {description}
                    </Typography>
                  </Grid>

                  <Grid item marginTop={"auto"} sx={4}>
                    <Divider variant="middle">
                      <Typography variant="h6" component="div">
                        {"Salary"}
                      </Typography>
                    </Divider>
                    <Typography
                      textOverflow={"ellipsis"}
                      gutterBottom
                      variant="body"
                      component="div"
                      minWidth= {250}
                    >
                      {salary}
                    </Typography>
                  </Grid>
                  <Grid item marginTop={"auto"} sx={4}>
                    <Divider variant="middle">
                      <Typography variant="h6" component="div">
                        {"Location"}
                      </Typography>
                    </Divider>
                    <Typography
                      textOverflow={"ellipsis"}
                      gutterBottom
                      variant="body"
                      component="div"
                      minWidth= {250}
                    >
                      {location}
                    </Typography>
                  </Grid>
                  <Grid item marginTop={"auto"} sx={4}>
                    <Divider variant="middle">
                      <Typography variant="h6" component="div">
                        {"Deadline : D/M/Y" }
                      </Typography>
                    </Divider>
                    <Typography
                      textOverflow={"ellipsis"}
                      gutterBottom
                      variant="body"
                      component="div"
                      minWidth= {250}
                    >
                      { Dmonth + "/" + Dday + "/" + Dyear}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>

      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Application Successful!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          You already Applied to this Job!
        </Alert>
      </Snackbar>
      <Box sx={{ pb: 5 }}></Box>
    </div>
  );
}

export default JobPostingSummary;
