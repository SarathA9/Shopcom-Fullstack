import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, TextField, Badge } from "@mui/material";
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Cart from "./Cart";
import Navbar from '../Navbar';

const StyledCard = styled(Card)({
  maxWidth: 250,
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

function Products() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/category/${categoryName}`)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });

    // Fetch user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchWishlist(JSON.parse(storedUser).id);
    }
  }, [categoryName]);

  const fetchWishlist = (userId) => {
    axios
      .get(`http://localhost:5000/api/wishlist/${userId}`)
      .then((res) => {
        setWishlist(res.data.map(item => item.product_id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleExpandClick = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleAddToCart = async (product) => {
    if (!user) {
      alert('Please log in to add items to your cart.');
      return;
    }

    try {
      setCart((prevCart) => {
        const newCart = { ...prevCart };
        if (newCart[product.id]) {
          newCart[product.id].quantity += 1;
        } else {
          newCart[product.id] = { ...product, quantity: 1 };
        }
        return newCart;
      });

      const response = await axios.post('http://localhost:5000/api/cart/update', {
        userId: user.id,
        productId: product.id,
        quantity: cart[product.id] ? cart[product.id].quantity + 1 : 1
      });

      console.log('Cart updated in database:', response.data);
    } catch (error) {
      console.error('Error updating cart in database:', error);
    }
  };

  const handleToggleWishlist = async (product) => {
    if (!user) {
      alert('Please log in to add items to your wishlist.');
      return;
    }

    try {
      if (wishlist.includes(product.id)) {
        const response = await axios.delete(`http://localhost:5000/api/wishlist/${user.id}/${product.id}`);
        console.log('Product removed from wishlist:', response.data);
        setWishlist(wishlist.filter(item => item !== product.id));
      } else {
        const response = await axios.post('http://localhost:5000/api/wishlist/add', {
          userId: user.id,
          productId: product.id,
        });
        console.log('Product added to wishlist:', response.data);
        setWishlist([...wishlist, product.id]);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const isMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLg = useMediaQuery(theme.breakpoints.up('md'));

  const getFontSize = (size) => {
    if (isXs) return size - 2;
    if (isSm) return size - 1;
    if (isMd) return size;
    if (isLg) return size + 1;
    return size;
  };

  const isWishlist = (productId) => {
    return wishlist.includes(productId);
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <div style={{ padding: 10 }}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            onChange={handleChange}
            label={"Search products here"}
            sx={{
              textTransform: "uppercase",
            }}
          />
          <IconButton onClick={toggleCart}>
            <Badge badgeContent={Object.keys(cart).length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {products
            .filter((value) => value.title.toLowerCase().includes(search))
            .map((item) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
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
                    <IconButton
                      color={isWishlist(item.id) ? "secondary" : "default"}
                      size="small"
                      onClick={() => handleToggleWishlist(item)}
                    >
                      {isWishlist(item.id) ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => handleAddToCart(item)}
                    >
                      <AddShoppingCartIcon />
                    </IconButton>
                  </StyledCardActions>
                </StyledCard>
              </Grid>
            ))}
        </Grid>
        <Cart 
          cart={cart} 
          open={cartOpen} 
          onClose={toggleCart} 
          setCart={setCart}
        />
      </div>
    </ThemeProvider>
  );
}

export default Products;
