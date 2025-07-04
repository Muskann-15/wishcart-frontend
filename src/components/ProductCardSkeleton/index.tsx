import React from 'react';
import { Card, CardContent, Skeleton } from '@mui/material';

const ProductCardSkeleton: React.FC = () => (
  <Card>
    <Skeleton variant="rectangular" height={180} />
    <CardContent>
      <Skeleton variant="text" width="60%" height={32} />
      <Skeleton variant="text" width="40%" height={24} />
      <Skeleton variant="text" width="80%" height={24} />
    </CardContent>
  </Card>
);

export default ProductCardSkeleton; 