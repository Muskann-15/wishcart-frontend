import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../utils/axios';

export const fetchUserDetail = createAsyncThunk('fetchUserDetail', async (_, { rejectWithValue }) => {
  try {
    const response = await Axios.get('/user/details');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Something went wrong while fetching users');
  }
});