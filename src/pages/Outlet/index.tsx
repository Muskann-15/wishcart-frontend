import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import styles from '../Home/home.module.scss';

const OutletPage: React.FC = () => {
  return (
    <Box component="main" className={styles.main} sx={{ marginTop: "10%" }}>
      <Container maxWidth="md" className={styles.section} sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'none' }}>
        <Typography variant="h3" component="h1" className={styles.heading} sx={{ mb: 2, color: '#ff4d4d' }}>
          Coming Soon
        </Typography>
      </Container>
    </Box>
  );
};

export default OutletPage; 