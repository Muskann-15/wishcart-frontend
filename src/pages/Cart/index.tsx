import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Card, CardContent, CardMedia, Button, Divider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';
import { formatPrice } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import { AppLoader } from '../../components/Loader';
import styles from './cart.module.scss';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { removeItemFromCart } = useCart();
  const { user, loading, error, refreshUserDetails } = useUser();

  const cartItems = user?.cart || [];
  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const getItemName = (item: any) => item.name || '';
  const getItemImageUrl = (item: any) => item.imageUrl || '';

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await removeItemFromCart(productId);
      await refreshUserDetails();
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

          {cartItems.length === 0 ? (
            <Box className={styles.emptyCart}>
              <Typography variant="h6">Your cart is empty.</Typography>
              <Button variant="contained" color="primary" onClick={handleContinueShopping}>
                Continue Shopping
              </Button>
            </Box>
          ) : (
            <Box className={styles.cartContentWrapper}>
              <Box className={styles.productList}>
                {cartItems.filter((cart) => cart.quantity > 0).map(item => {
                  const name = getItemName(item);
                  const imageUrl = getItemImageUrl(item);
                  return (
                    <Card key={item.productId} className={styles.productCard}>
                      <CardMedia
                        component="img"
                        image={imageUrl}
                        alt={name}
                        className={styles.productImage}
                      />
                      <CardContent className={styles.productDetails}>
                        <Typography variant="h6" className={styles.productName}>
                          {name}
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
                  );
                })}
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