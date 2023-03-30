import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Grid, Stack, Button, TextField } from '@mui/material';
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import Header from '../components/Header';

import User from '../data/User';

function ManageCertificationsPage() {
    const navigate = useNavigate();

    const onClickCreate = () => {
        navigate('/createcertifications');
    };

    return (
        <>
            <Header />
            <Title>인증서 조회</Title>
            <Body>
                <CreateButton onClick={onClickCreate}>신규 발급</CreateButton>
                <SearchStack>
                    <SearchItem direction="row" alignItems='center'>
                        <SearchTitle>기간별</SearchTitle>
                        <DateButton>전체</DateButton>
                        <DateButton2>1주</DateButton2>
                        <DateButton2>1개월</DateButton2>
                        <DateButton2>6개월</DateButton2>
                        <DateButton2>1년</DateButton2>
                    </SearchItem>
                    <SearchItem direction="row" alignItems='center' justifyContent='space-between'>
                        <Stack direction="row" alignItems='center'>
                            <SearchTitle>센터명</SearchTitle>
                            <TextField
                                size="small"
                            />
                        </Stack>
                        <SearchButton>검색</SearchButton>
                    </SearchItem>
                </SearchStack>
                <Box sx={{width: '100%', textAlign: 'center', padding: '15px 0 15px 0'}}>
                    <KeyboardDoubleArrowDownRoundedIcon sx={{fontSize: 30, color: 'lightgrey'}} />
                </Box>
                <ResultStack container direction="row">
                    <Grid item xs={6}>
                        <ResultTitle>사용 가능 포인트</ResultTitle>
                        <Stack direction="row" alignItems="end" mt={1}>
                            <Box sx={{fontFamily: 'PretendardM', fontSize: 66}}>{User.totalPoints}</Box>
                            <Box sx={{fontSize: 24, padding: '0 0 2px 10px'}}>Points</Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack direction="row" alignItems="center">
                            <ResultTitle>총 봉사 횟수</ResultTitle>
                            <Stack direction="row" alignItems="end">
                                <Box sx={{fontFamily: 'PretendardM', fontSize: 30}}>{User.certificationList.length}</Box>
                                <Box sx={{fontSize: 18, padding: '0 0 4px 4px'}}>회</Box>
                            </Stack>
                        </Stack>
                        <Stack direction="row" alignItems="center" mt={2}>
                            <ResultTitle>총 봉사 시간</ResultTitle>
                            <Stack direction="row" alignItems="end">
                                <Box sx={{fontFamily: 'PretendardM', fontSize: 30}}>{}</Box>
                                <Box sx={{fontSize: 18, padding: '0 10px 4px 4px'}}>시간</Box>
                                <Box sx={{fontFamily: 'PretendardM', fontSize: 30}}>{}</Box>
                                <Box sx={{fontSize: 18, padding: '0 0 4px 4px'}}>분</Box>
                            </Stack>
                        </Stack>
                    </Grid>
                </ResultStack>
                <ListStack>
                    <Grid container sx={{textAlign: 'center', color: 'grey'}}>
                        <Grid item xs={1} sx={{padding: '10px'}}>번호</Grid>
                        <Grid item xs={9} sx={{padding: '10px'}}>인증서 내용</Grid>
                        <Grid item xs={2} sx={{padding: '10px'}}>포인트</Grid>
                    </Grid>
                    {
                        User.certificationList.map((value, idx) => {
                            return (
                                <ListItem container>
                                    <ListSubItem item xs={1}>{value.id}</ListSubItem>
                                    <Grid item xs={9} sx={{padding: '10px'}}>
                                        <Box sx={{fontFamily: 'PretendardM'}}>{value.content}</Box>
                                        <Grid container>
                                            <Grid item xs={4}>봉사일자 : {value.volunteerDate.substring(0,4)}-{value.volunteerDate.substring(4,6)}-{value.volunteerDate.substring(6,8)}</Grid>
                                            <Grid item xs={4}>발급일자 : {value.submitDate.substring(0,4)}-{value.submitDate.substring(4,6)}-{value.submitDate.substring(6,8)}</Grid>
                                            <Grid item xs={4}>봉사시간 : {value.hour}시간 {}분</Grid>
                                        </Grid>
                                    </Grid>
                                    <ListSubItem item xs={2} sx={{color: '#0094FF'}}>{value.point} Point</ListSubItem>
                                </ListItem>
                            )
                        })
                    }
                    <Stack direction="row" justifyContent='center' mt={2}>
                        <Box sx={{padding: '20px', color: '#0094FF'}}>1</Box>
                        <Box sx={{padding: '20px'}}>2</Box>
                        <Box sx={{padding: '20px'}}>3</Box>
                        <Box sx={{padding: '20px'}}>4</Box>
                        <Box sx={{padding: '20px'}}>5</Box>
                    </Stack>
                </ListStack>
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

const CreateButton = styled(Button)(() => ({
    position: 'relative',
    left: '100%',
    transform: 'translate(-100%, 0)', 
    width: 100,
    marginBottom: 10,
    fontSize: 14,
    fontFamily: 'PretendardM',
    color: 'white',
    backgroundColor: '#0094FF', 
    '&:hover': {
        backgroundColor: '#34ABFF',
    },
}));

const SearchStack = styled(Stack)(() => ({
    border: '1px solid lightgrey',
    padding: 20
}));

const SearchItem = styled(Stack)(() => ({
    padding: 10
}));

const SearchTitle = styled(Box)(() => ({
    fontSize: 14,
    width: 80
}));

const DateButton = styled(Button)(() => ({
    backgroundColor: 'grey',
    color: 'white',
    border: '1px solid grey',
    marginRight: 5,
    '&:hover': {
        backgroundColor: '#D0D0D0',
        border: '1px solid #D0D0D0',
    },
}));

const DateButton2 = styled(Button)(() => ({
    backgroundColor: 'white',
    color: '#D0D0D0',
    border: '1px solid #D0D0D0',
    marginRight: 5,
    '&:hover': {
        backgroundColor: '#F0F0F0',
        border: '1px solid #D0D0D0',
    },
}));

const SearchButton = styled(Button)(() => ({
    color: '#0094FF',
    border: '1px solid #0094FF', 
}));

const ResultStack = styled(Grid)(() => ({
    border: '1px solid lightgrey',
    padding: 20
}));

const ResultTitle = styled(Box)(() => ({
    display: 'inline-block',
    border: '1px solid lightgrey',
    color: 'grey',
    textAlign: 'center',
    padding: 10,
    marginRight: 20,
    fontSize: 14,
    borderRadius: 5,
}));

const ListStack = styled(Stack)(() => ({
    marginTop: 40,
}));

const ListItem = styled(Grid)(() => ({
    border: '1px solid lightgrey',
    lineHeight: '25px',
    marginBottom: '5px'
}));

const ListSubItem = styled(Grid)(() => ({
    textAlign: 'center',
    lineHeight: '50px',
    padding: '10px',
}));

export default ManageCertificationsPage;