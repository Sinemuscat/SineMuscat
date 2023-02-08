import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Grid, Avatar, Button } from '@mui/material';

function Header() {
    const navigate = useNavigate();
    const onClickHome = () => {
        navigate('/');
    };
    const onClickUser = () => {
        navigate('/login');
    };

    return (
        <>
            <Frame>
                <Grid container alignItems='center'>
                    <Grid item xs={2}><Title onClick={onClickHome}>SINEMUSCAT</Title></Grid>
                    <Grid item xs={3.8} />
                    <Grid item xs={1.8}><Menu>봉사 인증서 관리</Menu></Grid>
                    <Grid item xs={1.8}><Menu>포인트 사용</Menu></Grid>
                    <Grid item xs={1.8}><Menu>2000 points</Menu></Grid>
                    <Grid item xs={0.8} sx={{paddingLeft: 1}}><User onClick={onClickUser}><CustomAvatar /></User></Grid>
                </Grid>
            </Frame>
            <Box sx={{height: 80}} />
        </>
    );
}

const Frame = styled(Box)(() => ({
    padding: '10px 20px 10px 20px', 
    height: 60,
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
    fontSize: 24,
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
    fontSize: 16,
    color: 'black',
    '&:hover': {
        backgroundColor: 'transparent',
        color: 'grey',
      },
}));

const User = styled(Button)(() => ({
    // border: '1px dashed #A09',
    padding: 0,
    '&:hover': {
        backgroundColor: 'transparent',
      },
}));

const CustomAvatar = styled(Avatar)(() => ({
    '&:hover': {
        backgroundColor: '#D9D9D9',
      },
}));

export default Header;