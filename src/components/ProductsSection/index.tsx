import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CardMedia, Button, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { addProductToWishlist, removeProductFromWishlist } from '../../services/wishlistService';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../config/store';
import { addToCart, removeFromCart } from '../../redux/cartData/cartApi';
import { PRODUCT_PAGE_URL } from '../../constants/routes';
import type { Product } from '../../type/product';
import { formatPrice } from '../../utils/formatters';
import NoImage from '../../assets/images/no-images.png';
import styles from './productsSection.module.scss';

interface ProductsSectionProps {
  products: Product[];
  onWishlistToggle: (productId: string, isWishlisted: boolean, productCategory: string) => void;
  productType: string;
  onUpdateQuickBuyQuantity: (product: Product, change: number) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: -50, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const ProductsSection: React.FC<ProductsSectionProps> = ({ products, onWishlistToggle, productType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();
  const [cartError, setCartError] = useState<string | null>(null);

  const handleWishlistClick = async (product: Product, isChecked: boolean) => {
    onWishlistToggle(product.id, isChecked, product.category || 'unknown');
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        console.warn('Authentication token not found. Cannot update wishlist.');
        return;
      }
      if (isChecked) {
        await addProductToWishlist({ productId: product.id, productType: productType });
      } else {
        await removeProductFromWishlist(product.id, productType);
      }
    } catch (error) {
      console.error('Wishlist operation failed:', error);
    }
  };

  const handleAddToCart = async (product: Product) => {
    try {
      await dispatch(addToCart({ productId: product.id, quantity: 1, price: Number(product.price) }));
    } catch (error: any) {
      console.error('Failed to add to cart:', error);
      setCartError(error.message || 'Failed to add item to cart.');
    }
  };

  const handleRemoveFromCart = async (product: Product) => {
    try {
      await dispatch(removeFromCart(product.id));
    } catch (error: any) {
      console.error('Failed to remove from cart:', error);
      setCartError(error.message || 'Failed to remove item from cart.');
    }
  };

  const handleUpdateQuantity = async (product: Product, change: number) => {
    if (change > 0) {
      await handleAddToCart(product);
    } else {
      await handleRemoveFromCart(product);
    }
    setCartError(null);
  };

  const handleProductNavigation = (productId: string) => {
    navigate(`${PRODUCT_PAGE_URL}/${productId}`)
  }

  return (
    <Box className={styles.section}>
      {cartError && <Alert severity="error" sx={{ mb: 2 }}>{cartError}</Alert>}
      <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {products.map(product => {
          const cartItem = cartItems.find(item => item.productId === product.id);
          const quickBuyQuantity = cartItem ? cartItem.quantity : 0;
          return (
            <motion.div
              key={product.id}
              className={styles.cardContainer}
              variants={itemVariants}
              whileHover="hover"
              initial="hidden"
              animate="show"
            >
              <Card className={styles.card}>
                <Box className={styles.imageWrapper}>
                  <CardMedia
                    key={`media-${product.id}`}
                    component="img"
                    image={product.imageUrl !== "emptyUrlImg" ? product.imageUrl : NoImage}
                    alt={product.title || product.name}
                    className={styles.image}
                  />
                  <div key={`wishlist-${product.id}`} className={styles.wishlistIcon}>
                    <label className={styles['con-like']}>
                      <input
                        type="checkbox"
                        className={styles.like}
                        checked={product.isWishlisted || false}
                        onChange={(e) => handleWishlistClick(product, e.target.checked)}
                      />
                      <div className={styles.checkmark}>
                        <svg key={`outline-${product.id}`} viewBox="0 0 24 24" className={styles.outline} xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                          <path d="M17.5,1.917a6.476,6.476,0,0,0-5.5,3.3,6.476,6.476,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,11.922,12.586a1.065,1.065,0,0,0,.156,0c7.135-3.073,11.922-8.039,11.922-12.586A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.535L12,18.473l-1.915,2A15.138,15.138,0,0,1,2,8.967A4.87,4.87,0,0,1,6.5,4.917a4.679,4.679,0,0,1,4.5,3.334A1.065,1.065,0,0,0,12,8.607a1.065,1.065,0,0,0,.979-.356A4.679,4.679,0,0,1,17.5,4.917a4.87,4.87,0,0,1,4.5,4.05C22,14.65,17.214,19.615,13.915,20.452Z"></path>
                        </svg>
                        <svg key={`filled-${product.id}`} viewBox="0 0 24 24" className={styles.filled} xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                          <path d="M17.5,1.917a6.476,6.476,0,0,0-5.5,3.3,6.476,6.476,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,11.922,12.586a1.065,1.065,0,0,0,.156,0c7.135-3.073,11.922-8.039,11.922-12.586A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                        </svg>
                        {localStorage.getItem('jwtToken') && (
                          <svg key={`celebrate-${product.id}`} className={styles.celebrate} width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                            <polygon className={styles.poly} points="10,10 20,20" ></polygon>
                            <polygon className={styles.poly} points="10,50 20,50" ></polygon>
                            <polygon className={styles.poly} points="20,20 30,10" ></polygon>
                          </svg>
                        )}
                      </div>
                    </label>
                  </div>
                  <div
                    key={`quickbuy-${product.id}`}
                    className={styles.quickBuyButton}
                  >
                    {quickBuyQuantity > 0 ? (
                      <Box className={styles.quantitySelector}>
                        <Button size="small" onClick={() => handleUpdateQuantity(product, -1)}>-</Button>
                        <Typography variant="body2">{quickBuyQuantity}</Typography>
                        <Button size="small" onClick={() => handleUpdateQuantity(product, 1)}>+</Button>
                      </Box>
                    ) : (
                      <Button variant="contained" onClick={() => handleAddToCart(product)}>Quick Buy</Button>
                    )}
                  </div>
                </Box>
                <CardContent>
                  <Typography onClick={() => handleProductNavigation(product.id)} key={`name-${product.id}`} style={{ fontSize: '1.1rem', fontWeight: 'bold', cursor: "pointer" }}>{product.name || product.title}</Typography>
                  <Typography key={`price-${product.id}`} className={styles.price}>{formatPrice(product.price)}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </Box>
  );
};

export default ProductsSection;
