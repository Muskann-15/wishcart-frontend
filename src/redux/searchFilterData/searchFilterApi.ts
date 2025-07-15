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
    products?: any[];
    totalCount?: number;
  };
}

export const fetchFilteredCategoryProducts = createAsyncThunk<
  { products: Product[]; totalCount: number },
  FilterParams & { page: number; limit: number },
  { rejectValue: string }
>(
  'categoryProducts/fetchFiltered',
  async ({ gender, params, page, limit }, thunkAPI) => {
    try {
      const searchParams = new URLSearchParams({ ...params, page: String(page), limit: String(limit) }).toString();
      const res = await Axios.get<ApiResponse>(`/category-products?gender=${gender}&${searchParams}`);
      let products: any[] = [];
      let totalCount = 0;
      if (Array.isArray(res.data.data?.products)) {
        products = res.data.data.products;
        totalCount = res.data.data.totalCount || 0;
      } else {
        const { clothing = [], accessories = [] } = res.data.data || {};
        products = [...clothing, ...accessories];
        totalCount = res.data.data?.totalCount || products.length;
      }
      const mapProduct = (item: any) => ({
        ...item,
        id: item.id || item._id || item.productId || '',
      });
      return { products: products.map(mapProduct), totalCount };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Fetch failed');
    }
  }
);
