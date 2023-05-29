import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Grid, Stack, Button } from '@mui/material';
import Header from '../components/Header';
import ConfirmPurchaseModal from '../components/ConfirmPurchaseModal';

function ProductDetailPage() {
    const location = useLocation();
    const product = location.state;

    const [price, setPrice] = useState(product.price);
    const [count, setCount] = useState(1);

    const onClickMinus = () => {
        if (count > 1) setCount(count-1);
    };

    const onClickPlus = () => {
        if (count < 10) setCount(count+1);
    };

    return (
        <>
            <Header />
            <Body>
                <Grid container mt={2}>
                    <Grid item xs={4.5}>
                        <Box sx={{width: '100%', height: '250px', border: '1px solid lightgrey'}}></Box>
                    </Grid>
                    <Grid item xs={1.5}></Grid>
                    <Grid item xs={6}>
                        <Stack>
                            <Brand>{product.brand}</Brand>
                            <ProductName>{product.name}</ProductName>
                            <Stack direction="row" sx={{padding: '5px'}} alignItems="center" justifyContent="space-between">
                                <DetailTitle>가격</DetailTitle>
                                <DetailContent>{product.price} Points</DetailContent>
                            </Stack>
                            <Stack direction="row" sx={{padding: '5px'}} alignItems="center" justifyContent="space-between">
                                <DetailTitle>수량</DetailTitle>
                                <Stack direction="row" alignItems="center">
                                    <CountButton onClick={onClickMinus}>-</CountButton>
                                    <DetailContent sx={{width: '40px', textAlign: 'center'}}>{count}</DetailContent>
                                    <CountButton onClick={onClickPlus}>+</CountButton>
                                </Stack>
                            </Stack>
                            <Stack direction="row" sx={{backgroundColor: '#F5F5F5', padding: '10px'}} alignItems="center" justifyContent="space-between" my={1}>
                                <DetailTitle>총 금액</DetailTitle>
                                <Stack direction="row" alignItems="center">
                                    <Box sx={{color: 'dimgrey', paddingRight: '10px', fontSize: '14px'}}>{price} x {count} = </Box>
                                    <DetailContent sx={{fontFamily: 'PretendardM'}}>{price*count} Points</DetailContent>
                                </Stack>
                            </Stack>
                            <ConfirmPurchaseModal product={product} count={count} />
                        </Stack>
                    </Grid>
                </Grid>
                <Stack sx={{width: '100%', backgroundColor: '#F5F5F5'}} mt={4}>
                    <Box sx={{padding: '20px 20px 200px 20px'}}>제품에 대한 상세 설명입니다. {product.detail}</Box>
                </Stack>
            </Body>
        </>
    );
}

const Body = styled(Stack)(() => ({
    position: 'relative',
    left: '50%',
    transform: 'translate(-50%, 0)', 
    width: 700,
    marginTop: 20,
    paddingBottom: 50,
}));

const Brand = styled(Box)(() => ({
    fontSize: '14px',
    color: 'grey'
}));

const ProductName = styled(Box)(() => ({
    fontSize: '24px',
    fontFamily: 'PretendardB',
    padding: '10px 0 10px 0',
}));

const DetailTitle = styled(Box)(() => ({
    fontSize: '14px',
    color: 'grey'
}));

const DetailContent = styled(Box)(() => ({
    fontSize: '16px',
}));

const CountButton = styled(Button)(() => ({
    fontSize: '14px', 
    color: 'grey',
    padding: 0,
    width: 30,
    height: 35,
    minWidth: 0,
    border: '1px solid #D0D0D0',
    borderRadius: 50,
}));

export default ProductDetailPage;