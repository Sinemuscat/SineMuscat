import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Stack, Button, Paper, InputBase, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import MainBoard from '../pages/MainBoard';
import DailyTxBoard from '../pages/DailyTxBoard';
import TopAccCertBoard from '../pages/TopAccCertBoard';
import TopAccBuyingBoard from '../pages/TopAccBuyingBoard';

const FramePage = () => {
    
    const menuItems = ["Main Dashboard", "Daily Transactions", "Top Accounts - Certifications", "Top Accounts - Buy Prodoucts"];
    const pages = [<MainBoard />, <DailyTxBoard />, <TopAccCertBoard />, <TopAccBuyingBoard />];
    const [value, setValue] = useState(0);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    const navigate = useNavigate();

    const onClickHome = () => {
        setValue(0);
    };

    const onClickLogin = () => {
        navigate('/login');
    };
    
    return (
        <>
            {/* Header ------------------------------------------------------------------------------ */}
            <Frame>
                <Stack direction="row" alignItems='center' justifyContent='space-between'>
                    <Title onClick={onClickHome}>
                        <Stack direction="row" alignItems="end">
                            <MainTitle>SINEMUSCAT</MainTitle>
                            <SubTitle>Admin</SubTitle>
                        </Stack>
                    </Title>
                    <Stack direction="row" spacing={2}>
                        <LoginButton size="small" onClick={onClickLogin}><Typography>Log in</Typography></LoginButton>
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

            {/* Menu ------------------------------------------------------------------------------ */}
            <Box sx={{ flexGrow: 1, display: 'flex', padding: '0 40px 0 20px' }}>
                <MenuBox alignItems="start" justifyContent="start">
                    <WidgetTitle>Menu</WidgetTitle>
                    <ToggleButtonGroup
                        value={value}
                        exclusive
                        onChange={handleChange}
                        orientation="vertical"
                        sx={{ display: 'flex', gap: '5px' }}
                    >
                        {
                            menuItems.map((v, id) => {
                                if (id===value)
                                    return <MenuButton value={id} key={id} disabled><TextBox sx={{backgroundColor: '#F0F0F0'}}>{v}</TextBox></MenuButton>
                                else
                                    return <MenuButton value={id} key={id}><TextBox>{v}</TextBox></MenuButton>

                            })
                        }
                    </ToggleButtonGroup>
                </MenuBox>
                <Box sx={{flex: 1, marginLeft: '320px', marginBottom: '30px', width: '700px'}}>
                    {pages[value]}
                </Box>
            </Box>
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

const LoginButton = styled(Button)(() => ({
    fontSize: '14px', 
    color: 'white',
    backgroundColor: '#0094FF', 
    borderRadius: '10px',
    boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.1)',
    padding: '0 20px',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#34ABFF',
    },
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

const MenuBox = styled(Stack)(() => ({
    height: '260px',
    backgroundColor: '#FFF',
    padding: '20px 10px',
    paddingBottom: '50px',
    borderRadius: '15px',
    boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.1)',
    position: 'fixed', 
}));

const WidgetTitle = styled(Box)(() => ({
    color: '#C0C0C0',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
}));

const TextBox = styled(Box)(() => ({
    color: '#000',
    width: '250px',
    padding: '15px 15px',
    fontSize: '14px',
    fontWeight: 'bold',
    textAlign: 'left',
    borderRadius: '10px',
    '&:hover': {
        backgroundColor: '#F0F0F0',
    },
    '&.Mui-selected': {
        backgroundColor: '#F0F0F0',
    },
}));

const MenuButton = styled(ToggleButton)(() => ({
    padding: 0,
    margin: 0,
    border: 'none',
    backgroundColor: 'transparent',
    textTransform: 'none',
    '&:hover': {
        border: 'none',
        backgroundColor: 'transparent',
    },
    '&.Mui-selected': {
        border: 'none',
        backgroundColor: 'transparent',
    },
}));

export default FramePage;