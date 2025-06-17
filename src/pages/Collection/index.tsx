import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import styles from '../Home/home.module.scss';
import { AppLoader } from '../../components/Loader';

const CollectionPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return ( <AppLoader /> );
  }
  return (
    <Box component="main" className={styles.main}>
      <Box className={styles.container}>
        <Typography variant="h4" component="h1" sx={{ marginBottom: '2rem' }}>
          Collection
        </Typography>
        <Typography variant="body1">
          Explore our diverse collection of products.
        </Typography>
      </Box>
    </Box>
  );
};

export default CollectionPage; 