import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
  ThemeProvider,
  createTheme,
  styled,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Logo from './assets/logo2.png';
import Navbar from './Navbar';

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
    fontFamily: "'Rajdhani', 'sans-serif'",
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  '& > svg': {
    marginRight: theme.spacing(1),
    color: "rgb(38, 181, 38)",
  },
}));

const mockUser = {
  id: 1,
  name: "Sarath A",
  email: "sarathofficial920@gmail.com"
};

const mockCart = {
  1: { product_id: 1, product_name: "Smartphone", price: 599.99, quantity: 1 },
  2: { product_id: 2, product_name: "Wireless Earbuds", price: 79.99, quantity: 2 },
  3: { product_id: 3, product_name: "Laptop", price: 999.99, quantity: 1 },
};

function Checkout() {
  const [shippingAddress, setShippingAddress] = useState('123 Main St, City, State, 12345');
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [validThrough, setValidThrough] = useState('');
  const [cvcCode, setCvcCode] = useState('');

  const handleAddressChange = (event) => {
    setShippingAddress(event.target.value);
  };

  const updateAddress = () => {
    alert('Address updated successfully');
  };

  const handlePurchase = () => {
    alert('Order placed successfully! Order ID: 12345');
  };

  const subtotal = Object.values(mockCart).reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10;
  const total = subtotal + shipping;

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h5" component="h3" sx={{opacity:".9"}}>CHECKOUT</Typography>
                <Box component="img" src={Logo} alt="Logo" sx={{ height: "auto", maxWidth: "100px", width: "auto" }} />
                </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <StyledPaper>
                <IconWrapper>
                  <LocalShippingIcon />
                  <Typography variant="h6">Shipping Details</Typography>
                </IconWrapper>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Shipping Address"
                  value={shippingAddress}
                  onChange={handleAddressChange}
                  margin="normal"
                  variant="outlined"
                />
                <StyledButton variant="outlined" onClick={updateAddress} sx={{borderBlockColor:"rgb(38, 181, 38)",color:"black"}}>
                  Update Address
                </StyledButton>
                <TextField
                  fullWidth
                  label="Email"
                  value={mockUser.email}
                  disabled
                  margin="normal"
                  variant="outlined"
                />
              </StyledPaper>
              <StyledPaper>
                <IconWrapper>
                  <CreditCardIcon />
                  <Typography variant="h6">Payment Details</Typography>
                </IconWrapper>
                <TextField
                  fullWidth
                  label="Name on Card"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  margin="normal"
                  variant="outlined"
                />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Valid Through"
                      value={validThrough}
                      onChange={(e) => setValidThrough(e.target.value)}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="CVC Code"
                      value={cvcCode}
                      onChange={(e) => setCvcCode(e.target.value)}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <StyledButton
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handlePurchase}
                  sx={
                    {
                        color:"white",
                        background:"rgb(38, 181, 38)"
                    }
                  }
                >
                  Complete Purchase
                </StyledButton>
              </StyledPaper>
            </Grid>
            <Grid item xs={12} md={5}>
              <StyledPaper>
                <IconWrapper>
                  <ShoppingCartIcon />
                  <Typography variant="h6">Your Order</Typography>
                </IconWrapper>
                <List>
                  {Object.values(mockCart).map((item) => (
                    <ListItem key={item.product_id} sx={{ py: 2 }}>
                      <ListItemText
                        primary={item.product_name}
                        secondary={`₹${item.price} x ${item.quantity}`}
                      />
                      <Typography variant="body1" fontWeight="bold">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography variant="body1">Subtotal</Typography>
                    <Typography variant="body1">Shipping</Typography>
                    <Typography variant="h6" sx={{ mt: 1 }}>Total</Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: 'right' }}>
                    <Typography variant="body1">₹{subtotal.toFixed(2)}</Typography>
                    <Typography variant="body1">₹{shipping.toFixed(2)}</Typography>
                    <Typography variant="h6" sx={{ mt: 1 }}>₹{total.toFixed(2)}</Typography>
                  </Grid>
                </Grid>
              </StyledPaper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Checkout;