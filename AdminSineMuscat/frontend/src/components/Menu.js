import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';

import MainBoard from '../pages/MainBoard';
import DailyTxBoard from '../pages/DailyTxBoard';
import TopAccCertBoard from '../pages/TopAccCertBoard';
import TopAccBuyingBoard from '../pages/TopAccBuyingBoard';

const Menu = ({index=0}) => {
    const menuItems = ["Main Dashboard", "Daily Transactions", "Top Accounts - Certifications", "Top Accounts - Buy Prodoucts"];
    const pages = [<MainBoard />, <DailyTxBoard />, <TopAccCertBoard />, <TopAccBuyingBoard />];
    const [value, setValue] = useState(index);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <>
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
                <Box sx={{flex: 1, marginLeft: '320px'}}>{pages[value]}</Box>
            </Box>
        </>
    );
};

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

export default Menu;