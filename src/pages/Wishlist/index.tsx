import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, Container, Alert } from '@mui/material';
import { removeProductFromWishlist } from '../../services/wishlistService';
import { AppLoader, ProductSection } from '../../components';
import type { Product } from '../../type/product';
import { useUser } from '../../context/UserContext';
import { updateLoadingValue } from '../../redux/userData/userSlice';
import styles from './wishlist.module.scss';

const WishlistPage: React.FC = () => {
  const { user, loading, error, refreshUserDetails } = useUser();
  const [localError, setLocalError] = useState<string | null>(null);

  const dispatch = useDispatch();
  dispatch(updateLoadingValue(false))

  const wishlistProducts: Product[] = (user?.wishlist || []).map((item: any) => ({
    id: item._id || item.productId,
    name: item.name || '',
    title: item.name || '',
    imageUrl: item.imageUrl || '',
    price: item.price ? parseFloat(item.price) : 0,
    isWishlisted: true,
    category: item.productType || item.category || 'unknown',
  })).filter((product: Product) => product.id !== undefined && product.id !== null && product.id !== '');

  const handleProductWishlistToggle = async (productId: string, isWishlisted: boolean, productCategory: string) => {
    if (!isWishlisted) {
      try {
        await removeProductFromWishlist(productId, productCategory);
        await refreshUserDetails();
      } catch (error) {
        setLocalError('Error removing product from wishlist.');
      }
    }
  };

  if (loading) {
    return (
      <AppLoader />
    );
  }

  if (error || localError) {
    return (
      <Container maxWidth='xl' className={styles.container}>
        <Alert severity='error'>{error || localError}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth='xl' className={styles.container}>
      <Box className={styles.header}>
        <Typography variant="h4" component="h1" className={styles.title}>
          My Wishlist
        </Typography>
      </Box>

      {wishlistProducts.length > 0 ? (
        <ProductSection 
          products={wishlistProducts} 
          onWishlistToggle={handleProductWishlistToggle} 
          productType="WishlistPageProduct"
          onUpdateQuickBuyQuantity={() => {}}
        />
      ) : (
        <Typography variant='body1' className={styles.noProducts}>
          Your wishlist is empty.
        </Typography>
      )}
    </Container>
  );
};

export default WishlistPage; 