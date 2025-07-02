import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
    userData: {},
    loading: boolean
  }

const initialState: InitialStateType = {
    userData: {},
    loading: false
} 

const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateLoadingValue: (state, action) => {
            console.log("action", action)
            state.loading = action.payload
        }
    }
})

export const { updateLoadingValue } = userReducer.actions;
export default userReducer.reducer;