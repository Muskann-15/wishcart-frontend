export interface Statistic {
  value: string;
  label: string;
}

export const statistics: Statistic[] = [
  {
    value: '10K+',
    label: 'Happy Customers'
  },
  {
    value: '500+',
    label: 'Premium Products'
  },
  {
    value: '4.9★',
    label: 'Customer Rating'
  }
]; 

export const DummyProducts = [
  {
    productId: 'dummy1',
    name: 'Demo Leather Bag',
    imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
    price: 650,
    quantity: 1,
  },
  {
    productId: 'dummy2',
    name: 'Demo Silk Scarf',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    price: 160,
    quantity: 2,
  },
];
