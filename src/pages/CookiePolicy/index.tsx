import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from '../Home/home.module.scss';

const CookiePolicyPage: React.FC = () => {
  return (
    <Box component="main" className={styles.main}>
      <Box className={styles.container}>
        <Typography variant="h4" component="h1" sx={{ marginBottom: '2rem' }}>
          Cookie Policy
        </Typography>
        <Typography variant="body1">
          Read about our cookie usage policy.
        </Typography>
      </Box>
    </Box>
  );
};

export default CookiePolicyPage; 