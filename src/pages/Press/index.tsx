import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from '../Home/home.module.scss';

const PressPage: React.FC = () => {
  return (
    <Box component="main" className={styles.main}>
      <Box className={styles.container}>
        <Typography variant="h4" component="h1" sx={{ marginBottom: '2rem' }}>
          Press
        </Typography>
        <Typography variant="body1">
          Latest news and press releases.
        </Typography>
      </Box>
    </Box>
  );
};

export default PressPage; 