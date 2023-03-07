import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Grid, Stack, Button, Avatar } from '@mui/material';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Header from '../components/Header';

function MyPage() {
    const navigate = useNavigate();
    
    const onClickEdit = () => {
        navigate('/edituserinfo');
    };

    const onClickCert = () => {
        navigate('/managecertifications');
    };

    const onClickPurchaseHistory = () => {
        navigate('/purchasehistory');
    };

    const onClickManagePoints = () => {
        navigate('/managepoints');
    };

    return (
        <>
            <Header />
            <Title>마이페이지</Title>
            <Body container spacing={2}>
                <Grid item xs={6} alignItems="center">
                    <Item alignItems="center" spacing={2}>
                        <Avatar sx={{width: 80, height: 80, backgroundColor: '#6323BD', fontSize: 40}}>규진</Avatar>
                        <Stack direction="row" alignItems="end">
                            <Box sx={{fontSize: 30, fontFamily: 'PretendardB'}}>원규진</Box>
                            <Box sx={{fontSize: 20, margin: '0 0 1px 5px', fontFamily: 'PretendardB'}}>님</Box>
                        </Stack>
                        <CustomButton onClick={onClickEdit} sx={{fontSize: 16, padding: 0}}>
                            <Stack direction="row" alignItems="center">
                                <Box sx={{color: 'grey'}}>회원 정보</Box>
                                <Box sx={{color: 'black', marginLeft: '5px'}}>수정</Box>
                                <ChevronRightRoundedIcon sx={{color: 'black'}} />
                            </Stack>
                        </CustomButton>
                    </Item>
                </Grid>
                <Grid item xs={6} alignItems="center">
                    <Item alignItems="center" spacing={2}>
                        <CustomButton onClick={onClickManagePoints}>
                            <Stack direction="row" alignItems="center">
                                <Box sx={{fontSize: 24, fontFamily: 'PretendardB', color: 'black'}}>포인트 조회</Box>
                                <ChevronRightRoundedIcon sx={{color: 'black', fontSize: 24}} />
                            </Stack>
                        </CustomButton>
                        <Stack direction="row">
                            <Box sx={{color: 'grey'}}>누적 포인트</Box>
                            <Box sx={{color: 'black', marginLeft: '5px'}}>135,280 점</Box>
                        </Stack>
                        <Stack direction="row">
                            <Box sx={{color: 'grey'}}>가용 포인트</Box>
                            <Box sx={{color: 'black', marginLeft: '5px'}}>2,500 점</Box>
                        </Stack>
                    </Item>
                </Grid>
                <Grid item xs={6} alignItems="center">
                    <Item alignItems="center" spacing={2}>
                        <CustomButton onClick={onClickCert}>
                            <Stack direction="row" alignItems="center">
                                <Box sx={{fontSize: 24, fontFamily: 'PretendardB', color: 'black'}}>인증서 조회</Box>
                                <ChevronRightRoundedIcon sx={{color: 'black', fontSize: 24}} />
                            </Stack>
                        </CustomButton>
                        <Stack direction="row">
                            <Box sx={{color: 'grey'}}>총 봉사 횟수</Box>
                            <Box sx={{color: 'black', marginLeft: '5px'}}>129 회</Box>
                        </Stack>
                        <Stack direction="row">
                            <Box sx={{color: 'grey'}}>총 봉사 시간</Box>
                            <Box sx={{color: 'black', marginLeft: '5px'}}>241시간 20분</Box>
                        </Stack>
                    </Item>
                </Grid>
                <Grid item xs={6} alignItems="center">
                    <Item alignItems="center" spacing={2}>
                        <CustomButton onClick={onClickPurchaseHistory}>
                            <Stack direction="row" alignItems="center">
                                <Box sx={{fontSize: 24, fontFamily: 'PretendardB', color: 'black'}}>구매내역 조회</Box>
                                <ChevronRightRoundedIcon sx={{color: 'black', fontSize: 24}} />
                            </Stack>
                        </CustomButton>
                        <Stack direction="row">
                            <Box sx={{color: 'grey'}}>총 구매 횟수</Box>
                            <Box sx={{color: 'black', marginLeft: '5px'}}>13 회</Box>
                        </Stack>
                        <Stack direction="row">
                            <Box sx={{color: 'grey'}}>미사용 상품</Box>
                            <Box sx={{color: 'black', marginLeft: '5px'}}>2 개</Box>
                        </Stack>
                    </Item>
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

const Body = styled(Grid)(() => ({
    position: 'relative',
    left: '50%',
    transform: 'translate(-50%, 0)', 
    width: 800,
    padding: 10,
    paddingBottom: 80,
}));

const Item = styled(Stack)(() => ({
    border: '1px solid lightgrey', 
    padding: 20,
    height: 190,
}));

const CustomButton = styled(Button)(() => ({
    '&:hover': {
        backgroundColor: 'transparent',
        opacity: '40%'
    },
}));

export default MyPage;