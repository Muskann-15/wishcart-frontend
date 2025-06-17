import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from '../Home/home.module.scss';

const CareersPage: React.FC = () => {
  return (
    <Box component="main" className={styles.main}>
      <Box className={styles.container}>
        <Typography variant="h4" component="h1" sx={{ marginBottom: '2rem' }}>
          Careers
        </Typography>
        <Typography variant="body1">
          Join our team and build amazing things with us!
        </Typography>
      </Box>
    </Box>
  );
};

export default CareersPage; 