import React from 'react';
import { Box, Typography, Slider, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import styles from './filter.module.scss';
import { FilterColour, FilterProductType } from '../../constants/constants';

type FilterProps = {
  priceRange: number[];
  onPriceChange: (event: Event, newValue: number | number[]) => void;
};

const Filters: React.FC<FilterProps> = ({ priceRange, onPriceChange }) => {
  return (
    <Box className={styles.filters}>
      <Typography className={styles.label}>Filter by Price</Typography>
      <Slider
        value={priceRange}
        onChange={onPriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={5000}
      />
      <Typography className={styles.label}>Product Type</Typography>
      <FormGroup>
        {FilterProductType.map((item, index) => (
          <FormControlLabel key={index} control={<Checkbox />} label={item.label} />
        ))}
      </FormGroup>
      <Typography className={styles.label}>Colour</Typography>
      <FormGroup>
        {FilterColour.map((item, index) => (
          <FormControlLabel key={index} control={<Checkbox />} label={item.label} />
        ))}
      </FormGroup>
    </Box>
  );
};

export default Filters;
