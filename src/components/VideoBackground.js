import * as React from "react";
import { useState, useEffect } from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
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
import Logo from "./assets/logo.png";
import BGVideo1 from './assets/BGVideo4.mp4';
import BGVideo2 from './assets/shopping-girl.mp4';
import BGVideo3 from './assets/card.mp4';
import Products from './AllProducts'

const pages = [
  { title: "Home", path: "/" },
  { title: "login", path: "/login" },
  { title: "seller", path: "/seller" },
  { title: "Category", path: "/Category" },
];

const videos = [BGVideo1, BGVideo2, BGVideo3];

const categories = [
  { name: "Electronics", icon: <ElectronicsIcon /> },
  { name: "Beauty", icon: <BeautyIcon /> },
  { name: "Furniture", icon: <FurnitureIcon /> },
  { name: "Fashion", icon: <FashionIcon /> },
  { name: "Books", icon: <BooksIcon /> },
];

const LandingPage = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
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
      <AppBar position="static" sx={{ bgcolor: 'rgba(255,255,255)', color:'black', boxShadow: 'none',display:'flex',justifyContent:'space-around' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <img src={Logo} alt="Logo" style={{ height: "80px", width: "auto" }} />
            </Box>
            
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#333', borderRadius: '4px 0 0 4px', p: 1 }}>
                <SearchIcon sx={{ color: '#fff' }} />
                <Typography sx={{ color: '#fff', ml: 1 }}>Search</Typography>
              </Box>
              <InputBase
                placeholder="What are you looking for?"
                sx={{
                  ml: 0,
                  flex: 1,
                  bgcolor: '#fff',
                  color: 'black',
                  p: 1,
                  borderRadius: '0 4px 4px 0',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Adding a shadow effect
                  maxWidth: 300, // Limiting maximum width of the box
                  '& .MuiInputBase-input': {
                    pl: 1, // Left padding for the input text
                    width: '100%', // Ensures the input takes full width within the box
                    boxSizing: 'border-box', // Ensures padding is included in the width
                  },
                }}
              />
            </Box>
            
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link key={page?.title} to={page?.path} style={{ textDecoration: "none" }}>
                  <Button
                    onClick={toggleDrawer(false)}
                    sx={{ 
                      my: 2, 
                      color: "black", 
                      display: "block",
                      fontSize:'1rem', 
                      fontWeight:"400",
                      fontFamily: "Rajdhani",
                    }}
                  >
                    {page?.title}
                  </Button>
                </Link>
              ))}
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

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
        <Box sx={{ position: 'relative', width: '90%', maxWidth: '1200px', height: '400px' }}>
          {videos.map((video, index) => (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: index === currentVideo ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
                overflow: 'hidden',
                borderRadius:'5px'
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
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: index === currentVideo ? 'black' : 'rgba(0, 0, 0, 0.5)',
                  cursor: 'pointer',
                }}
                onClick={() => setCurrentVideo(index)}
              />
            ))}
          </Box>
        </Box>

        <Typography variant="h4" sx={{ mt: 6, mb: 3, fontFamily: 'Rajdhani', fontWeight: 'bold' }}>
          Top Categories
        </Typography>

        <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: '1200px', width: '90%' }}>
          {categories.map((category, index) => (
            <Grid item key={index} xs={6} sm={4} md={2}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <IconButton sx={{ bgcolor: '#f0f0f0', mb: 1 }}>
                  {category.icon}
                </IconButton>
                <Typography variant="subtitle1" sx={{ fontFamily: 'Rajdhani' }}>
                  {category.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Products/>
    </Box>
  );
};

export default LandingPage;