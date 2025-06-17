import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Card, CardContent, CardMedia, Button, Divider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';
import { formatPrice } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { DummyProducts } from '../../constants/statistics';
import { AppLoader } from '../../components/Loader';
import styles from './cart.module.scss';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, loading, error, removeItemFromCart } = useCart();

  const cartItems = cart?.items || [];
  const displayCartItems = cartItems.length === 0 ? DummyProducts : cartItems;
  const totalItems = displayCartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = displayCartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await removeItemFromCart(productId);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (loading) {
    return ( <AppLoader />);
  }

  if (error) {
    return (
      <Box>
        <Container maxWidth="md" className={styles.cartContainer}>
          <Typography variant="h6" color="error">Error: {error}</Typography>
          <Button variant="contained" color="primary" onClick={handleContinueShopping}>
            Continue Shopping
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box>
      <motion.div
        variants={itemVariants}
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Container maxWidth="md" className={styles.cartContainer}>
          <Typography variant="h4" component="h1" className={styles.cartTitle}>
            Cart Summary
          </Typography>

          {displayCartItems.length === 0 ? (
            <Box className={styles.emptyCart}>
              <Typography variant="h6">Your cart is empty.</Typography>
              <Button variant="contained" color="primary" onClick={handleContinueShopping}>
                Continue Shopping
              </Button>
            </Box>
          ) : (
            <Box className={styles.cartContentWrapper}>
              <Box className={styles.productList}>
                {displayCartItems.map(item => (
                  <Card key={item.productId} className={styles.productCard}>
                    <CardMedia
                      component="img"
                      image={item.imageUrl}
                      alt={item.name}
                      className={styles.productImage}
                    />
                    <CardContent className={styles.productDetails}>
                      <Typography variant="h6" className={styles.productName}>
                        {item.name}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Price: {formatPrice(item.price)}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Quantity: {item.quantity}
                      </Typography>
                      <Typography variant="body1" className={styles.productSubtotal}>
                        Subtotal: {formatPrice(item.price * item.quantity)}
                      </Typography>
                      <IconButton
                        onClick={() => handleRemoveItem(item.productId)}
                        className={styles.removeButton}
                        aria-label="remove item"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardContent>
                  </Card>
                ))}
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box className={styles.cartSummary}>
                <Typography variant="h5" className={styles.summaryText}>
                  Total Items: {totalItems}
                </Typography>
                <Typography variant="h5" className={styles.summaryText}>
                  Total Price: {formatPrice(totalPrice)}
                </Typography>
                <Button variant="contained" color="primary" className={styles.checkoutButton} onClick={() => alert('Proceed to checkout!')}>
                  Proceed to Checkout
                </Button>
              </Box>
            </Box>
          )}
        </Container>
      </motion.div>
    </Box>
  );
};

export default CartPage; 