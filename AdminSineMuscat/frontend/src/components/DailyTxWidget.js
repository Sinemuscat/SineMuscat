import React, { PureComponent } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Stack, TextField, Button } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {name: 'A', pv: 2400},
    {name: 'B', pv: 1398},
    {name: 'A', pv: 2400},
    {name: 'D', pv: 3908},
    {name: 'E', pv: 4800},
    {name: 'D', pv: 3908},
    {name: 'G', pv: 4300},
    {name: 'B', pv: 1398},
    {name: 'E', pv: 4800},
    {name: 'B', pv: 1398},
    {name: 'G', pv: 4300},
    {name: 'G', pv: 4300},
    {name: 'A', pv: 2400},
    {name: 'G', pv: 4300},
    {name: 'A', pv: 2400},
    {name: 'F', pv: 3800},
    {name: 'C', pv: 9800},
    {name: 'D', pv: 3908},
    {name: 'B', pv: 1398},
    {name: 'E', pv: 4800},
    {name: 'F', pv: 3800},
    {name: 'G', pv: 4300},
    {name: 'F', pv: 3800},
    {name: 'F', pv: 3800},
    {name: 'C', pv: 8800},
    {name: 'D', pv: 3908},
    {name: 'E', pv: 4800},
];

const TinyLineChart = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
            <Tooltip />
            <Line type="monotone" dataKey="pv" stroke="#0094FF" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
}

const FullLineChart = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{top: 10,right: 30,left: 5,bottom: 5}}>   
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#0094FF" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
}

const DailyTxWidget = ({fullHeight=false}) => {
    return (
        <Body>
            <WidgetTitle>Daily Transactions</WidgetTitle>
            <Box sx={{height: fullHeight ? '400px' : '200px', width: '100%'}}>
                {
                    fullHeight ?
                    <FullLineChart /> :
                    <TinyLineChart />
                }
            </Box>
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

export default DailyTxWidget;