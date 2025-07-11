import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/userData/userSlice'
import cartReducer from '../redux/cartData/cartSlice';
import categoryProductsReducer from '../redux/searchFilterData/searchFilterSlice';

export const store = configureStore({
    reducer : {
        userState: userReducer,
        categoryState: userReducer,
        cart: cartReducer,
        categoryProducts: categoryProductsReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
