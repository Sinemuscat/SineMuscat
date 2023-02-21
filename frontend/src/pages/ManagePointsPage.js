import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Grid, Stack, Button } from '@mui/material';
import Header from '../components/Header';
import PresendPointModal from '../components/PresentPointModal';

function ManagePointsPage() {
    return (
        <>
            <Header />
            <Title>포인트 조회</Title>
            <Body>
                <Grid container>
                    <Grid xs={6} item pt={2} pl={1}>
                        <Box sx={{fontFamily: 'PretendardM', fontSize: '18px'}}>현재 포인트</Box>
                        <Stack direction="row" alignItems="end" my={1}>
                            <Box sx={{fontFamily: 'PretendardB', fontSize: '60px'}}>2,500</Box>
                            <Box sx={{fontFamily: 'PretendardM',fontSize: '24px', padding: '0 0 8px 10px'}}>점</Box>
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
                            <CustomButton variant="contained">물품 구매하기</CustomButton>
                        </Banner>
                    </Grid>
                </Grid>
                <ListStack>
                    <OptionStack direction="row" alignItems='center'>
                        <Option>전체</Option>
                        <Option2>획득</Option2>
                        <Option2>사용</Option2>
                    </OptionStack>
                    <Grid container sx={{textAlign: 'center', color: 'grey'}}>
                        <ListHeader item xs={1.5}>포인트</ListHeader>
                        <ListHeader item xs={8.5}>적립 구분</ListHeader>
                        <ListHeader item xs={2}>적립 날짜</ListHeader>
                    </Grid>
                    <ListItem container>
                        <ListSubItem item xs={1.5} sx={{fontFamily: 'PretendardM', color: '#0094FF'}}>+ 2 Points</ListSubItem>
                        <ListSubItem item xs={8.5}>1365 인증서 발급 (20231251415508_12854036)</ListSubItem>
                        <ListSubItem item xs={2}>2023-01-25</ListSubItem>
                    </ListItem>
                    <ListItem container>
                        <ListSubItem item xs={1.5} sx={{fontFamily: 'PretendardM', color: '#0094FF'}}>+ 1 Points</ListSubItem>
                        <ListSubItem item xs={8.5}>VMS 인증서 발급 (20231251415508_12854036)</ListSubItem>
                        <ListSubItem item xs={2}>2023-01-23</ListSubItem>
                    </ListItem>
                    <ListItem container>
                        <ListSubItem item xs={1.5} sx={{fontFamily: 'PretendardM', color: '#0094FF'}}>- 200 Points</ListSubItem>
                        <ListSubItem item xs={8.5}>PPP 님께 포인트 보내기</ListSubItem>
                        <ListSubItem item xs={2}>2023-01-20</ListSubItem>
                    </ListItem>
                    <ListItem container>
                        <ListSubItem item xs={1.5} sx={{fontFamily: 'PretendardM', color: '#0094FF'}}>+ 150 Points</ListSubItem>
                        <ListSubItem item xs={8.5}>QQQ 님께 포인트 받기</ListSubItem>
                        <ListSubItem item xs={2}>2023-01-19</ListSubItem>
                    </ListItem>
                    <ListItem container>
                        <ListSubItem item xs={1.5} sx={{fontFamily: 'PretendardM', color: '#0094FF'}}>+ 3 Points</ListSubItem>
                        <ListSubItem item xs={8.5}>1365 인증서 발급 (20231251415508_12854036)</ListSubItem>
                        <ListSubItem item xs={2}>2023-01-12</ListSubItem>
                    </ListItem>
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

const OptionStack = styled(Stack)(() => ({
    justifyContent: 'end',
    paddingBottom: 10,
}));

const Option = styled(Button)(() => ({
    backgroundColor: 'grey',
    color: 'white',
    border: '1px solid grey',
    marginLeft: 5,
    '&:hover': {
        backgroundColor: '#D0D0D0',
        border: '1px solid #D0D0D0',
    },
}));

const Option2 = styled(Button)(() => ({
    backgroundColor: 'white',
    color: '#D0D0D0',
    border: '1px solid #D0D0D0',
    marginLeft: 5,
    '&:hover': {
        backgroundColor: '#F0F0F0',
        border: '1px solid #D0D0D0',
    },
}));

const ListStack = styled(Stack)(() => ({
    marginTop: 40,
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