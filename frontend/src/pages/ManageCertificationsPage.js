import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Grid, Stack, Button, ToggleButtonGroup, ToggleButton, Pagination } from '@mui/material';
import Header from '../components/Header';

import Users from '../data/Users';

function ManageCertificationsPage() {
    // Redux store에서 totalPoints를 가져옴
    const totalPoints = useSelector(state => state.totalPoints);

    const navigate = useNavigate();
    
    const onClickCreate = () => {
        navigate('/createcertifications');
    };    
    
    const user = Users[sessionStorage.getItem('userId')];
    const date = ["전체", "1주", "1개월", "6개월", "1년"];
    const [value, setValue] = useState(date[0]);

    const [certList, setCertList] = useState(user.certificationList.sort((a, b) => b.id - a.id));
    const [totalCnt, setTotalCnt] = useState(certList.length);
    const [totalTime, setTotalTime] = useState(certList.reduce((acc, cur) => acc + cur.hour, 0));

    const filterList = (days) => {
        const today = new Date();
        const filteredList = user.certificationList.filter((item) => {
            const volunteerDate = new Date(item.volunteerDate); // 인증서 발급일
            const diffTime = Math.abs(today - volunteerDate); // 두 날짜의 차이 (밀리초 단위)
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 차이 일수
          
            return diffDays <= days; // 30일 이내인 경우에만 반환
        });

        return filteredList;
    }

    const handleRadioChange = (event, nextValue) => {
      setValue(nextValue);
      setPage(1);

      switch (nextValue) {
        case "1주":
            setCertList(filterList(7).sort((a, b) => b.id - a.id));
            break;
        case "1개월":
            setCertList(filterList(30).sort((a, b) => b.id - a.id));
            break;
        case "6개월":
            setCertList(filterList(183).sort((a, b) => b.id - a.id));
            break;
        case "1년":
            setCertList(filterList(365).sort((a, b) => b.id - a.id));
            break;
        default:
            setCertList(user.certificationList.sort((a, b) => b.id - a.id));
            break;
        }
    };

    const LAST_PAGE = certList.length % 5 === 0 ? 
    	parseInt(certList.length / 5) : parseInt(certList.length / 5) + 1;
    const [page, setPage] = useState(1); 
    const [data, setData] = useState(certList.slice(5));
    
    useEffect(() => {
        if(page === LAST_PAGE){
          setData(certList.slice(5 * (page - 1)));
        } else {
          setData(certList.slice(5 * (page - 1), 5 * (page - 1) + 5));
        }  
      }, [page, LAST_PAGE, certList]);
    
    const handlePage = (event, value) => {
      setPage(value);
    }

    return (
        <>
            <Header />
            <Title>인증서 조회</Title>
            <Body>
                <CreateButton onClick={onClickCreate}>신규 발급</CreateButton>
                <ResultStack container direction="row">
                    <Grid item xs={6}>
                        <ResultTitle>사용 가능 포인트</ResultTitle>
                        <Stack direction="row" alignItems="end" mt={1}>
                            <Box sx={{fontFamily: 'PretendardM', fontSize: 66}}>{totalPoints}</Box>
                            <Box sx={{fontSize: 24, padding: '0 0 2px 10px'}}>Points</Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack direction="row" alignItems="center">
                            <ResultTitle>총 봉사 횟수</ResultTitle>
                            <Stack direction="row" alignItems="end">
                                <Box sx={{fontFamily: 'PretendardM', fontSize: 30}}>{totalCnt}</Box>
                                <Box sx={{fontSize: 18, padding: '0 0 4px 4px'}}>회</Box>
                            </Stack>
                        </Stack>
                        <Stack direction="row" alignItems="center" mt={2}>
                            <ResultTitle>총 봉사 시간</ResultTitle>
                            <Stack direction="row" alignItems="end">
                                <Box sx={{fontFamily: 'PretendardM', fontSize: 30}}>{Math.floor(totalTime/60)}</Box>
                                <Box sx={{fontSize: 18, padding: '0 10px 4px 4px'}}>시간</Box>
                                <Box sx={{fontFamily: 'PretendardM', fontSize: 30}}>{totalTime%60}</Box>
                                <Box sx={{fontSize: 18, padding: '0 0 4px 4px'}}>분</Box>
                            </Stack>
                        </Stack>
                    </Grid>
                </ResultStack>
                <ToggleButtonGroup value={value} exclusive onChange={handleRadioChange} sx={{marginTop: 5}}>
                    {
                        date.map((v, id) => {
                            return <DateButton value={v} key={id}>{v}</DateButton>
                        })
                    }
                </ToggleButtonGroup>
                <Stack alignItems="center">
                    <Grid container sx={{textAlign: 'center', color: 'grey'}}>
                        <ListHeader item xs={1}>번호</ListHeader>
                        <ListHeader item xs={9}>인증서 내용</ListHeader>
                        <ListHeader item xs={2}>포인트</ListHeader>
                    </Grid>
                    {
                        data.map((value, idx) => {
                            return (
                                <ListItem container key={idx}>
                                    <ListSubItem item xs={1}>{(idx+1)+(page-1)*5}</ListSubItem>
                                    <Grid item xs={9} sx={{padding: '10px'}}>
                                        <Box sx={{fontFamily: 'PretendardM'}}>{value.content}</Box>
                                        <Grid container>
                                            <Grid item xs={4}>봉사일자 : {value.volunteerDate}</Grid>
                                            <Grid item xs={4}>발급일자 : {value.submitDate}</Grid>
                                            <Grid item xs={4}>봉사시간 : {Math.floor(value.hour/60)}시간 {value.hour%60}분</Grid>
                                        </Grid>
                                    </Grid>
                                    <ListSubItem item xs={2} sx={{color: '#0094FF'}}>{value.point} Point</ListSubItem>
                                </ListItem>
                            )
                        })
                    }
                    <Pagination 
                        count={LAST_PAGE} 
                        defaultPage={1} 
                        boundaryCount={2} 
                        size="large" 
                        sx={{margin: 2}} 
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

const DateButton = styled(ToggleButton)(() => ({
    width: 60,
    fontSize: 12,
    backgroundColor: 'transparent',
    color: 'lightgrey',
    border: 'none',
    padding: 5,
    '&:hover': {
        backgroundColor: 'transparent',
        color: 'grey',
        border: 'none',
    },
    '&.Mui-selected': {
        backgroundColor: '#F0F0F0',
        color: 'dimgrey',
        border: 'none',
    },
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

const ListHeader = styled(Grid)(() => ({
    padding: '10px',
    fontSize: '14px',
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