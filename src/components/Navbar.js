import * as React from "react";
import { useState, useEffect } from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import Logo from "./assets/logo2.png";
import axios from "axios";

const pages = [
  { title: "Home", path: "/" },
  { title: "Login", path: "/", onClick: () => window.location.reload() },
  { title: "Seller", path: "/SellerForm" },
  { title: "Category", path: "/Category" },
];

const LandingPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone_number: '',
    date_of_birth: '',
    gender: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    handleClose();
    setUserDetails(user);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/editProfile', formData);
      console.log('Profile update response:', response.data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
      alert('Error updating profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    handleClose();
  };

  const drawerList = (
    <Box
      sx={{ width: 250, fontFamily: "Rajdhani" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {pages.map((page) => (
          <ListItem button key={page.title} component={Link} to={page.path}>
            <ListItemText primary={page.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" 
        sx={{
          bgcolor: 'rgba(255,255,255)',
          color: 'black',
          boxShadow: 'none',
          display: 'flex',
        }}>
        <Toolbar disableGutters>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={Logo} alt="Logo" style={{ height: "80px", width: "auto" }} />
          </Box>

          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: 'center' }}>
              {pages.map((page) => (
                <Link key={page.title} to={page.path} style={{ textDecoration: "none" }}>
                  <Button
                    onClick={page.onClick}
                    sx={{ 
                      my: 2, 
                      color: "black", 
                      display: "block",
                      fontSize: '1rem', 
                      fontWeight: "400",
                      fontFamily: "Rajdhani",
                    }}
                  >
                    {page.title}
                  </Button>
                </Link>
              ))}
              {user ? (
                <>
                  <IconButton onClick={handleProfileClick}>
                    <AccountCircleIcon />
                  </IconButton>
                  <Typography variant="subtitle1" sx={{ ml: 1, fontFamily:'serif', fontStyle:'normal' }}>
                    {user.name}
                  </Typography>
                </>
              ) : (
                <AccountCircleIcon />
              )}
            </Box>

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                {drawerList}
              </Drawer>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default LandingPage;
