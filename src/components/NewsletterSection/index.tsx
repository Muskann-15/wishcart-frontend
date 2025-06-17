import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styles from './newsletterSection.module.scss';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
});

const NewsletterSection: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Box className={styles.newsletterSection}>
      <Typography variant="h4" component="h2" className={styles.sectionTitle}>
        Subscribe to Our Newsletter
      </Typography>
      <Typography variant="body1" className={styles.sectionDescription}>
        Get the latest updates and special offers directly in your inbox.
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit} className={styles.subscribeForm} sx={{ marginTop: '0.5%' }}>
        <TextField
          variant="outlined"
          placeholder="Enter your email address"
          className={styles.emailInput}
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          FormHelperTextProps={{
            sx: {
              backgroundColor: 'transparent',
              margin: 0,
              paddingLeft: '14px',
              paddingRight: '14px'
            },
          }}
        />
        <Button type="submit" variant="contained" className={styles.subscribeButton}>
          Subscribe now
        </Button>
      </Box>
    </Box>
  );
};

export default NewsletterSection; 