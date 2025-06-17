import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from '../Home/home.module.scss';

const HelpCenterPage: React.FC = () => {
  return (
    <Box component="main" className={styles.main}>
      <Box className={styles.container}>
        <Typography variant="h4" component="h1" sx={{ marginBottom: '2rem' }}>
          Help Center
        </Typography>
        <Typography variant="body1">
          Find answers to your questions and get support.
        </Typography>
      </Box>
    </Box>
  );
};

export default HelpCenterPage; 