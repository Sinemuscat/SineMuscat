import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Stack, Avatar, Button } from '@mui/material';

function Header() {
    const [login, setLogin] = useState(true);
    const navigate = useNavigate();
    
    const onClickHome = () => {
        navigate('/');
    };

    const onClickUser = () => {
        if(login === false) {
            navigate('/login');
        } else {
            navigate('/mypage');
        }
    };

    const onClickCert = () => {
        navigate('/managecertifications');
    };

    const onClickUsePoints = () => {
        navigate('/usepoints');
    };

    const onClickManagePoints = () => {
        navigate('/managepoints');
    };

    return (
        <>
            <Frame>
                <Stack direction="row" alignItems='center' justifyContent='space-between'>
                    <Box><Title onClick={onClickHome}>SINEMUSCAT</Title></Box>
                    <Stack direction="row" spacing={5}>
                        <Box><Menu onClick={onClickCert}>봉사 인증서 관리</Menu></Box>
                        <Box><Menu onClick={onClickUsePoints}>포인트 사용</Menu></Box>
                        <Box><Menu onClick={onClickManagePoints}>2000 points</Menu></Box>
                        {
                            login ? 
                            <LoginAvatar onClick={onClickUser}>GJ</LoginAvatar> :
                            <CustomAvatar onClick={onClickUser} />
                        }
                    </Stack>
                </Stack>
            </Frame>
            <Box sx={{height: 60}} />
        </>
    );
}

const Frame = styled(Box)(() => ({
    padding: '5px 30px 5px 20px', 
    backgroundColor: 'white',
    position: 'fixed', 
    top: 0, 
    left: 0, 
    right: 0,
    zIndex: 999,
}));

const Title = styled(Button)(() => ({
    // border: '1px dashed #D09', 
    textAlign: 'center', 
    fontFamily: 'PretendardB', 
    fontSize: 22,
    color: 'black',
    '&:hover': {
        backgroundColor: 'transparent',
        color: 'grey',
      },
}));

const Menu = styled(Button)(() => ({
    // border: '1px dashed #F09', 
    width: '100%',
    textAlign: 'center', 
    fontFamily: 'PretendardL',
    fontSize: 14,
    color: 'black',
    '&:hover': {
        backgroundColor: 'transparent',
        color: 'grey',
      },
}));

const LoginAvatar = styled(Avatar)(() => ({
    height: 35,
    width: 35,
    backgroundColor: '#6323BD',
    '&:hover': {
        backgroundColor: '#6323BDBF',
        cursor: 'pointer'
      },
}));

const CustomAvatar = styled(Avatar)(() => ({
    height: 35,
    width: 35,
    '&:hover': {
        backgroundColor: '#D9D9D9',
        cursor: 'pointer'
      },
}));

export default Header;