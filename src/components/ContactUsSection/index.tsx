import React from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import styles from './contactUsSection.module.scss';

const ContactUsSection: React.FC = () => {
  return (
    <Box className={styles.contactUsSection}>
      <Typography variant="h4" component="h2" className={styles.sectionTitle} sx={{ marginBottom: '25px' }}>
        Contact Us
      </Typography>
      <Box className={styles.contactInfoContainer}>
        <Box className={styles.contactItem}>
          <LocationOnIcon className={styles.icon} />
          <Typography variant="body1" className={styles.text}>
            Taj Main Street, Colaba Causeway, South Bombay 400001
          </Typography>
        </Box>
        <Box className={styles.contactItem}>
          <PhoneIcon className={styles.icon} />
          <Typography variant="body1" className={styles.text}>
            +91 22-6665-3366
          </Typography>
        </Box>
        <Box className={styles.contactItem}>
          <EmailIcon className={styles.icon} />
          <MuiLink href="mailto:info@wishcart.com" className={styles.text}>
            info@wishcart.com
          </MuiLink>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactUsSection; 