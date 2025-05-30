import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Filters, ProductSection } from '../../components';
import styles from './category.module.scss';
import { Cart_URL } from '../../constants/urls';

const CategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000]);
  const [cartItems, setCartItems] = useState<{ [key: number]: number }>({});

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: quantity
    }));
  };

  const totalItemsInCart = Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0);

  const handleViewCart = () => {
    navigate(Cart_URL);
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.content}>
        <Box className={styles.filterSection}>
          <Filters 
            priceRange={priceRange}
            onPriceChange={handlePriceChange}
          />
        </Box>
        <Box className={styles.productSection}>
          <ProductSection 
            onQuantityChange={handleQuantityChange}
            quantities={cartItems}
          />
        </Box>
      </Box>
      {totalItemsInCart > 0 && (
        <Button
          variant="contained"
          color="primary"
          className={styles.viewCartButton}
          onClick={handleViewCart}
        >
          View Cart ({totalItemsInCart} items)
        </Button>
      )}
    </Box>
  );
};

export default CategoryPage;
