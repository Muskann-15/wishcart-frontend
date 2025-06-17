import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from '../Home/home.module.scss';

const BlogPage: React.FC = () => {
  return (
    <Box component="main" className={styles.main}>
      <Box className={styles.container}>
        <Typography variant="h4" component="h1" sx={{ marginBottom: '2rem' }}>
          Blog
        </Typography>
        <Typography variant="body1">
          Read our latest articles and updates.
        </Typography>
      </Box>
    </Box>
  );
};

export default BlogPage; 