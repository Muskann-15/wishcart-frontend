import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import CustomButton from '../../components/CustomButton';
import { CATEGORY_URL } from '../../constants/routes';
import styles from './everydayCollectionSection.module.scss';

const EverydayCollectionSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box className={styles.everydayCollectionSection}>
      <Box className={styles.contentLeft}>
        <Typography variant="body1" className={styles.subheading}>
          Everyday collection 2025
        </Typography>
        <Typography variant="h2" component="h2" className={styles.heading}>
          Be yourself
        </Typography>
        <Typography variant="body1" className={styles.description} sx={{ marginBottom: '15px' }}>
          The ideal selection for your everyday use in Super Saver range within a
          reasonable price range is here for you to keep you stay steady % trendy.
        </Typography>
        <CustomButton color='black' variant="contained" onClick={() => navigate(CATEGORY_URL)}>Explore</CustomButton>
      </Box>
      <Box className={styles.contentRight}>
        <img
          src="https://www.instyle.com/thmb/2vTd6ZZW5hRCu8Xv5-JxC_tvSWk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-2153285641-0a7d20bfbe7949a4bfea27ad075d175f.jpg"
          alt="Everyday Collection"
          className={styles.collectionImage}
        />
        <Typography variant="body1" className={styles.imageOverlayText}>
          Outfit →
        </Typography>
      </Box>
    </Box>
  );
};

export default EverydayCollectionSection; 