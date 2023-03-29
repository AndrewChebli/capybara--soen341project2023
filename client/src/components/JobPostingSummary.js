import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import FlagIcon from "@mui/icons-material/Flag";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Chip from "@mui/material/Chip";
import PaidIcon from '@mui/icons-material/Paid';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import WorkIcon from '@mui/icons-material/Work';
import AccessTimeIcon from '@mui/icons-material/AccessTime';




function JobPostingSummary(props) {
  const { data, handleLinkChange } = props;
  let title = data.title;
  let company = data.company;
  let description = data.description;
  let salary = data.salary;
  let id = data._id;
  let location = data.location;
  let deadline = data.deadline;
  let type = data.type;
let remote = data.remote;
  function changeLink()
  {
    console.log("handleLinkChange" + id)
    handleLinkChange(id);
  }

  return (
    <div>
      <Card
        sx={{
          minWidth: "95%",
          maxWidth: "95%",
          borderRadius: 5,
          boxShadow: 5,
          m: 1,
        }}
      >
        <CardActionArea  onClick = { changeLink}>
          <CardContent>
            <Grid container wrap="nowrap" spacing={2} direction="column">
              <Grid
                item
                container
                justifyContent="center"
                alignItems="flex-start"
                direction="column"
              >
                <Grid
                  item
                  container
                  justifyContent="flex-start"
                  paddingTop={2}
                  alignItems="flex-start"
                  direction="row"
                  spacing = {0.3}
                >
                  <Grid item xs={10} >
                    <Typography variant="h5" sx={{ fontWeight: "bold", textAlign : "left" }}>
                      {title}
                    </Typography>
                    <Typography  sx={{ textAlign : "left" }}>
                      {company}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} >
                    <BookmarkAddIcon />
                    <FlagIcon />
                  </Grid>
                  <Grid item xs="auto">
                    <Chip
                      icon={<LocationOnIcon fontSize="small" />}
                      label={location}
                    />
                  </Grid>
                  <Grid item xs="auto">
                    <Chip
                      icon={<PaidIcon fontSize="small" />}
                      label={salary}
                    />
                  </Grid>
                  <Grid item xs="auto">
                    <Chip
                      icon={<EmojiTransportationIcon fontSize="small" />}
                      label={remote}
                    />
                  </Grid>
                  <Grid item xs="auto">
                    <Chip
                      icon={<AccessTimeIcon fontSize="small" />}
                      label={type}
                    />
                  </Grid>
                </Grid>
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
                  maxHeight={105}
                  backgroundColor={"#f5f5f5"}
                  borderRadius={2}
                >
                  {description}
                </Typography>
                <Grid item marginTop={"auto"} sx={4}>
                  <Typography
                    textOverflow={"ellipsis"}
                    gutterBottom
                    variant="body"
                    component="div"
                    minWidth={250}
                  >
                    Deadline : {deadline}
                  </Typography>
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
