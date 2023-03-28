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
import PaidIcon from "@mui/icons-material/Paid";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import { Box } from "@mui/system";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

function JobPostingSummary(props) {
  const { data, handleLinkChange } = props;
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [reportReason, setReportReason] = React.useState("");
  const [reportMessage, setReportMessage] = React.useState("");
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
  const handleReportClick = (e) => {
  e.stopPropagation();
  if (reportReason) {
    toast.error('You have already reported this Item');
    return;
  }
  if (data.reported) {
    toast.warning('You have already reported this job posting.');
    return;
  }
  setIsModalOpen(true);
};

  const handleReportReasonChange = (event) => {
    setReportReason(event.target.value);
  };
  
  const handleReportMessageChange = (event) => {
    setReportMessage(event.target.value);
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!reportReason || !reportMessage) {
      toast.error('Please enter both reason and message.');
      return;
    }
    console.log("Report: ", reportMessage);
    console.log("Reason: ", reportReason);
    
    // TODO: submit report
    setIsModalOpen(false);
  };


  const handleCancelClick = () => {
    setReportReason("");
    setIsModalOpen(false);
  };

  return (
    <div>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: 450,
          maxWidth: 450,
          justifyContent: "center",
          overflow: "hidden",
          borderRadius: 5,
          boxShadow: 5,
          m: 1,
        }}
      >
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          aria-labelledby="report-modal-title"
          aria-describedby="report-modal-description"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
            }}
          >
            <Box sx={{ width: 400, bgcolor: "white", p: 2 }}>
              <Typography
                variant="h6"
                component="h2"
                id="report-modal-title"
                sx={{ mb: 2 }}
              >
                Report Job Posting
              </Typography>
              <form onSubmit={handleReportSubmit}>
                <TextField
                  id="report-modal-reason"
                  label="Reason for reporting"
                  fullWidth
                  value={reportReason}
                  onChange={handleReportReasonChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  id="report-modal-message"
                  label=" Message"
                  fullWidth
                  value={reportMessage}
                  onChange={handleReportMessageChange}
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" type="submit" sx={{ mr: 1 }}>
                  Submit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleCancelClick}
                >
                  Cancel
                </Button>
              </form>
            </Box>
          </Box>
        </Modal>

        <CardActionArea onClick={changeLink}>
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
                  spacing={0.3}
                >
                  <Grid item xs={10}>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bold", textAlign: "left" }}
                    >
                      {title}
                    </Typography>
                    <Typography sx={{ textAlign: "left" }}>
                      {company}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Button>
                      <BookmarkAddIcon />
                    </Button>
                    <Button onClick={handleReportClick}>
                      <FlagIcon color={reportReason ? "error" : "disabled"} />
                    </Button>
                  </Grid>
                  <Grid item xs="auto">
                    <Chip
                      icon={<LocationOnIcon fontSize="small" />}
                      label={location}
                    />
                  </Grid>
                  <Grid item xs="auto">
                    <Chip icon={<PaidIcon fontSize="small" />} label={salary} />
                  </Grid>
                  <Grid item xs="auto">
                    <Chip
                      icon={<EmojiTransportationIcon fontSize="small" />}
                      label={remote}
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
