import React from 'react';
import { Box, Skeleton } from '@mui/material';

const CategoryFilterSkeleton: React.FC = () => (
  <Box>
    <Skeleton variant="text" width="80%" height={32} />
    <Skeleton variant="rectangular" width="100%" height={40} sx={{ my: 1 }} />
    <Skeleton variant="text" width="60%" height={28} />
    <Skeleton variant="rectangular" width="100%" height={40} sx={{ my: 1 }} />
    <Skeleton variant="text" width="70%" height={28} />
    <Skeleton variant="rectangular" width="100%" height={40} sx={{ my: 1 }} />
  </Box>
);

export default CategoryFilterSkeleton; 