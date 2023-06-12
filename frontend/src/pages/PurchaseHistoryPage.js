import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Grid, Stack, Button } from '@mui/material';
import Header from '../components/Header';

import Users from '../data/Users';

function PurchaseHistoryPage() {
    return (
        <>
            <Header />
            <Title>구매내역 조회</Title>
            <Body>
                <Badge sx={{width: '55px'}}>미사용</Badge>
                {
                    Users[sessionStorage.getItem('userId')].purchaseList.map((value, idx) => {
                        if (value.isUsed===false)
                            return (
                                <HistoryStack container key={idx}>
                                    <Grid item xs={2}>
                                        <ProductImg><img src={`/product_imgs/${value.productInfo.id}.png`} alt={value.productInfo.id} width="100%" height="100%" /></ProductImg>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <ProductDetail justifyContent="space-between">
                                            <Stack spacing={0.5}>
                                                <Brand>{value.productInfo.brand}</Brand>
                                                <ProductName>{value.productInfo.productName}</ProductName>
                                            </Stack>
                                            <Date>{value.purchaseDate} 구매 / {"2024-"+value.purchaseDate.substring(5, 10)} 까지</Date>
                                        </ProductDetail>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Status>미사용</Status>
                                    </Grid>
                                </HistoryStack>
                            )
                        else return null
                    })
                }
                <Badge sx={{width: '165px'}}>사용완료 및 유효기간 만료</Badge>
                {
                    Users[sessionStorage.getItem('userId')].purchaseList.map((value, idx) => {
                        if (value.isUsed===true)
                            return (
                                <HistoryStack container key={idx}>
                                    <Grid item xs={2}>
                                    <ProductImg sx={{opacity: 0.4, filter: `brightness(0.9)`}}><img src={`/product_imgs/${value.productInfo.id}.png`} alt={value.productInfo.id} width="100%" height="100%" /></ProductImg>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <ProductDetail justifyContent="space-between">
                                            <Stack spacing={0.5}>
                                                <Brand sx={{color: 'lightgrey'}}>{value.productInfo.brand}</Brand>
                                                <ProductName sx={{color: 'lightgrey'}}>{value.productInfo.productName}</ProductName>
                                            </Stack>
                                            <Date sx={{color: 'lightgrey'}}>{value.purchaseDate} 구매 / {"2024-"+value.purchaseDate.substring(5, 10)} 까지</Date>
                                        </ProductDetail>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Status sx={{color: 'lightgrey'}}>사용 완료</Status>
                                    </Grid>
                                </HistoryStack>
                            )
                            else return null
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