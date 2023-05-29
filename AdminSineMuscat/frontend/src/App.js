import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';

import FramePage from './pages/FramePage';
import LoginPage from './pages/LoginPage';
import UserDetailPage from './pages/UserDetailPage';

function App() {
  return (
    <>
      <ThemeProvider theme={THEME}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FramePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/userdetail" element={<UserDetailPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

const THEME = createTheme({
  typography: {
    fontFamily: "PretendardL",
    fontSize: 12,
  }
});

export default App;
