import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import styles from './productsSection.module.scss';
import product_sneakers from '../../assets/images/products/product_sneakers.png';
import product_backpack from '../../assets/images/products/product_backpack.png';
import product_watch from '../../assets/images/products/product_watch.png';

interface ProductSectionProps {
  onQuantityChange: (productId: number, quantity: number) => void;
  quantities: { [key: number]: number };
}

const products = [
  {
    id: 1,
    title: 'Stylish Sneakers',
    image: product_sneakers,
    price: '₹999',
  },
  {
    id: 2,
    title: 'Trendy Backpack',
    image: product_backpack,
    price: '₹799',
  },
  {
    id: 3,
    title: 'Smart Watch',
    image: product_watch,
    price: '₹1999',
  },
];

const ProductSection: React.FC<ProductSectionProps> = ({ onQuantityChange, quantities }) => {
  const handleIncrement = (id: number) => {
    onQuantityChange(id, (quantities[id] || 0) + 1);
  };

  const handleDecrement = (id: number) => {
    if (quantities[id] > 0) {
      onQuantityChange(id, quantities[id] - 1);
    }
  };

  return (
    <Box className={styles.section}>
      <Typography variant="h4" className={styles.title}>
        Shop Now !!
      </Typography>
      <Box className={styles.grid}>
        {products.map(product => (
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
                <Button 
                  onClick={() => handleDecrement(product.id)} 
                  className={styles.qtyBtn}
                  disabled={!quantities[product.id]}
                >
                  -
                </Button>
                <Typography className={styles.quantity}>
                  {quantities[product.id] || 0}
                </Typography>
                <Button 
                  onClick={() => handleIncrement(product.id)} 
                  className={styles.qtyBtn}
                >
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
