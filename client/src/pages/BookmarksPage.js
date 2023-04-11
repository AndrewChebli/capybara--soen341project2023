import { Box } from "@mui/system";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Backdrop from "@mui/material/Backdrop";
import Slide from "@mui/material/Slide";
import JobPostingDetail from "../components/JobPostingDetail";

function BookmarksPage() {
  const [bookmarks, setBookmarks] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = (index) => {
    setId(bookmarks[index].id);
    setOpen(!open);
  };
  const handleDelete = async (index) => {
    let response_from_backend = await fetch(
      "http://localhost:8080/api/employee/bookmarks/" +
        localStorage.getItem("_id"),
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          index: index,
        }),
      }
    );

    console.log(response_from_backend)
    if(response_from_backend.status === 200){
      window.location.reload();
    }
  };

  React.useEffect(() => {
    async function getBookmarks() {
      let response_from_backend = await fetch(
        "http://localhost:8080/api/employee/bookmarks/" +
          localStorage.getItem("_id"),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response_from_backend.json();
      if (response_from_backend.status === 200) {
        setBookmarks(data.bookmarks);
      } else {
        alert("Error");
      }
    }
    getBookmarks();
  }, []);

  return (
    <Box
      sx={{
        width: "80%",
        margin: "auto",
        marginTop: "150px",
        minHeight: "100vh",
      }}
    >
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          opacity: 2,
        }}
        open={open}
        onClick={handleClose}
        transitionDuration={1000}
      >
        <Box
          sx={{
            width: "80%",
          }}
        >
          <JobPostingDetail id={id} />
        </Box>
      </Backdrop>

      <h1>Bookmarks</h1>

      <Grid container spacing={2} direction="row" sx={{ mt: 5 }}>
        {bookmarks.map((bookmark, index) => (
          <Slide
            direction="up"
            in={true}
            timeout={index * 500 + 1000}
            mountOnEnter
            key={index}
          >
            <Grid item xs={4}>
              <Card>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {bookmark.company}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {bookmark.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {bookmark.jobType}
                  </Typography>
                  <Typography variant="body2">
                    {bookmark.jobDescription}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => handleToggle(index)} size="small">
                    View Job
                  </Button>
                  <Button
                    onClick={() => handleDelete(index)}
                    size="small"
                    color="error"
                  >
                    Delete Job
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Slide>
        ))}
      </Grid>
    </Box>
  );
}

export default BookmarksPage;
