import React, { useEffect, useState } from 'react';
import { useLocation, Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Breadcrumbs, Link, Button } from '@mui/material';
import type { Product } from '../../type/product';
import ProductSection from '../../components/ProductsSection';
import CategoryFilter from '../../components/CategoryFilter';
import { AppLoader } from '../../components/Loader';
import { getWishlist } from '../../services/wishlistService';
import { useUser } from '../../context/UserContext';
import { API_BASE_URL } from '../../constants/api';
import type { FetchedProductItem } from '../../types/ProductTypes';
import { CART_URL } from '../../constants/routes';
import styles from './category.module.scss';

const MALE_PRODUCTS_URL = `${API_BASE_URL}/category-products/male`;
const FEMALE_PRODUCTS_URL = `${API_BASE_URL}/category-products/female`;

const CategoryPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, error } = useUser();

  const [categoryName, setCategoryName] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [wishlistProductIds, setWishlistProductIds] = useState<Set<string>>(new Set());
  const [localLoading, setLoading] = useState<boolean>(true);
  const [localError, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProductsAndWishlist();
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search')?.toLowerCase() || '';
    const selectedCategories = params.get('categories')?.split(',').map(cat => cat.toLowerCase()) || [];
    const minPrice = parseInt(params.get('minPrice') || '0', 10);
    const maxPrice = parseInt(params.get('maxPrice') || '1000', 10);
    const selectedRatings = params.get('ratings')?.split(',') || [];

    let currentFilteredProducts = products.map(product => {
      const cartItem = user?.cart?.find(item => item.productId === product.id);
      const isWishlisted = !!user?.wishlist?.find(item => item.productId === product.id);
      return { ...product, quickBuyQuantity: cartItem ? cartItem.quantity : undefined, isWishlisted };
    });

    if (searchQuery) {
      currentFilteredProducts = currentFilteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery) ||
        (product.title && product.title.toLowerCase().includes(searchQuery))
      );
    }

    if (selectedCategories.length > 0) {
      currentFilteredProducts = currentFilteredProducts.filter(product =>
        selectedCategories.some(category =>
          product.name.toLowerCase().includes(category) ||
          (product.title && product.title.toLowerCase().includes(category))
        )
      );
    }

    currentFilteredProducts = currentFilteredProducts.filter(product => {
      return product.price >= minPrice && product.price <= maxPrice;
    });

    if (selectedRatings.length > 0) {
      currentFilteredProducts = currentFilteredProducts.filter(product => {
        const productRating = 0;
        return selectedRatings.some(selectedRating => {
          if (selectedRating === '4★ & above') return productRating >= 4;
          if (selectedRating === '3★ & above') return productRating >= 3;
          if (selectedRating === '2★ & above') return productRating >= 2;
          if (selectedRating === '1★ & above') return productRating >= 1;
          return false;
        });
      });
    }

    setFilteredProducts(currentFilteredProducts);
  }, [products, location.search, wishlistProductIds, user]);

  const fetchProductsAndWishlist = async () => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');

    setLoading(true);
    setError(null);
    try {
      let fetchedProducts: Product[] = [];
      if (category === 'men') {
        const response = await fetch(MALE_PRODUCTS_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.data && data.data.accessories) {
          fetchedProducts.push(...data.data.accessories.map((item: FetchedProductItem) => ({
            id: item.id || item._id || '',
            name: item.title || item.name || item.productName || '',
            title: item.description || '',
            imageUrl: item.imageUrl,
            price: parseFloat(item.price),
            quantity: item.quantity,
          })));
        }
        if (data.data && data.data.clothing) {
          fetchedProducts.push(...data.data.clothing.map((item: FetchedProductItem) => ({
            id: item.id || item._id || '',
            name: item.title || item.name || item.productName || '',
            title: item.description || '',
            imageUrl: item.imageUrl,
            price: parseFloat(item.price),
            quantity: item.quantity,
          })));
        }
        setCategoryName('Men\'s Collection');
      } else if (category === 'women') {
        const response = await fetch(FEMALE_PRODUCTS_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.data && data.data.accessories) {
          fetchedProducts.push(...data.data.accessories.map((item: FetchedProductItem) => ({
            id: item.id || item._id || '',
            name: item.title || item.name || item.productName || '',
            title: item.description || '',
            imageUrl: item.imageUrl,
            price: parseFloat(item.price),
            quantity: item.quantity,
          })));
        }
        if (data.data && data.data.clothing) {
          fetchedProducts.push(...data.data.clothing.map((item: FetchedProductItem) => ({
            id: item.id || item._id || '',
            name: item.title || item.name || item.productName || '',
            title: item.description || '',
            imageUrl: item.imageUrl,
            price: parseFloat(item.price),
            quantity: item.quantity,
          })));
        }
        setCategoryName('Women\'s Collection');
      } else {
        const [maleResponse, femaleResponse] = await Promise.all([
          fetch(MALE_PRODUCTS_URL),
          fetch(FEMALE_PRODUCTS_URL)
        ]);

        if (!maleResponse.ok) {
          throw new Error(`HTTP error! status: ${maleResponse.status} from male products`);
        }
        if (!femaleResponse.ok) {
          throw new Error(`HTTP error! status: ${femaleResponse.status} from female products`);
        }

        const maleData = await maleResponse.json();
        const femaleData = await femaleResponse.json();

        if (maleData.data && maleData.data.accessories) {
          fetchedProducts.push(...maleData.data.accessories.map((item: FetchedProductItem) => ({
            id: item.id || item._id || '',
            name: item.title || item.name || item.productName || '',
            title: item.description || '',
            imageUrl: item.imageUrl,
            price: parseFloat(item.price),
            quantity: item.quantity,
          })));
        }
        if (maleData.data && maleData.data.clothing) {
          fetchedProducts.push(...maleData.data.clothing.map((item: FetchedProductItem) => ({
            id: item.id || item._id || '',
            name: item.title || item.name || item.productName || '',
            title: item.description || '',
            imageUrl: item.imageUrl,
            price: parseFloat(item.price),
            quantity: item.quantity,
          })));
        }
        if (femaleData.data && femaleData.data.accessories) {
          fetchedProducts.push(...femaleData.data.accessories.map((item: FetchedProductItem) => ({
            id: item.id || item._id || '',
            name: item.title || item.name || item.productName || '',
            title: item.description || '',
            imageUrl: item.imageUrl,
            price: parseFloat(item.price),
            quantity: item.quantity,
          })));
        }
        if (femaleData.data && femaleData.data.clothing) {
          fetchedProducts.push(...femaleData.data.clothing.map((item: FetchedProductItem) => ({
            id: item.id || item._id || '',
            name: item.title || item.name || item.productName || '',
            title: item.description || '',
            imageUrl: item.imageUrl,
            price: parseFloat(item.price),
            quantity: item.quantity,
          })));
        }
        setCategoryName('All Collections');
      }

      // Only fetch wishlist if user is logged in
      if (user) {
        try {
          const wishlistResponse = await getWishlist();
          if (wishlistResponse.success && Array.isArray(wishlistResponse.data)) {
            const wishlistedIds = new Set<string>(wishlistResponse.data.map((item: { productId: string; _id?: string; }) => item.productId || item._id).filter((id): id is string => !!id));
            setWishlistProductIds(wishlistedIds);
            fetchedProducts = fetchedProducts.map(product => ({
              ...product,
              isWishlisted: wishlistedIds.has(product.id),
            }));
            setProducts(fetchedProducts);
          } else {
            setProducts(fetchedProducts);
            console.warn('Failed to fetch wishlist:', wishlistResponse.message);
          }
        } catch (wishlistError) {
          console.warn('Error fetching wishlist (likely authentication issue):', wishlistError);
          setProducts(fetchedProducts);
        }
      } else {
        // User not logged in, just show products
        setProducts(fetchedProducts);
      }

    } catch (err: any) {
      console.error('An unexpected error occurred during product/wishlist fetch:', err);

      if (err.message && err.message.startsWith('HTTP error!')) {
        setError(`Failed to load products: ${(err as Error).message}. Please ensure the backend server is running and accessible at ${API_BASE_URL}`);
        setProducts([]);
      } else {
        console.warn('Non-critical error encountered (likely authentication for wishlist/cart), displaying products:', err.message || err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProductWishlistToggle = (productId: string, isWishlisted: boolean, productCategory: string) => {
    setWishlistProductIds(prev => {
      const newSet = new Set(prev);
      if (isWishlisted) {
        newSet.add(productId);
      } else {
        newSet.delete(productId);
      }
      return newSet;
    });
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId ? { ...product, isWishlisted: isWishlisted } : product
      )
    );
  };

  const handleUpdateQuickBuyQuantity = () => {
  };

  const handleViewCartSummary = () => {
    navigate(CART_URL);
  };

  if (localLoading) {
    return (<AppLoader />);
  }

  if (localError) {
    return (
      <Container className={styles.container}>
        <Typography variant='h4' component='h1' className={styles.errorText} style={{ marginTop: '8%' }}>
          Error: {localError}
        </Typography>
      </Container>
    );
  }

  const cartCount = user?.cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <Container maxWidth='xl' sx={{
      px: '5% !important',
    }} className={styles.container}>
      <Box className={styles.breadcrumbs}>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link component={RouterLink} to='/' color='inherit'>
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
          <CategoryFilter />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '75%' } }}>
          {filteredProducts.length > 0 ? (
            <ProductSection
              products={filteredProducts}
              onWishlistToggle={handleProductWishlistToggle}
              productType="CategoryPageProduct"
              onUpdateQuickBuyQuantity={handleUpdateQuickBuyQuantity}
            />
          ) : (
            <Typography variant='body1' className={styles.noProducts}>
              No products found for this category.
            </Typography>
          )}
        </Box>
      </Box>
      {cartCount > 0 && (
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
            View Cart Summary ({cartCount})
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default CategoryPage; 