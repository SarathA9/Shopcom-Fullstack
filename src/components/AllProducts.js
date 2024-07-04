import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Box, TextField, Container, IconButton, Badge } from "@mui/material";
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Cart from "./Cart";

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
  const [products, setProducts] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Fetch products
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data); 
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
  }, []);

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
      // Update local state
      setCart((prevCart) => {
        const newCart = { ...prevCart };
        if (newCart[product.product_id]) {
          newCart[product.product_id].quantity += 1;
        } else {
          newCart[product.product_id] = { ...product, quantity: 1 };
        }
        return newCart;
      });

      // Send update to backend
      const response = await axios.post('http://localhost:5000/api/cart/update', {
        userId: user.id,
        productId: product.product_id,
        quantity: cart[product.product_id] ? cart[product.product_id].quantity + 1 : 1
      });

      console.log('Cart updated in database:', response.data);
    } catch (error) {
      console.error('Error updating cart in database:', error);
      // Optionally revert the local cart state here if the database update fails
    }
  };

  const handleToggleWishlist = async (product) => {
    if (!user) {
      alert('Please log in to add items to your wishlist.');
      return;
    }

    try {
      if (wishlist.includes(product.product_id)) {
        // Remove from wishlist
        const response = await axios.delete(`http://localhost:5000/api/wishlist/${user.id}/${product.product_id}`);
        console.log('Product removed from wishlist:', response.data);
        setWishlist(wishlist.filter(item => item !== product.product_id));
      } else {
        // Add to wishlist
        const response = await axios.post('http://localhost:5000/api/wishlist/add', {
          userId: user.id,
          productId: product.product_id,
        });
        console.log('Product added to wishlist:', response.data);
        setWishlist([...wishlist, product.product_id]);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
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
    if (isXs) return 6;
    if (isSm) return 4;
    if (isMd) return 3;
    return 2.4;
  };

  const isWishlist = (productId) => {
    return wishlist.includes(productId);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <TextField
            onChange={handleChange}
            label="Search products here"
            variant="outlined"
            sx={{ width: { xs: '70%', sm: '50%', md: '30%' } }}
          />
          <IconButton onClick={toggleCart}>
            <Badge badgeContent={Object.keys(cart).length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
        {user && (
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Welcome, {user.name}!
          </Typography>
        )}
        <Grid container spacing={3} justifyContent="center">
          {products
            .filter((value) => value.product_name.toLowerCase().includes(search))
            .map((item) => (
              <Grid item xs={getGridColumns()} key={item.product_id}>
                <StyledCard>
                  {expanded !== item.product_id && (
                    <StyledCardMedia
                      component="img"
                      alt={item.product_name}
                      src={item.img_url.startsWith('http') ? item.img_url : require(`${item.img_url}`)}
                    />
                  )}
                  <StyledCardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ fontSize: getFontSize(16) }}
                    >
                      {item.product_name}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: getFontSize(14) }}
                    >
                      {item.category}
                    </Typography>
                    {expanded !== item.product_id && (
                      <Typography
                        variant="h5"
                        sx={{ fontSize: getFontSize(16) }}
                      >
                        ${item.price}
                      </Typography>
                    )}
                    {expanded === item.product_id && (
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
                      onClick={() => handleExpandClick(item.product_id)}
                    >
                      {expanded === item.product_id ? "Show Less" : "Show More"}
                    </Button>
                    <IconButton
                      color={isWishlist(item.product_id) ? "secondary" : "default"}
                      size="small"
                      onClick={() => handleToggleWishlist(item)}
                    >
                      {isWishlist(item.product_id) ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <IconButton
                      color=""
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
          user={user}
        />
      </Container>
    </ThemeProvider>
  );
}

export default AllProducts;
