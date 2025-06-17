import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from '../Home/home.module.scss';

const DocumentationPage: React.FC = () => {
  return (
    <Box component="main" className={styles.main}>
      <Box className={styles.container}>
        <Typography variant="h4" component="h1" sx={{ marginBottom: '2rem' }}>
          Documentation
        </Typography>
        <Typography variant="body1">
          Find detailed information about our products and services.
        </Typography>
      </Box>
    </Box>
  );
};

export default DocumentationPage; 