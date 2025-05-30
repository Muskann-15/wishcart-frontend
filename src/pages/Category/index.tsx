import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Filters, ProductSection } from '../../components';
import styles from './category.module.scss';

const CategoryPage: React.FC = () => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000]);

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
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
          <ProductSection />
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryPage;
