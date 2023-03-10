import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Grid, Stack, Button } from '@mui/material';
import Header from '../components/Header';

function PurchaseHistoryPage() {
    return (
        <>
            <Header />
            <Title>구매내역 조회</Title>
            <Body>
                <Badge sx={{width: '55px'}}>미사용</Badge>
                <HistoryStack container>
                    <Grid item xs={2}>
                        <ProductImg />
                    </Grid>
                    <Grid item xs={8}>
                        <ProductDetail justifyContent="space-between">
                            <Stack spacing={0.5}>
                                <Brand>CU</Brand>
                                <ProductName>츄파춥스</ProductName>
                            </Stack>
                            <Date>2022-02-01 구매 / 2023-02-01 까지</Date>
                        </ProductDetail>
                    </Grid>
                    <Grid item xs={2}>
                        <Status>사용 전</Status>
                    </Grid>
                </HistoryStack>
                <Badge sx={{width: '165px'}}>사용완료 및 유효기간 만료</Badge>
                {
                    [0,0,0,0,0,0].map(() => {
                        return (
                            <HistoryStack container>
                                <Grid item xs={2}>
                                    <ProductImg />
                                </Grid>
                                <Grid item xs={8}>
                                    <ProductDetail justifyContent="space-between">
                                        <Stack spacing={0.5}>
                                            <Brand sx={{color: 'lightgrey'}}>CU</Brand>
                                            <ProductName sx={{color: 'lightgrey'}}>츄파춥스</ProductName>
                                        </Stack>
                                        <Date sx={{color: 'lightgrey'}}>2021-02-01 구매 / 2022-02-01 까지</Date>
                                    </ProductDetail>
                                </Grid>
                                <Grid item xs={2}>
                                    <Status sx={{color: 'lightgrey'}}>사용 완료</Status>
                                </Grid>
                            </HistoryStack>
                        )
                    })
                }
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

const Body = styled(Stack)(() => ({
    position: 'relative',
    left: '50%',
    transform: 'translate(-50%, 0)', 
    width: 750,
    paddingBottom: 50,
}));

const Badge = styled(Box)(() => ({
    backgroundColor: '#0094FF',
    color: 'white',
    borderRadius: 20,
    padding: 4,
    margin: '20px 0 10px 0',
    textAlign: 'center',
    fontSize: '14px',
}));

const HistoryStack = styled(Grid)(() => ({
    width: '100%',
    border: '1px solid #E0E0E0',
    borderRadius: 10,
    padding: '15px 30px 15px 30px',
    marginBottom: 10,
    // boxShadow: '0 0 30px #E0E0E0',
}));

const ProductImg = styled(Box)(() => ({
    width: '80px', 
    height: '80px', 
    backgroundColor: '#F0F0F0',
    '&:hover': {
        backgroundColor: '#F5F5F5',
        cursor: 'pointer',
    },
}));

const ProductDetail = styled(Stack)(() => ({
    padding: '5px 0 5px 0',
    height: '70px',
}));

const Brand = styled(Box)(() => ({
    fontSize: '12px',
    color: 'grey'
}));

const ProductName = styled(Box)(() => ({
    fontSize: '18px',
    fontFamily: 'PretendardB'
}));

const Date = styled(Box)(() => ({
    fontSize: '14px',
    fontFamily: 'PretendardM',
    color: 'dimgrey'
}));

const Status = styled(Box)(() => ({
    fontSize: '14px',
    fontFamily: 'PretendardM',
    textAlign: 'center',
    lineHeight: '80px',
}));

export default PurchaseHistoryPage;