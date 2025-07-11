import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';
import { AppLoader } from '../../components';
import { formatPrice } from '../../utils/formatters';
import { fetchCart, removeFromCart } from '../../redux/cartData/cartApi';
import type { RootState, AppDispatch } from '../../config/store';
import { createRazorpayOrder } from '../../services/paymentService';
import { PAYMENT_FAILED_URL, PAYMENT_SUCCESS_URL } from '../../constants/routes';
import { API_BASE_URL } from '../../constants/api';
import styles from './cart.module.scss';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items: cartItems, loading, error } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await dispatch(removeFromCart(productId));
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      const res = await createRazorpayOrder(totalPrice);
      const order = res.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: order.currency,
        name: 'Wishcart',
        description: 'Payment for cart items',
        order_id: order.id,
        handler: async function (response: any) {
          localStorage.setItem('paymentSuccess', JSON.stringify({
            total: order.amount / 100,
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            paidAt: new Date().toISOString()
          }));

          const verifyRes = await fetch(`${API_BASE_URL}/payment/razorpay/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });

          const data = await verifyRes.json();
          if (data.success) {
            navigate(PAYMENT_SUCCESS_URL);
          } else {
            navigate(
              `${PAYMENT_FAILED_URL}?amount=${order.amount}&date=${encodeURIComponent(new Date().toISOString())}`
            );
          }
        },
        prefill: {
          name: 'Test User',
          email: 'test@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#528FF0',
        },
      };

      const rzp = new (window as any).Razorpay(options);

      rzp.open();
    } catch (err) {
      console.error('Checkout Error:', err);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  if (loading) return <AppLoader />;

  if (error) {
    return (
      <Box>
        <Container maxWidth="md" className={styles.cartContainer}>
          <Typography variant="h6" color="error">
            Error: {error}
          </Typography>
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
                {cartItems
                  .filter((item) => item.quantity > 0)
                  .map((item) => (
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
                <Button
                  variant="contained"
                  color="primary"
                  className={styles.checkoutButton}
                  onClick={handleCheckout}
                >
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
