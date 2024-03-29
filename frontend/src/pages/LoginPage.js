import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Grid, Button, TextField } from '@mui/material';

import Header from '../components/Header';
import Users from '../data/Users';

function LoginPage() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const onClickSignup = () => {
        navigate('/signup');
    };

    const onClickFindPw = () => {
        navigate('/findpw');
    };

    const onClickLogin = () => {
        // console.log({id: id, password: password})
        if (!id) {
            alert("아이디를 입력해주세요.")
        }
        else if (!Object.keys(Users).includes(id)) {
            alert("아이디가 존재하지 않습니다.")
        }
        else if (Users[id].password !== password) {
            alert("비밀번호가 일치하지 않습니다.")
        }
        else {
            alert(`${Users[id].name}님, 로그인 되었습니다.`)
            sessionStorage.setItem('userId', id)
            sessionStorage.setItem('userColor', '#'+Math.floor(Math.random()*16777215).toString(16))
            console.log(sessionStorage.getItem('userId'))
            console.log(sessionStorage.getItem('userColor'))
            navigate('/');
        }
    };

    return (
        <>
            <Header />
            <Title>로그인</Title>
            <Body>
                <TextField 
                    fullWidth 
                    label="아이디"
                    value={id}
                    onChange={(event) => {
                        setId(event.target.value);
                    }}
                    margin="dense"
                    inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                    InputLabelProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                />
                <TextField 
                    fullWidth 
                    label="비밀번호"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                    margin="dense"
                    type="password"
                    inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                    InputLabelProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                />
                <LoginButton onClick={onClickLogin}>로그인</LoginButton>
                <SubGrid container justifyContent='space-between'>
                    <SubButton onClick={onClickSignup}>회원가입</SubButton>
                    <SubButton onClick={onClickFindPw}>아이디/비밀번호 찾기</SubButton>
                </SubGrid>
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
    paddingBottom: 80,
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