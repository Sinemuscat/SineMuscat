import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Stack, TextField, Button, Grid } from '@mui/material';

import DailyTxWidget from '../components/DailyTxWidget';
import TopAccCertWidget from '../components/TopAccCertWidget';
import TopAccBuyingWidget from '../components/TopAccBuyingWidget';

const MainBoard = () => {
    return (
        <Grid container rowSpacing={2} columnSpacing={5}>
            <Grid item xs={12}><DailyTxWidget /></Grid>
            <Grid item xs={6}><TopAccCertWidget /></Grid>
            <Grid item xs={6}><TopAccBuyingWidget /></Grid>
        </Grid>
    );
};


export default MainBoard;