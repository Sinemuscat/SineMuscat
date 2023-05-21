import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Stack, TextField, Button } from '@mui/material';

const TopAccBuyingWidget = ({fullHeight=false}) => {
    return (
        <Body>
            <WidgetTitle>Top Accounts - Buying Prodoucts</WidgetTitle>
            <Box sx={{backgroundColor: 'pink', height: fullHeight ? '400px' : '200px', width: '100%'}} />
        </Body>
    );
};

const Body = styled(Stack)(() => ({
    // height: '260px',
    width: '100%',
    backgroundColor: '#FFF',
    padding: '20px 10px',
    borderRadius: '15px',
    boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.1)',
}));

const WidgetTitle = styled(Box)(() => ({
    color: '#C0C0C0',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
}));

export default TopAccBuyingWidget;