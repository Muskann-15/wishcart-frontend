import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from './searchBar.module.scss';

const SearchBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setCurrentSearchTerm(params.get('search') || '');
  }, [location.search]);

  const triggerSearch = () => {
    const searchParams = new URLSearchParams(location.search);
    if (currentSearchTerm) {
      searchParams.set('search', currentSearchTerm);
    } else {
      searchParams.delete('search');
    }
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      triggerSearch();
    }
  };

  return (
    <Box className={styles.searchBarContainer}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search products..."
        value={currentSearchTerm}
        onChange={(e) => setCurrentSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">

            </InputAdornment>
          ),
        }}
        className={styles.searchInput}
      />
      <Button variant="contained" onClick={triggerSearch} className={styles.searchButton}>
        <SearchIcon />
      </Button>
    </Box>
  );
};

export default SearchBar; 