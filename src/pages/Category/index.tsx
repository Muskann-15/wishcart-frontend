import React, { useEffect } from 'react';
import { useLocation, Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Container, Breadcrumbs, Link, Button } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { CategoryFilter, ProductCardSkeleton, ProductSection } from '../../components';
import { CART_URL } from '../../constants/routes';
import type { RootState, AppDispatch } from '../../config/store';
import { fetchFilteredCategoryProducts } from '../../redux/searchFilterData/searchFilterApi';
import { selectCategoryTotalCount } from '../../redux/searchFilterData/searchFilterSlice';
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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const totalCount = useSelector(selectCategoryTotalCount);

  useEffect(() => {
    setPage(0);
    const params = Object.fromEntries(new URLSearchParams(location.search).entries());
    dispatch(fetchFilteredCategoryProducts({ gender: categoryType, params, page: 1, limit: rowsPerPage }));
  }, [location.search, dispatch, rowsPerPage]);

  useEffect(() => {
    const params = Object.fromEntries(new URLSearchParams(location.search).entries());
    dispatch(fetchFilteredCategoryProducts({ gender: categoryType, params, page: page + 1, limit: rowsPerPage }));
  }, [page, rowsPerPage, location.search, dispatch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
          <Link
            component={RouterLink}
            to="/"
            color="inherit"
            underline="none"
            sx={{
              color: 'black',
              textDecoration: 'none',
              '&:hover': {
                color: 'black',
              },
              '&:focus': {
                color: 'black',
              },
              '&:active': {
                color: 'black',
              }
            }}
          >
            Home
          </Link>
          <Typography color='text.primary'>{categoryName}</Typography>
        </Breadcrumbs>
      </Box>

      <Typography variant='h4' component='h1' className={styles.title}>
        {categoryName}
      </Typography>

      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box sx={{ width: { xs: '100%', md: '25%' } }}>
          {/* {loading ? <CategoryFilterSkeleton /> : <CategoryFilter />} */}
          <CategoryFilter />
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
            <>
              <ProductSection
                products={productsWithWishlist}
                productType="CategoryPageProduct"
                onWishlistToggle={() => { }}
                onUpdateQuickBuyQuantity={() => { }}
              />
              <TablePagination
                component="div"
                count={totalCount}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[10, 20, 50]}
              />
            </>
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