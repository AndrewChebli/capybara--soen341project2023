import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";


let pages = ["Home", "Dashboard", "Offers","SignIn", "SignUp"];
let pages_names = ["Home", "Dashboard", "Bookmarks","Offers","Profile","EditProfile", "Logout"];
function HeaderBar() {
  

  if(localStorage.getItem("loginStatus") === "true"){
    if(localStorage.loginType === "employee"){
    pages = ["Home", "Dashboard", "Bookmarks","Offers","Profile","EditProfile", "Logout"];
    pages_names = ["Home", "Dashboard", "Bookmarks","Offers","Profile","Edit Profile", "Logout"];
    }else if (localStorage.loginType === "company"){
      pages = ["Home", "CompanyJobApplicants", "CreateJobPosting","ProfilePageEmployer","EditProfileEmployer", "Logout"];
      pages_names = ["Home", "Job Applicants", "Create Job Posting","Profile","Edit Profile", "Logout"];
    }else{
      pages = ["Home", "Dashboard", "Offers","SignIn", "SignUp"];
    }
  }else{
    pages = ["Home", "Dashboard", "Offers","SignIn", "SignUp"];
  }
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElNav(null);
  };

  const handleCloseNavMenu = (event) => {
  };

  const handleCloseUserMenu = (event) => {

    setAnchorElUser(null);
  };

  return (
    <AppBar position="absolute" style={{ marginTop: "10px", borderRadius:"25px", background: '#394727l', opacity: "1" , maxWidth: "80%", marginRight: "10%", alignContent: "center"}}>
      <Container maxWidth="xl">
        <Toolbar  variant= "dense">
          {/* JobHive Logo */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="HomePage"
            sx={{
              display: { xs: "none", md: "flex" },
              fontFamily: "Roboto",
              fontWeight: 900,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              mr: 5
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
          
          
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, alignItems: 'Center',justifyContent: 'Center' }}>
            
            {pages.map((page, index) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block", mr:3 }}
                href={ "../" + page+"Page"} //Page name MUST BE the same as page variable
              >
                {pages_names[index]}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
      </AppBar>
  );
}
export default HeaderBar;