import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Grid, Stack, Button, ToggleButton, ToggleButtonGroup, Pagination } from '@mui/material';
import Header from '../components/Header';
import PresendPointModal from '../components/PresentPointModal';

import Users from '../data/Users';

function ManagePointsPage() {
    // Redux store에서 totalPoints를 가져옴
    const totalPoints = useSelector(state => state.totalPoints);

    const navigate = useNavigate();

    const onClickUsePoints = () => {
        navigate('/usepoints');
    };

    const user = Users[sessionStorage.getItem('userId')];
    const option = ["전체", "획득", "사용"];
    const [value, setValue] = useState(option[0]);

    const [pointList, setPointList] = useState(user.pointList.sort((a, b) => b.id - a.id));

    const handleRadioChange = (event, nextValue) => {
      setValue(nextValue);
      setPage(1);

      switch (nextValue) {
        case "획득":
            const gainPoints = user.pointList.filter((item) => {
                return item.point > 0;
            });
            setPointList(gainPoints.sort((a, b) => b.id - a.id));
            break;
        case "사용":
            const usePoints = user.pointList.filter((item) => {
                return item.point < 0;
            });
            setPointList(usePoints.sort((a, b) => b.id - a.id));
            break;
        default:
            setPointList(user.pointList.sort((a, b) => b.id - a.id));
            break;
        }
    };

    const LAST_PAGE = pointList.length % 5 === 0 ? 
    	parseInt(pointList.length / 5) : parseInt(pointList.length / 5) + 1;
    const [page, setPage] = useState(1); 
    const [data, setData] = useState(pointList.slice(5));
    
    useEffect(() => {
        if(page === LAST_PAGE){
          setData(pointList.slice(5 * (page - 1)));
        } else {
          setData(pointList.slice(5 * (page - 1), 5 * (page - 1) + 5));
        }  
      }, [page, LAST_PAGE, pointList]);
    
    const handlePage = (event, value) => {
      setPage(value);
    }


    return (
        <>
            <Header />
            <Title>포인트 조회</Title>
            <Body>
                <Grid container>
                    <Grid xs={6} item pt={2} pl={1}>
                        <Box sx={{fontFamily: 'PretendardM', fontSize: '18px'}}>현재 포인트</Box>
                        <Stack direction="row" alignItems="end" my={1}>
                            <Box sx={{fontFamily: 'PretendardB', fontSize: '55px'}}>{totalPoints}</Box>
                            <Box sx={{fontSize: 24, padding: '0 0 5px 10px'}}>Points</Box>
                        </Stack>
                        <Box sx={{fontSize: '12px', color: 'grey', paddingTop: 4, lineHeight: 1.4}}>
                            <li>포인트 1점당 적립금 1원으로 전환하여 결제 시 사용할 수 있습니다.</li>
                            <li>적립금 전환은 1,000점 이상부터 가능합니다.</li>
                            <li>포인트 선물은 잔여 포인트가 100포인트 이상 되어야 가능합니다.</li>
                            <li>소멸된 포인트는 다시 전환할 수 없습니다.</li>
                        </Box>
                    </Grid>
                    <Grid xs={3} item>
                        <Banner>
                            <Box sx={{height: 150}}></Box>
                            <PresendPointModal />
                        </Banner>
                    </Grid>
                    <Grid xs={3} item>
                        <Banner>
                            <Box sx={{height: 150}}></Box>
                            <CustomButton onClick={onClickUsePoints} variant="contained">물품 구매하기</CustomButton>
                        </Banner>
                    </Grid>
                </Grid>
                <ToggleButtonGroup value={value} exclusive onChange={handleRadioChange} sx={{marginTop: 5}}>
                    {
                        option.map((v, id) => {
                            return <OptionButton value={v} key={id}>{v}</OptionButton>
                        })
                    }
                </ToggleButtonGroup>
                <Stack alignItems="center">
                    <Grid container sx={{textAlign: 'center', color: 'grey'}}>
                        <ListHeader item xs={1}>번호</ListHeader>
                        <ListHeader item xs={1.5}>포인트</ListHeader>
                        <ListHeader item xs={7.5}>적립 구분</ListHeader>
                        <ListHeader item xs={2}>적립 날짜</ListHeader>
                    </Grid>
                    {
                        data.map((value, idx) => {
                            return (
                                <ListItem container key={idx}>
                                    <ListSubItem item xs={1}>{(idx+1)+(page-1)*5}</ListSubItem>
                                    <ListSubItem item xs={1.5} sx={{fontFamily: 'PretendardM', color: '#0094FF'}}>{value.point} Points</ListSubItem>
                                    <ListSubItem item xs={7.5}>{value.content}</ListSubItem>
                                    <ListSubItem item xs={2}>{value.date}</ListSubItem>
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
    // border: '1px solid pink',
    position: 'relative',
    left: '50%',
    transform: 'translate(-50%, 0)', 
    width: 1000,
    paddingBottom: 50,
}));

const Banner = styled(Grid)(() => ({
    textAlign: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
    margin: 10,
}));

const CustomButton = styled(Button)(() => ({
    width: 140,
    fontFamily: 'PretendardM', 
    fontSize: 14, 
    boxShadow: 'none', 
    backgroundColor: '#0094FF', 
    borderRadius: 0,
    '&:hover': {
        backgroundColor: '#0094FF',
    },
}));

const OptionButton = styled(ToggleButton)(() => ({
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


export default ManagePointsPage;