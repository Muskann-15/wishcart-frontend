import React from 'react';
import { MainLayout } from './components';
import { ThemeProvider, CssBaseline } from "@mui/material";
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

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <CartProvider>
          <BrowserRouter>
            <MainLayout>
              <AppRoutes />
            </MainLayout>
          </BrowserRouter>
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
