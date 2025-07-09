import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../utils/axios';

export const fetchCart = createAsyncThunk('fetchCart', async (_, { rejectWithValue }) => {
  try {
    const response = await Axios.get('/cart');
    return (response.data as any).data.products;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
  }
});

export const addToCart = createAsyncThunk(
  'addToCart',
  async ({ productId, quantity, price }: { productId: string; quantity: number; price: number }, { dispatch, rejectWithValue }) => {
    try {
      const response = await Axios.post('/cart/add', { productId, quantity, price });
      dispatch(fetchCart());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'removeFromCart',
  async (productId: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await Axios.delete(`/cart/${productId}`);
      dispatch(fetchCart());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove from cart');
    }
  }
);
