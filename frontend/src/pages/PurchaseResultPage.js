import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Button, Stack } from '@mui/material'
import Header from '../components/Header';

function PurchaseResultPage() {
    const navigate = useNavigate();

    const onClickHistory = () => {
        navigate('/purchasehistory');
    };

    const onClickUsePoints = () => {
        navigate('/usepoints');
    };

    return (
        <>
            <Header />
            <Title>결제 성공</Title>
            <Body spacing={1}>
                <SubTitle>상품 정보</SubTitle>
                <Stack direction="row">
                    <ProductImg />
                    <Stack spacing={0.5} ml={2}>
                        <ProductName>츄파춥스</ProductName>
                        <ProductCount>수량 : 1개</ProductCount>
                    </Stack>
                </Stack>
                <Stack py={4} spacing={1}>
                    <SubTitle>'010-2581-7018' 번호로 쿠폰이 전송 완료되었습니다.</SubTitle>
                    <Description>문자메시지를 확인해주세요.</Description>
                </Stack>
                <Stack direction="row" spacing={1} justifyContent="center">
                    <Button1 onClick={onClickHistory}>구매내역 확인하기</Button1>
                    <Button2 onClick={onClickUsePoints}>계속 둘러보기</Button2>
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
    width: 400,
    paddingBottom: 50,
}));

const ProductImg = styled(Box)(() => ({
    width: '100px', 
    height: '100px', 
    backgroundColor: '#F0F0F0'
}));

const ProductName = styled(Box)(() => ({
    fontSize: '18px',
    fontFamily: 'PretendardB'
}));

const ProductCount = styled(Box)(() => ({
    fontSize: '12px',
    color: 'grey'
}));

const SubTitle = styled(Box)(() => ({
    fontSize: 16,
    fontFamily: 'PretendardB'
}));

const Description = styled(Box)(() => ({
    fontSize: 14,
    color: '#B0B0B0'
}));

const Button1 = styled(Button)(() => ({
    width: '200px',
    padding: 8,
    fontFamily: 'PretendardM', 
    fontSize: 16, 
    boxShadow: 'none', 
    color: 'white',
    backgroundColor: '#0094FF', 
    '&:hover': {
        backgroundColor: '#34ABFF',
    },
}));

const Button2 = styled(Button)(() => ({
    width: '200px',
    padding: 8,
    fontFamily: 'PretendardM', 
    fontSize: 16, 
    boxShadow: 'none', 
    color: '#0094FF',
    border: '1px solid #0094FF', 
    backgroundColor: 'transparent', 
    '&:hover': {
        backgroundColor: '#E5F3FC',
    },
}));

export default PurchaseResultPage;