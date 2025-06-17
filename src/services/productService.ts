import axios from 'axios';
import type { Product, ApiResponse } from '../type/product';
import { API_BASE_URL } from '../constants/api';

export const fetchProductsByCategory = async (category: string, signal?: AbortSignal): Promise<ApiResponse<Product[]>> => {
  try {
    const response = await axios.get<ApiResponse<Product[]>>(`${API_BASE_URL}/subproducts/by-category`, {
      params: { category },
      headers: {
        'Content-Type': 'application/json'
      },
      ...(signal && { signal })
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const fetchProductById = async (id: string, signal?: AbortSignal): Promise<ApiResponse<Product>> => {
  try {
    const response = await axios.get<ApiResponse<Product>>(`${API_BASE_URL}/products/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      ...(signal && { signal })
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch product by ID:', error);
    throw error;
  }
};

export const fetchBestSellers = async (signal?: AbortSignal): Promise<ApiResponse<Product[]>> => {
  try {
    const response = await axios.get<ApiResponse<Product[]>>(`${API_BASE_URL}/best-sellers`, {
      headers: {
        'Content-Type': 'application/json'
      },
      ...(signal && { signal })
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch best sellers:', error);
    throw error;
  }
};

export const fetchNewArrivals = async (signal?: AbortSignal): Promise<ApiResponse<Product[]>> => {
  try {
    const response = await axios.get<ApiResponse<Product[]>>(`${API_BASE_URL}/new-arrivals`, {
      headers: {
        'Content-Type': 'application/json'
      },
      ...(signal && { signal })
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch new arrivals:', error);
    throw error;
  }
};
