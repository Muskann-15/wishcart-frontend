import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from '../Home/home.module.scss';

const TutorialsPage: React.FC = () => {
  return (
    <Box component="main" className={styles.main}>
      <Box className={styles.container}>
        <Typography variant="h4" component="h1" sx={{ marginBottom: '2rem' }}>
          Tutorials
        </Typography>
        <Typography variant="body1">
          Learn how to make the most of our products with our tutorials.
        </Typography>
      </Box>
    </Box>
  );
};

export default TutorialsPage; 