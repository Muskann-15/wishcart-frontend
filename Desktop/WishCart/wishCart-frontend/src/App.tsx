import React from 'react';
import { MainLayout } from './components';
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../src/constants/theme.ts";
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './components/AppRoutes/index.tsx';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
