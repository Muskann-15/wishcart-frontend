import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import styles from '../Home/home.module.scss';
import { AppLoader } from '../../components/Loader';

const OutletPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return (
      <AppLoader />
    );
  }
  return (
    <Box component="main" className={styles.main}>
      <Box className={styles.container}>
        <Typography variant="h4" component="h1" sx={{ marginBottom: '2rem' }}>
          Outlet
        </Typography>
        <Typography variant="body1">
          Discover our amazing deals in the Outlet section.
        </Typography>
      </Box>
    </Box>
  );
};

export default OutletPage; 