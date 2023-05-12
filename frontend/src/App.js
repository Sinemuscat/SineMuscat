import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import SignupPage from './pages/SignupPage';
import FindPwPage from './pages/FindPwPage';
import MyPage from './pages/MyPage';
import PurchaseHistoryPage from './pages/PurchaseHistoryPage';
import ManagePointsPage from './pages/ManagePointsPage';
import ManageCertificationsPage from './pages/ManageCertificationsPage';
import UsePointsPage from './pages/UsePointsPage';
import EditUserInfoPage from './pages/EditUserInfoPage';
import CreateCertificationsPage from './pages/CreateCertificationsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import PurchaseResultPage from './pages/PurchaseResultPage';


function App() {
<<<<<<< Updated upstream
  // 아이디 'dnjsrbwls'으로 항시 로그인
  sessionStorage.setItem('userId', 'dnjsrbwls');
  sessionStorage.setItem('userColor', '#'+Math.floor(Math.random()*16777215).toString(16));
=======
  // console.log(sessionStorage.getItem('userId'))
  // sessionStorage.clear()
  // 아이디 'dnjsrbwls'으로 항시 로그인
  sessionStorage.setItem('userId', 'dnjsrbwls');
  sessionStorage.setItem('userColor', '#'+Math.floor(Math.random()*16777215).toString(16));
  
>>>>>>> Stashed changes

  return (
    <>
      <ThemeProvider theme={THEME}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/findpw" element={<FindPwPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/purchasehistory" element={<PurchaseHistoryPage />} />
            <Route path="/managepoints" element={<ManagePointsPage />} />
            <Route path="/usepoints" element={<UsePointsPage />} />
            <Route path="/managecertifications" element={<ManageCertificationsPage />} />
            <Route path="/edituserinfo" element={<EditUserInfoPage />} />
            <Route path="/createcertifications" element={<CreateCertificationsPage />} />
            <Route path="/productdetail" element={<ProductDetailPage />} />
            <Route path="/purchaseresult" element={<PurchaseResultPage />} />
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
