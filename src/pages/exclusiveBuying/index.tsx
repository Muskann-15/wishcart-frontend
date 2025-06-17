import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CardMedia, Button, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { fetchProductById } from '../../services/productService';
import type { Product } from '../../type/product';
import { addProductToWishlist, removeProductFromWishlist } from '../../services/wishlistService';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import { AppLoader } from '../../components/Loader';
import styles from './exclusiveBuying.module.scss';

const ExclusiveBuyingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cartActionError, setCartActionError] = useState<string | null>(null);
  const token = localStorage.getItem('jwtToken');

  const { addItemToCart, fetchCart, removeItemFromCart } = useCart();

  useEffect(() => {
    getProduct();
  }, [id]);

  const getProduct = async () => {
    if (!id) {
      setError('Product ID is missing');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetchProductById(id);
      setProduct(response.data);
    } catch (err: any) {
      console.error('Failed to fetch product:', err);
      setError('Failed to load product. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleWishlistClick = async (isChecked: boolean) => {
    if (!product) return;
    try {
      if (isChecked) {
        if (!token) {
          console.warn('Authentication token not found. Cannot add to wishlist.');
          return;
        }
        await addProductToWishlist({ productId: product.id, name: product.name, productType: 'exclusive' });
      } else {
        if (!token) {
          console.warn('Authentication token not found. Cannot remove from wishlist.');
          return;
        }
        await removeProductFromWishlist(product.id, 'exclusive');
      }
      setProduct(prevProduct => prevProduct ? { ...prevProduct, isWishlisted: isChecked } : null);
    } catch (error: any) {
      console.error('Wishlist operation failed:', error);
      setCartActionError(error.message || 'Failed to update wishlist.');
    }
  };

  const handleUpdateQuickBuyQuantity = async (change: number) => {
    if (!product) return;

    try {
      if (change > 0) {
        const response = await addItemToCart(product.id, 1, product.price);
        if (response && !response.success) {
          throw new Error(response.message || 'Failed to add item to cart.');
        }
      } else {
        const response = await removeItemFromCart(product.id);
        if (response && !response.success) {
          throw new Error(response.message || 'Failed to remove item from cart.');
        }
      }

      setProduct(prevProduct => {
        if (!prevProduct) return null;

        const currentQuantity = prevProduct.quickBuyQuantity || 0;
        const newQuantity = currentQuantity + change;

        if (newQuantity <= 0) {
          return { ...prevProduct, quickBuyQuantity: undefined };
        } else {
          return { ...prevProduct, quickBuyQuantity: newQuantity };
        }
      });

      await fetchCart();
      setCartActionError(null);
    } catch (err: any) {
      console.error('Failed to update cart:', err.message || err);
      setCartActionError(err.message || 'Failed to update cart.');
    }
  };

  const handleViewCartSummary = async () => {
    await fetchCart();
    navigate('/cart');
  };

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      console.log('Attempting to add item to cart:', { productId: product.id, price: product.price });
      const response = await addItemToCart(product.id, 1, product.price);
      if (response && !response.success) {
        throw new Error(response.message || 'Failed to add item to cart.');
      }
      setProduct(prevProduct => prevProduct ? { ...prevProduct, quickBuyQuantity: (prevProduct.quickBuyQuantity || 0) + 1 } : null);
      await fetchCart();
      setCartActionError(null);
    } catch (err: any) {
      console.error('Failed to add item to cart:', err.message || err);
      setCartActionError(err.message || 'Failed to add item to cart.');
    }
  };

  if (loading) {
    return (<AppLoader />);
  }

  if (error) {
    return (
      <Box className={styles.errorContainer}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box className={styles.noProductContainer}>
        <Typography variant="h6">Product not found.</Typography>
      </Box>
    );
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Box className={styles.exclusiveBuyingPage}>
      {cartActionError && <Alert severity="error" sx={{ mb: 2 }}>{cartActionError}</Alert>}
      <motion.div
        variants={itemVariants}
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card className={styles.productCard}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: '100%' }}>
            <Box sx={{ width: { xs: '100%', md: '50%' } }} className={styles.imageGridItem}>
              <CardMedia
                component="img"
                image={product.imageUrl}
                alt={product.name}
                className={styles.image}
              />
              <Box className={styles.imageOverlay} />
            </Box>
            <Box sx={{ width: { xs: '100%', md: '50%' } }} className={styles.detailsGridItem}>
              <CardContent className={styles.productDetails}>
                <Typography variant="h4" component="h1" className={styles.productName}>
                  {product.name}
                </Typography>
                <Typography variant="h6" className={styles.productPrice}>
                  {formatPrice(product.price)}
                </Typography>
                <Typography variant="body1" className={styles.productDescription}>
                  {product.description || 'No description available for this product.'}
                </Typography>

                <Box sx={{ marginTop: '25px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                  {product.quickBuyQuantity && product.quickBuyQuantity > 0 ? (
                    <Box className={styles.quantitySelector}>
                      <Button size="small" onClick={() => handleUpdateQuickBuyQuantity(-1)}>-</Button>
                      <Typography variant="body2" className={styles.quantityText}>{product.quickBuyQuantity}</Typography>
                      <Button size="small" onClick={() => handleUpdateQuickBuyQuantity(1)}>+</Button>
                    </Box>
                  ) : (
                    <Button
                      variant="contained"
                      className={styles.addToCartButton}
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </Button>
                  )}
                  <div className={styles.wishlistIcon}>
                    <label className={styles['con-like']}>
                      <input
                        type="checkbox"
                        className={styles.like}
                        checked={product.isWishlisted || false}
                        onChange={(e) => handleWishlistClick(e.target.checked)}
                      />
                      <div className={styles.checkmark}>
                        <svg viewBox="0 0 24 24" className={styles.outline} xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.5,1.917a6.476,6.476,0,0,0-5.5,3.3,6.476,6.476,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,11.922,12.586a1.065,1.065,0,0,0,.156,0c7.135-3.073,11.922-8.039,11.922-12.586A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.535L12,18.473l-1.915,2A15.138,15.138,0,0,1,2,8.967A4.87,4.87,0,0,1,6.5,4.917a4.679,4.679,0,0,1,4.5,3.334A1.065,1.065,0,0,0,12,8.607a1.065,1.065,0,0,0,.979-.356A4.679,4.679,0,0,1,17.5,4.917a4.87,4.87,0,0,1,4.5,4.05C22,14.65,17.214,19.615,13.915,20.452Z"></path>
                        </svg>
                        <svg viewBox="0 0 24 24" className={styles.filled} xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.5,1.917a6.476,6.476,0,0,0-5.5,3.3,6.476,6.476,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,11.922,12.586a1.065,1.065,0,0,0,.156,0c7.135-3.073,11.922-8.039,11.922-12.586A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                        </svg>
                        {token && (
                          <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" className={styles.celebrate}>
                            <polygon className={styles.poly} points="10,10 20,20"></polygon>
                            <polygon className={styles.poly} points="10,50 20,50"></polygon>
                            <polygon className={styles.poly} points="20,80 30,70"></polygon>
                            <polygon className={styles.poly} points="90,10 80,20"></polygon>
                            <polygon className={styles.poly} points="90,50 80,50"></polygon>
                            <polygon className={styles.poly} points="80,80 70,70"></polygon>
                          </svg>
                        )}
                      </div>
                    </label>
                  </div>
                </Box>
              </CardContent>
            </Box>
          </Box>
        </Card>
      </motion.div>
      {product && product.quickBuyQuantity && product.quickBuyQuantity > 0 && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            zIndex: 1000,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleViewCartSummary}
            sx={{
              backgroundColor: '#ff4d4d',
              '&:hover': {
                backgroundColor: '#e03b3b',
              },
              borderRadius: '20px',
              padding: '10px 20px',
              fontSize: '1rem',
              fontWeight: 'bold',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            View Cart Summary ({product.quickBuyQuantity})
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ExclusiveBuyingPage; 