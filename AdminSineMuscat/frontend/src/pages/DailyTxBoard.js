import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Stack, TextField, Button } from '@mui/material';

import DailyTxWidget from '../components/DailyTxWidget';

const DailyTxBoard = () => {
    return (
        <>
            <DailyTxWidget fullHeight={true} />
        </>
    );
};


export default DailyTxBoard;