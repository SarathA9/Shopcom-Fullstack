import * as React from "react";
import { useState, useEffect } from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import axios from 'axios';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ElectronicsIcon from '@mui/icons-material/Devices';
import BeautyIcon from '@mui/icons-material/Face';
import FurnitureIcon from '@mui/icons-material/Chair';
import FashionIcon from '@mui/icons-material/Checkroom';
import BooksIcon from '@mui/icons-material/MenuBook';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import Logo from "./assets/logo2.png";
import BGVideo1 from './assets/BGVideo4.mp4';
import BGVideo2 from './assets/shopping-girl.mp4';
import BGVideo3 from './assets/girl2.mp4';
import Products from './AllProducts';
import InputLabel from '@mui/material/InputLabel';

const pages = [
  { title: "Home", path: "/" },
  { title: "Login", path: "/", onClick: () => window.location.reload() },
  { title: "Seller", path: "/SellerForm" },
  { title: "Category", path: "/Category" },
];

const videos = [BGVideo1, BGVideo2, BGVideo3];

const categories = [
  { name: "Electronics", path: "/Products/mobile-accessories", icon: <ElectronicsIcon /> },
  { name: "Beauty", path: "/Products/beauty", icon: <BeautyIcon /> },
  { name: "Furniture", path: "/Products/furniture", icon: <FurnitureIcon /> },
  { name: "Fashion", path: "/Products/mens-shoes", icon: <FashionIcon /> },
  { name: "Books", path: "/Products/books", icon: <BooksIcon /> },
  { name: "Electronics", path: "/Products/mobile-accessories", icon: <ElectronicsIcon /> },


];

const LandingPage = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
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
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 2800);

    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    return () => clearInterval(interval);
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
  console.log('Form Data:', formData); // Log formData to inspect its structure
  try {
    const response = await axios.post('http://localhost:5000/api/editProfile/editProfile', formData);
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
      <Divider />
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
    <Box sx={{ flexGrow: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" 
        sx={{
          bgcolor: 'rgba(255,255,255)',
          color: 'black',
          boxShadow: 'none',
          display: 'flex',
        }}>
        <Container maxWidth="xl">  
          <Toolbar disableGutters>
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <img src={Logo} alt="Logo" style={{ height: "80px", width: "auto" }}  />
            </Box>
            
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#333', borderRadius: '4px 0 0 4px', p: 1 }}>
                <SearchIcon sx={{ color: '#fff', fontSize: '.7rem' }} />
                <Typography sx={{ color: '#fff', ml: 1, fontSize: '.7rem' }}>Search</Typography>
              </Box>
              <InputBase
                placeholder="What are you looking for?"
                sx={{
                  ml: 0,
                  fontSize: '.72rem',
                  flex: 1,
                  bgcolor: '#fff',
                  color: 'black',
                  p: 1,
                  borderRadius: '0 4px 4px 0',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  maxWidth: 220,
                  '& .MuiInputBase-input': {
                    pl: 1,
                    width: '100%',
                    boxSizing: 'border-box', 
                  },
                }}
              />
            </Box>
            
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
                  <Typography variant="subtitle1" sx={{ ml: 1,fontFamily:'serif',fontStyle:'normal' }}>
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
          </Toolbar>
        </Container>
      </AppBar>

      {/* User Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {user ? (
          <>
            <MenuItem onClick={handleOpenDialog}>Edit Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </>
        ) : (
          <MenuItem onClick={() => {/* Implement login logic */}}>Login</MenuItem>
        )}
      </Menu>

      {/* User Profile Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={userDetails.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={userDetails.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="phone_number"
            label="Phone Number"
            type="text"
            fullWidth
            value={userDetails.phone_number}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="date_of_birth"
            label="Date of Birth"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={userDetails.date_of_birth}
            onChange={handleInputChange}
          />
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
          margin="dense"
          name="gender"

          label="Gender"
          fullWidth
          value={userDetails.gender}
          onChange={handleInputChange}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
        </Select>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdateProfile}>Save</Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
        <Box sx={{ position: 'relative', width: '90%', maxWidth: '1200px', height: {
                  xs: '250px', 
                  sm: '300px', 
                  md: '400px', 
                } }}>
          {videos.map((video, index) => (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: {
                  xs: '250px', 
                  sm: '300px', 
                  md: '400px', 
                },
                opacity: index === currentVideo ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
                overflow: 'hidden',
                borderRadius:'10px',
                boxShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                }}
              />
            </Box>
          ))}

          <Box
            sx={{
              position: 'absolute',
              bottom: -30,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 2,
            }}
          >
            {videos.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width:{
                    xs: 8, 
                    sm: 12, 
                    md: 12, 
                  },
                  height:{
                    xs: 8, 
                    sm: 12, 
                    md: 12, 
                  },
                  borderRadius: '50%',
                  backgroundColor: index === currentVideo ? 'black' : 'rgba(0, 0, 0, 0.5)',
                  cursor: 'pointer',
                }}
                onClick={() => setCurrentVideo(index)}
              />
            ))}
          </Box>
        </Box>

        <Typography variant="h4" sx={{ mt: 6, mb: 3, fontFamily: 'Rajdhani', fontWeight: 'bold',fontSize:{xs: '1.5rem',sm:'2rem',md:'2.2rem'},marginTop:'80px' }}>
          Top Categories
        </Typography>

        <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: '1200px', width: '90%' }}>
        {categories.map((category, index) => (
        <Grid item key={index} xs={6} sm={4} md={2}>
          <Link to={category.path} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <IconButton sx={{ bgcolor: '#f0f0f0', mb: 1 }}>
                {category.icon}
              </IconButton>
              <Typography variant="subtitle1" sx={{ fontFamily: 'Rajdhani' }}>
                {category.name}
              </Typography>
            </Box>
          </Link>
        </Grid>
      ))}
        </Grid>
      </Box>  
      <Products/>
    </Box>
  );
};

export default LandingPage;