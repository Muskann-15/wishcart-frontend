import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/userData/userSlice'

export const store = configureStore({
    reducer : {
        userState: userReducer,
        categoryState: userReducer
    }
});