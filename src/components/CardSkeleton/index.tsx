import React from 'react';
import { Box, Card, CardContent, Skeleton } from '@mui/material';

export const ProductCardSkeleton: React.FC = () => (
  <Card>
    <Skeleton variant="rectangular" height={180} />
    <CardContent>
      <Skeleton variant="text" width="60%" height={32} />
      <Skeleton variant="text" width="40%" height={24} />
      <Skeleton variant="text" width="80%" height={24} />
    </CardContent>
  </Card>
);

export const CategoryFilterSkeleton: React.FC = () => (
  <Box>
    <Skeleton variant="text" width="80%" height={32} />
    <Skeleton variant="rectangular" width="100%" height={40} sx={{ my: 1 }} />
    <Skeleton variant="text" width="60%" height={28} />
    <Skeleton variant="rectangular" width="100%" height={40} sx={{ my: 1 }} />
    <Skeleton variant="text" width="70%" height={28} />
    <Skeleton variant="rectangular" width="100%" height={40} sx={{ my: 1 }} />
  </Box>
);