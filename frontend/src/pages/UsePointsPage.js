import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Grid, Stack, ToggleButton, ToggleButtonGroup, Pagination } from '@mui/material';
import Header from '../components/Header';

import Products from '../data/Products';

function UsePointsPage() {
    const navigate = useNavigate();

    const onClickProduct = (value) => {
        navigate('/productdetail', {state: {
            id: value.id,
            brand: value.brand,
            name: value.productName,
            price: value.price,
            detail: value.productDetail,
        }});
    };

    const category = ["전체", "카페/베이커리", "외식", "편의점", "뷰티"];
    const [value, setValue] = useState(category[0]);

    // const sorting = ["최신순", "낮은 가격순", "높은 가격순", "제품명순"];
    // const [method, setMethod] = useState(sorting[0]);

    const [productList, setProductList] = useState(Products);

    const handleRadioChange = (event, nextValue) => {
        setValue(nextValue);
        setPage(1);

        switch (nextValue) {
            case "전체":
                setProductList(Products);
                break;
            default:
                setProductList(Products.filter((item) => {return item.category===nextValue;}));
                break;
        }
    };

    var pv = 8;
    const LAST_PAGE = productList.length % pv === 0 ? 
    	parseInt(productList.length / pv) : parseInt(productList.length / pv) + 1;
    const [page, setPage] = useState(1); 
    const [data, setData] = useState(productList.slice(pv));
    
    useEffect(() => {
        if(page === LAST_PAGE){
          setData(productList.slice(pv * (page - 1)));
        } else {
          setData(productList.slice(pv * (page - 1), pv * (page - 1) + pv));
        }  
      }, [page, LAST_PAGE, productList, pv]);
    
    const handlePage = (event, value) => {
      setPage(value);
    }

    return (
        <>
            <Header />
            <Title>포인트 사용</Title>
            <Body>
                <Stack alignItems="center" my={2}>
                    <ToggleButtonGroup value={value} exclusive onChange={handleRadioChange}>
                        {
                            category.map((v, id) => {
                                return <CategoryButton value={v} key={id}>{v}</CategoryButton>
                            })
                        }
                    </ToggleButtonGroup>
                </Stack>
                <Stack direction="row" justifyContent="end" alignItems="center" my={1}>
                    {/* <Box sx={{color: 'black', fontSize: '12px'}}><Checkbox size="small" />구매가능 물건만</Box> */}
                    {/* <ToggleButtonGroup value={method} exclusive onChange={handleSortChange}>
                        {
                            sorting.map((v, id) => {
                                return <ToggleButton value={v} key={id}>{v}</ToggleButton>
                            })
                        }
                    </ToggleButtonGroup> */}
                </Stack>
                <Stack alignItems="center">
                    <Grid container spacing={2}>
                        {
                            data.map((value, idx) => {
                                return (
                                    <Grid item xs={3} key={idx}>
                                        <Stack>
                                            <ProductImage onClick={() => onClickProduct(value)}></ProductImage>
                                            <Brand>{value.brand}</Brand>
                                            <ProductName>{value.productName}</ProductName>
                                            <Price>{value.price} Points</Price>
                                        </Stack>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                    <Pagination 
                        count={LAST_PAGE} 
                        defaultPage={1} 
                        boundaryCount={2} 
                        size="large" 
                        sx={{margin: 4}} 
                        onChange={handlePage} />
                </Stack>
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

const CategoryButton = styled(ToggleButton)(() => ({
    width: 120,
    fontSize: 14,
    backgroundColor: 'transparent',
    color: 'lightgrey',
    border: 'none',
    padding: 10,
    margin: 10,
    '&:hover': {
        backgroundColor: 'transparent',
        color: 'grey',
        border: 'none',
    },
    '&.Mui-selected': {
        backgroundColor: 'grey',
        color: 'white',
        border: 'none',
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