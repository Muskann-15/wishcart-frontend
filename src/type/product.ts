export type Product = {
  id: string;
  name: string;
  title?: string;
  imageUrl: string;
  price: number;
  description?: string;
  quantity?: number;
  isWishlisted?: boolean;
  category?: string;
  quickBuyQuantity?: number;
  colors?: string[];
  sizes?: string[];
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
};
