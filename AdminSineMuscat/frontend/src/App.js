import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';

import FramePage from './pages/FramePage';
import UserDetailPage from './pages/UserDetailPage';
import TxDetailPage from './pages/TxDetailPage';

function App() {
  return (
    <>
      <ThemeProvider theme={THEME}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FramePage />} />
            <Route path="/userdetail" element={<UserDetailPage />} />
            <Route path="/txdetail" element={<TxDetailPage />} />
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
