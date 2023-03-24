import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
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


function JobPostingSummary(job_posting) {

  

  let title = job_posting.data.title;
  let company = job_posting.data.company;
  let description = job_posting.data.description;
  let salary = job_posting.data.salary;
  let id = job_posting.data._id;
  let location = job_posting.data.location;
  let Dday = job_posting.data.Dday;
  let Dmonth = job_posting.data.Dmonth;
  let Dyear = job_posting.data.Dyear;
  console.log("title" + title);

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
    </div>
  );
}

export default JobPostingSummary;
