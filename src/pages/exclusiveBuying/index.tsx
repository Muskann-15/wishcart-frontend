import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { fetchProductById } from '../../services/productService';
import type { Product } from '../../type/product';
import { addProductToWishlist, removeProductFromWishlist } from '../../services/wishlistService';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import { formatPrice } from '../../utils/formatters';
import { AppLoader } from '../../components';
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
  const { user, refreshUserDetails } = useUser();

  const cartQuantity = user?.cart?.find(item => item.productId === product?.id)?.quantity || 0;
  const isWishlisted = !!user?.wishlist?.find(item => item.productId === product?.id);

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
      const data = response.data as any;
      setProduct({
        ...data,
        id: data.id || data._id || data.productId,
      });
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
      await refreshUserDetails();
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
      await refreshUserDetails();
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
      const response = await addItemToCart(product.id, 1, product.price);
      if (response && !response.success) {
        throw new Error(response.message || 'Failed to add item to cart.');
      }
      await refreshUserDetails();
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
      <motion.div
        variants={itemVariants}
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }} style={{ width: '100%' }}
      >
        {cartActionError && <Alert severity="error" sx={{ mb: 2 }}>{cartActionError}</Alert>}
        <Box className={styles.productDetailCard} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: '100%', borderRadius: 10, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', background: '#fff' }}>
          <Box sx={{ flexBasis: '50%', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <Box className={styles.productImage}>
              <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16, marginBottom: 16, flexWrap: 'wrap' }}>
              {[1, 2, 3, 4].map((_, idx) => (
                <Box key={idx} style={{ width: 80, height: 100, borderRadius: 8, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', border: '1px solid #e6e6e6', overflow: 'hidden', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', position: 'relative' }}>
                  <Box style={{ width: '100%', height: 12, background: '#f8f8fa', borderBottom: '1px solid #e6e6e6', display: 'flex', alignItems: 'center', paddingLeft: 4, gap: 2 }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#d1d5db', display: 'inline-block' }}></span>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#d1d5db', display: 'inline-block' }}></span>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#d1d5db', display: 'inline-block' }}></span>
                  </Box>
                  <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: 70, objectFit: 'cover', marginTop: 2 }} />
                  <Box style={{ width: '100%', height: 12, background: '#fff', borderTop: '1px solid #e6e6e6', marginTop: 'auto' }} />
                </Box>
              ))}
            </Box>
          </Box>

          <Box className={styles.productContent} sx={{ flexBasis: '50%', flexGrow: 1 }} style={{ padding: 40 }}>
            <Box style={{ marginBottom: 8 }}>
              <span style={{ background: '#f4f6fa', color: '#222', fontWeight: 600, fontSize: 14, borderRadius: 8, padding: '4px 14px', marginBottom: 8, display: 'inline-block' }}>Exclusive Buying</span>
            </Box>
            <Typography className={styles.productName}>{product.name}</Typography>
            <Box style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ color: '#FFD600', fontSize: 22 }}>★ ★ ★ ★ ★</span>
              <Typography style={{ color: '#222', fontWeight: 500, fontSize: 15 }}>(127 reviews)</Typography>
            </Box>
            <Box style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
              <Typography className={styles.productPrice} style={{ fontSize: 28, fontWeight: 700 }}>{formatPrice(product.price)}</Typography>
              <Typography style={{ textDecoration: 'line-through', color: '#888', fontSize: '1.2rem' }}>₹{product.price + 300}</Typography>
              <Box style={{ background: '#ff3366', color: '#fff', borderRadius: 6, padding: '2px 10px', fontWeight: 600, fontSize: 14 }}>23% OFF</Box>
            </Box>
            <Typography className={styles.productDescription} style={{ margin: '18px 0 18px 0', color: '#444', fontSize: 17 }}>{product.description || 'No description available for this product.'}</Typography>
            <Box style={{ margin: '18px 0 10px 0', display: 'flex', alignItems: 'center', gap: 24 }}>
              <Typography style={{ fontWeight: 600, fontSize: 18 }}>Color: <span style={{ fontWeight: 400, fontSize: 16, marginLeft: 8 }}>Black</span></Typography>
              <Box style={{ display: 'flex', gap: 10 }}>
                <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#111', border: '2px solid #222', display: 'inline-block' }}></span>
                <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#a05a00', border: '2px solid #222', display: 'inline-block' }}></span>
                <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#c97a1c', border: '2px solid #222', display: 'inline-block' }}></span>
              </Box>
            </Box>
            <Box style={{ margin: '10px 0 18px 0', display: 'flex', alignItems: 'center', gap: 24 }}>
              <Typography style={{ fontWeight: 600, fontSize: 18 }}>Size: <span style={{ fontWeight: 400, fontSize: 16, marginLeft: 8 }}>Medium</span></Typography>
              <Box style={{ display: 'flex', gap: 10 }}>
                <Button variant="outlined" style={{ borderRadius: 8, minWidth: 60, fontWeight: 600, background: '#fff' }}>Small</Button>
                <Button variant="contained" style={{ borderRadius: 8, minWidth: 60, fontWeight: 600, background: '#18192b', color: '#fff' }}>Medium</Button>
                <Button variant="outlined" style={{ borderRadius: 8, minWidth: 60, fontWeight: 600, background: '#fff' }}>Large</Button>
              </Box>
            </Box>
            <Box style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0 0 0' }}>
              {cartQuantity > 0 ? (
                <Box className={styles.quantitySelector}>
                  <Button size="small" onClick={() => handleUpdateQuickBuyQuantity(-1)}>-</Button>
                  <Typography variant="body2" className={styles.quantityText}>{cartQuantity}</Typography>
                  <Button size="small" onClick={() => handleUpdateQuickBuyQuantity(1)}>+</Button>
                </Box>
              ) : (
                <Button variant="contained" className={styles.addToCartButton} onClick={handleAddToCart} style={{ minWidth: 180, fontWeight: 600, fontSize: 18, background: '#18192b', color: '#fff', borderRadius: 8 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 20 }}>🛒</span> Add To Cart
                  </span>
                </Button>
              )}
              <Button variant="outlined" className={styles.buyNowButton} style={{ width: '20%', fontWeight: 700, fontSize: 18, border: '1.5px solid #18192b', color: '#18192b', background: '#fff', borderRadius: 8, padding: '6px 0' }}>Buy Now</Button>
              <div className={styles.wishlistIcon}>
                <label className={styles['con-like']}>
                  <input
                    type="checkbox"
                    className={styles.like}
                    checked={isWishlisted}
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
              <Button variant="outlined" style={{ minWidth: 48, border: '1.5px solid #18192b', color: '#18192b', background: '#fff', borderRadius: 8 }}>
                <span style={{ fontSize: 20 }}>🔗</span>
              </Button>
            </Box>
            <Box style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Box style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>🚚</span>
                <Typography style={{ color: '#222', fontWeight: 500, fontSize: 15 }}>Free shipping on orders over ₹999</Typography>
              </Box>
              <Box style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>↩️</span>
                <Typography style={{ color: '#222', fontWeight: 500, fontSize: 15 }}>30-day return policy</Typography>
              </Box>
              <Box style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>🛡️</span>
                <Typography style={{ color: '#222', fontWeight: 500, fontSize: 15 }}>2-year warranty included</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        {product && product.quickBuyQuantity && product.quickBuyQuantity > 0 && (
          <Box sx={{ position: 'fixed', bottom: 30, right: 30, zIndex: 1000 }}>
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
      </motion.div>
    </Box>
  );
};

export default ExclusiveBuyingPage; 