import React, { useEffect, useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Button,
  Box,
  styled,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CardMedia from "@mui/material/CardMedia";

import axios from 'axios';

const StyledAvatar = styled('img')(({ theme }) => ({
  width: theme.spacing(7),
  height: theme.spacing(7),
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

const StyledCardMedia = styled(CardMedia)({
  height: 80,
  width: '30%',
  objectFit: 'contain',
  transition: 'height 0.2s',
});

function Cart({ user, open, onClose, cart, setCart }) {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cart/${user.id}`);
        const cartData = response.data.reduce((acc, item) => {
          acc[item.product_id] = item;
          return acc;
        }, {});
        setCart(cartData);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    if (user && user.id) {
      fetchCart();
    }
  }, [user, setCart]);

  const removeFromCart = async (productId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[productId];
      return newCart;
    });
    try {
      await axios.post('http://localhost:5000/api/cart/remove', {
        userId: user.id,
        productId,
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const updateQuantity = async (productId, change) => {
    const newQuantity = cart[productId].quantity + change;

    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart((prevCart) => {
        const newCart = { ...prevCart };
        newCart[productId].quantity = newQuantity;
        return newCart;
      });

      try {
        await axios.post('http://localhost:5000/api/cart/update', {
          userId: user.id,
          productId,
          quantity: newQuantity,
        });
      } catch (error) {
        console.error('Error updating item quantity:', error);
      }
    }
  };

  const total = Object.values(cart).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 300, p: 2 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            textAlign: "center",
            textTransform: "uppercase",
            fontFamily: "inherit",
            color: "dark",
          }}
        >
          Your Cart <ShoppingCartIcon sx={{ fontSize: "1.2rem", color: "#d79028", opacity: ".9" }} />
        </Typography>
        <List>
          {Object.values(cart).map((item) => (
            <ListItem key={item.product_id} divider>
              <StyledCardMedia
                      component="img"
                      alt={item.product_name}
                      src={item.img_url.startsWith('http') ? item.img_url : require(`${item.img_url}`)}
                    />
              <ListItemText
                primary={item.product_name}
                secondary={`₹${item.price} x ${item.quantity}`}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={() => updateQuantity(item.product_id, -1)}>
                  <RemoveIcon />
                </IconButton>
                <IconButton onClick={() => updateQuantity(item.product_id, 1)}>  
                  <AddIcon />
                </IconButton>
                <IconButton onClick={() => removeFromCart(item.product_id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" align="right" sx={{ mt: 2 }}>
          Total: ₹{total.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => {
            navigate('/checkout');
          }}
        >
          Checkout
        </Button>
      </Box>
    </Drawer>
  );
}

export default Cart;
