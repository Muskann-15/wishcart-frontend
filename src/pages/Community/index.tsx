import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from '../Home/home.module.scss';

const CommunityPage: React.FC = () => {
  return (
    <Box component="main" className={styles.main}>
      <Box className={styles.container}>
        <Typography variant="h4" component="h1" sx={{ marginBottom: '2rem' }}>
          Community
        </Typography>
        <Typography variant="body1">
          Join our vibrant community and connect with other users.
        </Typography>
      </Box>
    </Box>
  );
};

export default CommunityPage; 