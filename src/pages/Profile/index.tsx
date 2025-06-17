import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from '../Home/home.module.scss';

const ProfilePage: React.FC = () => {
  return (
    <Box component="main" className={styles.main}>
      <Box className={styles.container}>
        <Typography variant="h4" component="h1" sx={{ marginBottom: '2rem' }}>
          User Profile
        </Typography>
        <Typography variant="body1">
          This page will display user profile information.
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfilePage; 