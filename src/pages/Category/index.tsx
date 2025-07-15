import React, { useEffect } from 'react';
import { useLocation, Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Container, Breadcrumbs, Link, Button } from '@mui/material';
import { CategoryFilterSkeleton, CategoryFilter, ProductCardSkeleton, ProductSection } from '../../components';
import { CART_URL } from '../../constants/routes';
import type { RootState, AppDispatch } from '../../config/store';
import { fetchFilteredCategoryProducts } from '../../redux/searchFilterData/searchFilterApi';
import styles from './category.module.scss';

const CategoryPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { products, loading, error } = useSelector((state: RootState) => state.categoryProducts);
  const { userData: user } = useSelector((state: RootState) => state.userState);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const category = new URLSearchParams(location.search).get('category') || 'men';

  const categoryType = category === 'women' ? "female"
    : category === 'men' ? "male"
      : "all";

  useEffect(() => {
    const params = Object.fromEntries(new URLSearchParams(location.search).entries());
    dispatch(fetchFilteredCategoryProducts({ gender: categoryType, params }));
  }, [location.search, dispatch]);

  const handleViewCartSummary = () => navigate(CART_URL);

  const categoryName =
    category === 'women' ? "Women's Collection"
      : category === 'men' ? "Men's Collection"
        : 'All Collections';

  const wishlistSet = new Set((user?.wishlist || []).map(item => item.productId));
  const productsWithWishlist = products.map(product => ({
    ...product,
    isWishlisted: wishlistSet.has(product.id),
  }));

  return (
    <Container maxWidth='xl' sx={{ px: '5% !important' }} className={styles.container}>
      <Box className={styles.breadcrumbs}>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link component={RouterLink} to='/' color='inherit'>Home</Link>
          <Typography color='text.primary'>{categoryName}</Typography>
        </Breadcrumbs>
      </Box>

      <Typography variant='h4' component='h1' className={styles.title}>
        {categoryName}
      </Typography>

      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box sx={{ width: { xs: '100%', md: '25%' } }}>
          {loading ? <CategoryFilterSkeleton /> : <CategoryFilter />}
        </Box>
        <Box sx={{ width: { xs: '100%', md: '75%' } }}>
          {loading ? (
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              {Array.from({ length: 8 }).map((_, idx) => (
                <Box key={idx} sx={{ width: { xs: '100%', sm: '45%', md: '23%' }, mb: 3 }}>
                  <ProductCardSkeleton />
                </Box>
              ))}
            </Box>
          ) : error ? (
            <Typography color="error" variant='body1'>Error: {error}</Typography>
          ) : products.length > 0 ? (
            <ProductSection
              products={productsWithWishlist}
              productType="CategoryPageProduct"
              onWishlistToggle={() => { }}
              onUpdateQuickBuyQuantity={() => { }}
            />
          ) : (
            <Typography variant='body1' className={styles.noProducts}>
              No products found for this category.
            </Typography>
          )}
        </Box>
      </Box>

      {cartCount > 0 && (
        <Box sx={{ position: 'fixed', bottom: 30, right: 30, zIndex: 1000 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleViewCartSummary}
            sx={{
              backgroundColor: '#ff4d4d',
              '&:hover': { backgroundColor: '#e03b3b' },
              borderRadius: '20px',
              padding: '10px 20px',
              fontSize: '1rem',
              fontWeight: 'bold',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            View Cart Summary ({cartCount})
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default CategoryPage;