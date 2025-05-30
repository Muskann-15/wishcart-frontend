import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import styles from './cart.module.scss';

const CartPage: React.FC = () => {
  const dummyCart = [
    { id: 1, name: 'Stylish Sneakers', price: 999, quantity: 2 },
    { id: 2, name: 'Smart Watch', price: 1999, quantity: 1 },
  ];

  const totalAmount = dummyCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleBuyNow = () => {
    alert('Purchase Successful!');
  };

  return (
    <Box className={styles.cartPage}>
      <Typography variant="h4" className={styles.heading}>
        Your Cart
      </Typography>
      <Box className={styles.cartItems}>
        {dummyCart.map(item => (
          <Box key={item.id} className={styles.cartItem}>
            <Typography className={styles.itemName}>{item.name}</Typography>
            <Typography className={styles.itemDetails}>
              ₹{item.price} x {item.quantity}
            </Typography>
          </Box>
        ))}
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box className={styles.summary}>
        <Typography variant="h6">Total: ₹{totalAmount}</Typography>
        <Button variant="contained" color="primary" onClick={handleBuyNow}>
          Buy Now
        </Button>
      </Box>
    </Box>
  );
};

export default CartPage;
