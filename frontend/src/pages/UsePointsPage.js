import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Grid, Stack, Button, Checkbox } from '@mui/material';
import Header from '../components/Header';

function UsePointsPage() {
    const navigate = useNavigate();

    const onClickProduct = () => {
        navigate('/productdetail');
    };

    return (
        <>
            <Header />
            <Title>포인트 사용</Title>
            <Body>
                <Stack direction="row" sx={{borderBottom: '1px solid lightgrey'}} py={2} justifyContent="center">
                    <CategoryButton>전체</CategoryButton>
                    <CategoryButton2>카페/베이커리</CategoryButton2>
                    <CategoryButton2>외식</CategoryButton2>
                    <CategoryButton2>편의점</CategoryButton2>
                    <CategoryButton2>뷰티</CategoryButton2>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center" my={1}>
                    <Box sx={{color: 'black', fontSize: '12px'}}><Checkbox size="small" />구매가능 물건만</Box>
                    <Stack direction="row" alignItems="center">
                        <Button sx={{color: 'black'}}>최신순</Button>
                        <Box sx={{fontSize: '14px'}}>|</Box>
                        <Button sx={{color: 'black'}}>낮은 가격순</Button>
                        <Box sx={{fontSize: '14px'}}>|</Box>
                        <Button sx={{color: 'black'}}>높은 가격순</Button>
                        <Box sx={{fontSize: '14px'}}>|</Box>
                        <Button sx={{color: 'black'}}>제품명순</Button>
                    </Stack>
                </Stack>
                <Grid container spacing={2}>
                    {
                        [0,0,0,0,0,0,0,0,0,0,0].map(() => {
                            return (
                                <Grid item xs={3}>
                                    <Stack>
                                        <ProductImage onClick={onClickProduct}></ProductImage>
                                        <Brand>스타벅스</Brand>
                                        <ProductName>아이스 카페 아메리카노 T</ProductName>
                                        <Price>45 Points</Price>
                                    </Stack>
                                </Grid>
                            )
                        })
                    }
                </Grid>
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
    width: 1000,
    paddingBottom: 50,
}));

const CategoryButton = styled(Button)(() => ({
    backgroundColor: 'grey',
    color: 'white',
    border: '1px solid grey',
    margin: '0 10px 0 10px',
    width: '100px',
    '&:hover': {
        backgroundColor: '#D0D0D0',
        border: '1px solid #D0D0D0',
    },
}));

const CategoryButton2 = styled(Button)(() => ({
    backgroundColor: 'white',
    color: '#D0D0D0',
    border: '1px solid #D0D0D0',
    margin: '0 10px 0 10px',
    width: '100px',
    '&:hover': {
        backgroundColor: '#F0F0F0',
        border: '1px solid #D0D0D0',
    },
}));

const Brand = styled(Box)(() => ({
    fontSize: '12px',
    color: 'grey',
    padding:'10px 0 2px 0',
}));

const ProductImage = styled(Box)(() => ({
    width: '100%', 
    height: '250px', 
    backgroundColor: '#F0F0F0',
    '&:hover': {
        backgroundColor: '#F7F7F7',
        cursor: 'pointer',
    },
}));

const ProductName = styled(Box)(() => ({
    fontSize: '14px',
    padding:'2px 0 5px 0',
}));

const Price = styled(Box)(() => ({
    fontSize: '18px',
    fontFamily: 'PretendardM',
    padding:'5px 0 5px 0',
}));

export default UsePointsPage;