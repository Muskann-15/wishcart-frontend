import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Slider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { categories, ratings } from '../../constants/constants';
import styles from './categoryFilter.module.scss';

const CategoryFilter: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getSearchParams = useCallback(() => new URLSearchParams(location.search), [location.search]);

  const getPriceRangeFromUrl = useCallback(() => {
    const params = getSearchParams();
    const minPrice = parseInt(params.get('minPrice') || '0', 10);
    const maxPrice = parseInt(params.get('maxPrice') || '1000', 10);
    return [minPrice, maxPrice];
  }, [getSearchParams]);

  const [localPriceRange, setLocalPriceRange] = useState<number[]>(getPriceRangeFromUrl());
  const [expandedAccordions, setExpandedAccordions] = useState<Record<string, boolean>>({
    categories: false,
    priceRange: false,
    ratings: false,
  });

  useEffect(() => {
    setAccordionProperties();
  }, [location.search, getPriceRangeFromUrl, getSearchParams]);

  const setAccordionProperties = () => {
    setLocalPriceRange(getPriceRangeFromUrl());

    const params = getSearchParams();
    setExpandedAccordions({
      categories: params.has('categories'),
      priceRange: params.has('minPrice') || params.has('maxPrice'),
      ratings: params.has('ratings'),
    });
  }

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedAccordions((prev) => ({
      ...prev,
      [panel]: isExpanded,
    }));
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    const newRange = newValue as number[];
    setLocalPriceRange(newRange);

    const params = getSearchParams();
    params.set('minPrice', newRange[0].toString());
    params.set('maxPrice', newRange[1].toString());
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const handleCheckboxChange = (filterType: string, value: string, checked: boolean) => {
    const params = getSearchParams();
    let currentValues = params.get(filterType) ? params.get(filterType)!.split(',') : [];

    if (checked) {
      if (!currentValues.includes(value)) {
        currentValues.push(value);
      }
    } else {
      currentValues = currentValues.filter(item => item !== value);
    }

    if (currentValues.length > 0) {
      params.set(filterType, currentValues.join(','));
    } else {
      params.delete(filterType);
    }
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const isChecked = useCallback((filterType: string, value: string) => {
    const params = getSearchParams();
    const currentValues = params.get(filterType) ? params.get(filterType)!.split(',') : [];
    return currentValues.includes(value);
  }, [getSearchParams]);

  return (
    <Box className={styles.filterContainer}>
      <Typography variant="h6" className={styles.filterTitle}>
        Filters
      </Typography>

      <Accordion expanded={expandedAccordions.categories} onChange={handleAccordionChange('categories')} className={styles.filterAccordion}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Categories</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {categories.map((category) => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox
                  checked={isChecked('categories', category)}
                  onChange={(e) => handleCheckboxChange('categories', category, e.target.checked)}
                />
              }
              label={category}
              className={styles.filterCheckbox}
            />
          ))}
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expandedAccordions.priceRange} onChange={handleAccordionChange('priceRange')} className={styles.filterAccordion}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Price Range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box className={styles.priceSlider}>
            <Slider
              value={localPriceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
            />
            <Box className={styles.priceInputs}>
              <Typography>₹{localPriceRange[0]}</Typography>
              <Typography>₹{localPriceRange[1]}</Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expandedAccordions.ratings} onChange={handleAccordionChange('ratings')} className={styles.filterAccordion}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Ratings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {ratings.map((rating) => (
            <FormControlLabel
              key={rating}
              control={
                <Checkbox
                  checked={isChecked('ratings', rating)}
                  onChange={(e) => handleCheckboxChange('ratings', rating, e.target.checked)}
                />
              }
              label={rating}
              className={styles.filterCheckbox}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default CategoryFilter; 