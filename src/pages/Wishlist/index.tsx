import React, { useState } from 'react';
import { Box, Typography, Container, Alert } from '@mui/material';
import styles from './wishlist.module.scss';
import { removeProductFromWishlist } from '../../services/wishlistService';
import ProductSection from '../../components/ProductsSection';
import type { Product } from '../../type/product';
import { AppLoader } from '../../components/Loader';
import { useUser } from '../../context/UserContext';

const WishlistPage: React.FC = () => {
  const { user, loading, error, refreshUserDetails } = useUser();
  const [localError, setLocalError] = useState<string | null>(null);

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