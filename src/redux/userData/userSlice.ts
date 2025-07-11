import { createSlice } from "@reduxjs/toolkit";
import { fetchUserDetail } from "./userApi";
import type { IUser } from "../../types/UserTypes";

interface InitialStateType {
    userData: IUser,
    loading: boolean,
    error: string, 
  }

const initialState: InitialStateType = {
    userData: {} as IUser,
    loading: false,
    error: "", 
} 

const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateLoadingValue: (state, action) => {
            state.loading = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchUserDetail.fulfilled, (state, action) => {
            state.userData = (action.payload as { data: IUser }).data
        })
    }
})

export const { updateLoadingValue } = userReducer.actions;
export default userReducer.reducer;