import * as React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import HelpIcon from "@mui/icons-material/Help";
import ArticleIcon from "@mui/icons-material/Article";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AxiosInstance from "./AxiosInstance";
import "../Navbar.css"; // Import CSS file

export default function Navbar({ content }) {
  const location = useLocation();
  const navigate = useNavigate();

  const logoutUser = () => {
    AxiosInstance.post("logoutall/", {}).then(() => {
      localStorage.removeItem("Token");
      navigate("/");
    });
  };

  return (
    <Box className="navbar">
      <AppBar position="static">
        <Toolbar className="navbar-toolbar">
          <Typography variant="h6" className="navbar-title">
            My App
          </Typography>
          <Button
            component={Link}
            to="/home"
            startIcon={<HomeIcon />}
            className={`navbar-button ${location.pathname === "/home" ? "active" : ""}`}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/about"
            startIcon={<InfoIcon />}
            className={`navbar-button ${location.pathname === "/about" ? "active" : ""}`}
          >
            About
          </Button>
          <Button
            component={Link}
            to="/posts"
            startIcon={<ArticleIcon />}
            className={`navbar-button ${location.pathname === "/posts" ? "active" : ""}`}
          >
            Posts
          </Button>
          <Button
            component={Link}
            to="/support"
            startIcon={<HelpIcon />}
            className={`navbar-button ${location.pathname === "/support" ? "active" : ""}`}
          >
            Support
          </Button>
          <Button onClick={logoutUser} startIcon={<LogoutIcon />} className="navbar-button">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>{content}</Box>
    </Box>
  );
}
