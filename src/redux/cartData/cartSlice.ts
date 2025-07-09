import { createSlice } from '@reduxjs/toolkit';
import type { ICartItem } from '../../types/UserTypes';
import type { BackendCartProduct } from '../../services/cartService';
import { fetchCart } from './cartApi';

interface CartState {
  items: ICartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = (action.payload || []).map((item: BackendCartProduct) => ({
          productId: typeof item.productId === 'object' && item.productId !== null ? item.productId._id || '' : (typeof item.productId === 'string' ? item.productId : ''),
          quantity: item.quantity,
          price: item.price,
          _id: (typeof item.productId === 'object' && item.productId !== null ? item.productId._id || '' : (typeof item.productId === 'string' ? item.productId : '')),
          name: item.name || (typeof item.productId === 'object' && item.productId !== null ? item.productId.name : undefined),
          imageUrl: item.imageUrl || (typeof item.productId === 'object' && item.productId !== null ? item.productId.imageUrl : undefined),
        }));
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
