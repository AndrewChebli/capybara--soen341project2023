import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Badge } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { useEffect } from "react";
import Dashboard from "../pages/Dashboard";
import SignInPage from "../pages/SignInPageEmployee";
import SignUpPage from "../pages/SignUpPageEmployee";
import ProfilePage from "../pages/ProfilePage";
import EditProfilePage from "../pages/EditProfilePage";
import ProfilePageEmployer from "../pages/ProfilePageEmployer";
import EditProfilePageEmployer from "../pages/EditProfilePageEmployer";


let pages = ["Home", "Dashboard", "Offers", "About","SignIn", "SignUp","Profile","EditProfile", "ProfilePageEmployer", "EditProfileEmployer"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

let current_component = null;


function HeaderBar() {

  if(localStorage.getItem("loginStatus") === "true"){
    if(localStorage.loginType === "user"){
    pages = ["Home", "Dashboard", "Offers", "About","Profile","EditProfile", "Logout"];
    }else if (localStorage.loginType === "employer"){
      pages = ["Home", "Dashboard", "Applications", "About","ProfilePageEmployer","EditProfileEmployer"];
    }else{
      pages = ["Home", "Dashboard", "Offers", "About","SignIn", "SignUp"];
    }
  }else{
    pages = ["Home", "Dashboard", "Offers", "About","SignIn", "SignUp"];
  }
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [current_view, set_current_view] = React.useState("Home");



  useEffect(() => {
   
    console.log("HeaderBar: useEffect");

    if(current_view === "Home"){
      current_component =  <Dashboard/>;
    }else if(current_view === "Dashboard"){
      current_component =  <Dashboard />;
    }else if(current_view === "Offers"){
      current_component =  <Dashboard />;
    }else if(current_view === "About"){
      current_component =  <Dashboard />;
    }else if(current_view === "SignIn"){
      current_component =  <SignInPage />;
    }else if(current_view === "SignUp"){
      current_component =  <SignUpPage />;
    }
  }, [current_view]);
  console.log("current_view: ", current_view);
  const handleOpenNavMenu = (event) => {
  };
  const handleOpenUserMenu = (event) => {
  };

  const handleCloseNavMenu = (event) => {
    console.log(event.currentTarget.textContent);
    set_current_view(event.currentTarget.textContent);

    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JOB HIVE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JOB HIVE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
                to = {page}
                href = {page}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 20, display: { xs: "none", md: "flex" } }}>
            <Badge badgeContent={9} color="secondary">
              <MailIcon color="action" />
            </Badge>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
     
      </AppBar>
  );
}
export default HeaderBar;
