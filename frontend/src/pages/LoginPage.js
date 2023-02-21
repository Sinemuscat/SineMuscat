import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Grid, Button, TextField } from '@mui/material';
import Header from '../components/Header';
import kakao from '../images/kakao_logo.png';

function LoginPage() {
    const navigate = useNavigate();
    const onClickSignup = () => {
        navigate('/signup');
    };

    const onClickFindPw = () => {
        navigate('/findpw');
    };

    return (
        <>
            <Header />
            <Title>로그인</Title>
            <Body>
                <TextField 
                    fullWidth 
                    label="아이디"
                    margin="dense"
                    inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                    InputLabelProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                />
                <TextField 
                    fullWidth 
                    label="비밀번호"
                    margin="dense"
                    type="password"
                    inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                    InputLabelProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                />
                <LoginButton>로그인</LoginButton>
                <SubGrid container justifyContent='space-between'>
                    <SubButton onClick={onClickSignup}>회원가입</SubButton>
                    <SubButton onClick={onClickFindPw}>아이디/비밀번호 찾기</SubButton>
                </SubGrid>
                <Box sx={{width: '100%', height: '1px', backgroundColor: 'lightgrey', marginTop: 5}} />
                <KakaoButton><img src={kakao} width={20} alt="img"/><Box sx={{width: 10}} />카카오로 시작하기</KakaoButton>
            </Body>
        </>
    );
}

const Title = styled(Box)(() => ({
    padding: '50px 0 30px 0', 
    textAlign: 'center', 
    fontFamily: 'PretendardB', 
    fontSize: 22,
}));

const Body = styled(Box)(() => ({
    display: 'block',
    position: 'relative',
    left: '50%',
    width: 320,
    marginTop: 10,
    transform: 'translate(-50%, 0)', 
}));

const LoginButton = styled(Button)(() => ({
    width: '100%',
    marginTop: 20,
    padding: 12,
    fontFamily: 'PretendardM', 
    fontSize: 16, 
    boxShadow: 'none', 
    color: 'white',
    backgroundColor: '#0094FF', 
    '&:hover': {
        backgroundColor: '#34ABFF',
    },
}));

const SubGrid = styled(Grid)(() => ({
    marginTop: 10,
}));

const SubButton = styled(Button)(() => ({
    display: 'inline',
    position: 'relative',
    padding: 0,
    minWidth: 0,
    fontFamily: 'PretendardL', 
    fontSize: 12, 
    boxShadow: 'none',
    color: 'lightgrey',
    '&:hover': {
        color: 'black',
        backgroundColor: 'transparent'
    },
}));

const KakaoButton = styled(Button)(() => ({
    width: '100%',
    marginTop: 40,
    padding: 12,
    fontFamily: 'PretendardL', 
    fontSize: 16, 
    boxShadow: 'none', 
    color: 'black',
    backgroundColor: '#FEE500', 
    '&:hover': {
        backgroundColor: '#FEE500B1',
    },
}));

export default LoginPage;