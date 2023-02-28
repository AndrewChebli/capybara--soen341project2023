import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";

function LogoutPage() {
  const [query, setQuery] = React.useState("idle");
  const timerRef = React.useRef();

  timerRef.current = window.setTimeout(() => {}, 2000);

  React.useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    []
  );

  const handleClickQuery = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (query !== "idle") {
      setQuery("idle");
      return;
    }

    setQuery("progress");
    timerRef.current = window.setTimeout(() => {
      setQuery("success");
    }, 2000);
  };
  if (query === "success") {
    localStorage.setItem("loginStatus", "out");
    window.location.href = "/Home";
  }
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box sx={{ height: 40 }}>
        {query === "success" ? (
          <Typography component="h1" variant="h5" >Success!</Typography>
        ) : (
          <Fade
            in={query === "progress"}
            style={{
              transitionDelay: query === "progress" ? "800ms" : "0ms",
            }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
        )}
      </Box >
      <Button
        onClick={handleClickQuery}
        variant="contained"
        component="h1"
        minWidth="100px"
        minHeight="200px"

        sx={{ mt: 3, mb: 2, alignContent: "center" }}
      >
        {query !== "idle" ? "Logout" : "Logout"}
      </Button>
    </Box>
  );
}

export default LogoutPage;
