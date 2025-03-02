import * as React from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import HelpIcon from "@mui/icons-material/Help";
import ArticleIcon from "@mui/icons-material/Article";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AxiosInstance from "./AxiosInstance";
import Search from "./Search";  // Importing the Search component
import "../Navbar.css";

export default function Navbar({ content }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  // Handle responsive design
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = () => {
    AxiosInstance.post("logoutall/", {}).then(() => {
      localStorage.removeItem("Token");
      navigate("/");
    });
    handleClose();
  };

  const navItems = [
    { text: "Home", path: "/home", icon: <HomeIcon /> },
    { text: "Posts", path: "/posts", icon: <ArticleIcon /> },
    { text: "Support", path: "/support", icon: <HelpIcon /> }
  ];

  return (
    <Box className="navbar" sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <AppBar position="fixed">
        <Toolbar className="navbar-toolbar">
          <Typography variant="h6" className="navbar-title">
            GLOWLY
          </Typography>

          {/* Add Search Bar */}
          <Box sx={{ flexGrow: 1, mx: 3, display: "flex", justifyContent: "center" }}>
            <Search /> {/* Inserted Search component */}
          </Box>

          {isMobile ? (
            <Box>
              <IconButton
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
                edge="end"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {navItems.map((item) => (
                  <MenuItem 
                    key={item.path} 
                    component={Link} 
                    to={item.path}
                    onClick={handleClose}
                    selected={location.pathname === item.path}
                  >
                    {item.icon} <span style={{ marginLeft: 8 }}>{item.text}</span>
                  </MenuItem>
                ))}
                <MenuItem onClick={logoutUser}>
                  <LogoutIcon /> <span style={{ marginLeft: 8 }}>Logout</span>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 1 }} className="nav-buttons-container">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                  className={`navbar-button ${location.pathname === item.path ? "active" : ""}`}
                >
                  {item.text}
                </Button>
              ))}
              <Button onClick={logoutUser} startIcon={<LogoutIcon />} className="navbar-button">
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3, mt: 8 }}>{content}</Box>
    </Box>
  );
}
