import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';

import FramePage from './pages/FramePage';

function App() {
  return (
    <>
      <ThemeProvider theme={THEME}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FramePage />} />
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
