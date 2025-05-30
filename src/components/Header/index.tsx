import React from 'react';
import { Box, Typography, InputBase, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';
import { HeaderLinkList } from '../../constants/constants';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box component="header" className={styles.header}>
      <Typography className={styles.logo} onClick={() => navigate('/')}
        style={{ cursor: 'pointer' }}>
        WishCart 🛒
      </Typography>
      <Box component="form" role="search" className={styles.searchContainer}>
        <InputBase
          placeholder="Search products..."
          className={styles.searchInput}
        />
        <Button type="submit" variant="contained" className={styles.searchButton}>
          Search
        </Button>
      </Box>
      <Box component="nav" className={styles.nav}>
        {HeaderLinkList.map((section, index) => (
          <Link
            key={index}
            to={section.href}
            className={styles.navLink}
          >
            {section.linkTitle}
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Header;
