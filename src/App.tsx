import React from 'react';
import { Provider } from "react-redux"
import { ThemeProvider, CssBaseline } from "@mui/material";
import { MainLayout } from './components';
import theme from "./constants/theme.ts";
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './components/AppRoutes/index.tsx';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import './index.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import { store } from './config/store.ts';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
      <UserProvider>
        <CartProvider>
          <BrowserRouter>
            <MainLayout>
              <AppRoutes />
            </MainLayout>
          </BrowserRouter>
        </CartProvider>
      </UserProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
