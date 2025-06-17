import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Alert } from '@mui/material';
import styles from './wishlist.module.scss';
import { getWishlist, removeProductFromWishlist } from '../../services/wishlistService';
import ProductSection from '../../components/ProductsSection';
import type { Product } from '../../type/product';
import { AppLoader } from '../../components/Loader';

const WishlistPage: React.FC = () => {
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getWishlist();
        if (response.success && Array.isArray(response.data)) {
          const mappedProducts: Product[] = response.data.map((item: any) => ({
            id: item._id || item.productId,
            name: item.productName || item.name || '',
            title: item.productTitle || item.title || '',
            imageUrl: item.imageUrl || '',
            price: item.price ? parseFloat(item.price) : 0,
            isWishlisted: true,
            category: item.productType || item.category || 'unknown',
          })).filter((product: Product) => product.id !== undefined && product.id !== null && product.id !== '');
          setWishlistProducts(mappedProducts);
        } else {
          setError(response.message || 'Failed to fetch wishlist.');
        }
      } catch (err) {
        console.error('Error fetching wishlist:', err);
        setError(`Failed to load wishlist: ${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleProductWishlistToggle = async (productId: string, isWishlisted: boolean, productCategory: string) => {
    if (!isWishlisted) {
      setWishlistProducts(prevProducts => prevProducts.filter(p => p.id !== productId)); 
      try {
        const productToRemove = wishlistProducts.find(p => p.id === productId);
        if (productToRemove) {
          console.log('Attempting to remove wishlist item:', {
            productId: productId,
            productType: productToRemove.category || 'unknown',
          });
          await removeProductFromWishlist(productId, productToRemove.category || 'unknown');
        } else {
          console.warn('Product to remove not found in wishlistProducts state.');
        }
      } catch (error) {
        console.error('Error removing product from wishlist (API call):', error);
      }
    }
  };

  if (loading) {
    return (
      <AppLoader />
    );
  }

  if (error) {
    return (
      <Container maxWidth='xl' className={styles.container}>
        <Alert severity='error'>{error}</Alert>
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