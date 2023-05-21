import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Stack, Button, Paper, InputBase, Typography } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const Header = () => {
    const navigate = useNavigate();

    const onClickHome = () => {
        navigate('/');
    };

    return (
        <>
            <Frame>
                <Stack direction="row" alignItems='center' justifyContent='space-between'>
                    <Title onClick={onClickHome}>
                        <Stack direction="row" alignItems="end">
                            <MainTitle>SINEMUSCAT</MainTitle>
                            <SubTitle>Admin</SubTitle>
                        </Stack>
                    </Title>
                    <Stack direction="row" spacing={2}>
                        <SearchField component="form">
                          <SearchRoundedIcon sx={{fontSize: 18, color: 'grey'}}/>
                          <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="사용자 이름, 지갑 주소 등 검색"
                            inputProps={{style: {fontSize: '14px', fontFamily: 'PretendardL'}}}
                          />
                        </SearchField>
                    </Stack>
                </Stack>
            </Frame>
            <Box sx={{height: 100}} />
        </>
    );
};

const Frame = styled(Box)(() => ({
    padding: '15px 20px', 
    backgroundColor: 'white',
    position: 'fixed', 
    top: 0, 
    left: 0, 
    right: 0,
    zIndex: 999,
}));

const Title = styled(Button)(() => ({
    textTransform: 'none',
    '&:hover': {
        backgroundColor: 'transparent',
        color: 'grey',
      },
}));

const MainTitle = styled(Box)(() => ({
    textAlign: 'center', 
    fontFamily: 'PretendardB', 
    fontSize: 22,
    color: 'black',
    marginRight: 5,
}));

const SubTitle = styled(Box)(() => ({
    textAlign: 'center',  
    fontSize: 16,
    color: 'black',
    paddingBottom: 2,
}));

const SearchField = styled(Paper)(() => ({
    display: 'flex', 
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '400px',
    boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.1)',
    padding: '4px 6px',
    borderColor: '#F0F0F0',
    borderRadius: '10px',
}));

export default Header;