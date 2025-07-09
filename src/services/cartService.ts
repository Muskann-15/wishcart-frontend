import { API_BASE_URL } from '../constants/api';
import Axios from '../utils/axios';

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  imageUrl: string;
}

interface ProductDetails {
  id?: string;
  _id?: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface BackendCartProduct {
  productId: ProductDetails | string | null;
  quantity: number;
  price: number;
  name?: string;
  imageUrl?: string;
}

export interface BackendCart {
  id: string;
  userId: string;
  products: BackendCartProduct[];
  totalAmount: number;
  productId?: string;
  name?: string;
  category?: string;
  price?: number;
  imageUrl?: string;
  quantity?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export const cartService = {
  async addToCart(productId: string, quantity: number, price: number): Promise<ApiResponse<CartItem>> {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      return { success: false, message: 'Authentication token not found.' };
    }

    const payload = {
      productId,
      quantity: Number(quantity),
      price: Number(price)
    };

    try {
      const response = await Axios.post<ApiResponse<CartItem>>(`${API_BASE_URL}/cart/add`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error adding product to cart:', error);
      return { success: false, message: error.response?.data?.message || error.message || 'Failed to add product to cart.' };
    }
  },

  async removeFromCart(productId: string): Promise<ApiResponse<CartItem>> {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      return { success: false, message: 'Authentication token not found.' };
    }

    try {
      const response = await Axios.delete<ApiResponse<CartItem>>(`${API_BASE_URL}/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error removing product from cart:', error);
      return { success: false, message: error.response?.data?.message || error.message || 'Failed to remove product from cart.' };
    }
  },

  async getCart(): Promise<ApiResponse<BackendCart>> {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      return { success: false, message: 'Authentication token not found.' };
    }

    try {
      const response = await Axios.get<ApiResponse<BackendCart>>(`${API_BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching cart:', error);
      return { success: false, message: error.response?.data?.message || error.message || 'Failed to fetch cart.' };
    }
  },
}; 