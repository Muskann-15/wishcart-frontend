import { createSlice } from "@reduxjs/toolkit";
import { fetchFilteredCategoryProducts } from "./searchFilterApi";
import type { Product } from "../../type/product";

interface CategoryProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryProductState = {
  products: [],
  loading: false,
  error: null,
};

const categoryProductsSlice = createSlice({
  name: 'categoryProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredCategoryProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredCategoryProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchFilteredCategoryProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categoryProductsSlice.reducer;