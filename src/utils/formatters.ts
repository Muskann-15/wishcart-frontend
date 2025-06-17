export const formatPrice = (price: string | number): string => {
  const numericPrice = typeof price === 'string' ? parseFloat(price.replace('₹', '')) : price;
  return `₹${numericPrice.toLocaleString('en-IN')}`;
}; 