import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Box, TextField, Container } from "@mui/material";
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const StyledCard = styled(Card)({
  height: 350,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  },
});

const StyledCardMedia = styled(CardMedia)({
  height: 150,
  width: '100%',
  objectFit: 'contain',
  backgroundColor: '#f5f5f5',
  transition: 'height 0.2s',
});

const StyledCardContent = styled(CardContent)({
  textAlign: 'left',
  overflow: 'auto',
  flexGrow: 1,
});

const StyledCardActions = styled(CardActions)({
  display: 'flex',
  justifyContent: 'space-between',
});

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

function AllProducts() {
  const [categories, setCategories] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setCategories(res.data.products); 
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleExpandClick = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));

  const getFontSize = (size) => {
    if (isXs) return size - 2;
    if (isSm) return size - 1;
    if (isMd) return size;
    if (isLg) return size + 1;
    return size;
  };

  const getGridColumns = () => {
    if (isXs) return 6; // 2 products per row
    if (isSm) return 4; // 3 products per row
    if (isMd) return 3; // 4 products per row
    return 2.4; // 5 products per row for large screens
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
          <TextField
            onChange={handleChange}
            label="Search products here"
            variant="outlined"
            sx={{ width: { xs: '100%', sm: '50%', md: '30%' } }}
          />
        </Box>
        <Grid container spacing={3} justifyContent="center">
          {categories
            .filter((value) => value.title.toLowerCase().includes(search))
            .map((item) => (
              <Grid item xs={getGridColumns()} key={item.id}>
                <StyledCard>
                  {expanded !== item.id && (
                    <StyledCardMedia
                      component="img"
                      alt={item.title}
                      image={item.images[0]}
                    />
                  )}
                  <StyledCardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ fontSize: getFontSize(16) }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: getFontSize(14) }}
                    >
                      {item.category}
                    </Typography>
                    {expanded !== item.id && (
                      <Typography
                        variant="h5"
                        sx={{ fontSize: getFontSize(16) }}
                      >
                        ${item.price}
                      </Typography>
                    )}
                    {expanded === item.id && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: getFontSize(12) }}
                      >
                        {item.description}
                      </Typography>
                    )}
                  </StyledCardContent>
                  <StyledCardActions>
                    <Button
                      size="small"
                      onClick={() => handleExpandClick(item.id)}
                    >
                      {expanded === item.id ? "Show Less" : "Show More"}
                    </Button>
                  </StyledCardActions>
                </StyledCard>
              </Grid>
            ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default AllProducts;