import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './categorySection.module.scss';

type Product = {
  id: number;
  name: string;
  image: string;
  price: string;
};

type CategorySectionProps = {
  title: string;
  products: Product[];
};

const CategorySection: React.FC<CategorySectionProps> = ({ title, products }) => {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate(`/category?category=${title.toLowerCase()}`);
  };

  return (
    <Box className={styles.section} sx={{ justifyItems: 'center' }}>
      <Typography
        variant="h5"
        className={styles.title}
      >
        {title}
      </Typography>
      <Box className={styles.grid}>
        {products.map(product => (
          <Card
            key={product.id}
            className={styles.card}
            onClick={handleCategoryClick}
            sx={{ cursor: 'pointer' }}>
            <CardMedia component="img" image={product.image} alt={product.name} className={styles.image} />
            <CardContent>
              <Typography>{product.name}</Typography>
              <Typography>{product.price}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default CategorySection;
