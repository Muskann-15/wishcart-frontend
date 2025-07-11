import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../utils/axios";
import type { Product } from "../../type/product";

interface FilterParams {
  gender: string;
  params: Record<string, any>;
}

interface ApiResponse {
  success: boolean;
  data: {
    clothing?: Product[];
    accessories?: Product[];
  };
}

export const fetchFilteredCategoryProducts = createAsyncThunk<
  Product[],
  FilterParams,
  { rejectValue: string }
>(
  'categoryProducts/fetchFiltered',
  async ({ gender, params }, thunkAPI) => {
    try {
      const searchParams = new URLSearchParams(params).toString();
      const res = await Axios.get<ApiResponse>(`/category-products/${gender}?${searchParams}`);
      const { clothing = [], accessories = [] } = res.data.data || {};
      const mapProduct = (item: any) => ({
        ...item,
        id: item.id || item._id || item.productId || '',
      });
      return [
        ...clothing.map(mapProduct),
        ...accessories.map(mapProduct)
      ];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Fetch failed');
    }
  }
);
