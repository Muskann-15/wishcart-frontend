import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import styles from './productsSection.module.scss';
import { CategoryPageProducts } from '../../constants/constants';

const ProductSection: React.FC = () => {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const handleIncrement = (id: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  return (
    <Box className={styles.section}>
      <Typography variant="h4" className={styles.title}>
        Shop Now !!
      </Typography>
      <Box className={styles.grid}>
        {CategoryPageProducts.map(product => (
          <Card key={product.id} className={styles.card}>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.title}
              className={styles.image}
            />
            <CardContent>
              <Typography className={styles.name}>{product.title}</Typography>
              <Typography className={styles.price}>{product.price}</Typography>
              <Box className={styles.quantityControl}>
                <Button onClick={() => handleDecrement(product.id)} className={styles.qtyBtn}>
                  -
                </Button>
                <Typography className={styles.quantity}>
                  {quantities[product.id] || 0}
                </Typography>
                <Button onClick={() => handleIncrement(product.id)} className={styles.qtyBtn}>
                  +
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ProductSection;
