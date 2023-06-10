import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Grid, Button } from '@mui/material';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import main1 from '../images/main1.png';
import main2 from '../images/main2.png';
import main3 from '../images/main3.png';
import Header from '../components/Header';
import axios from 'axios';

function MainPage() {
    var login = sessionStorage.getItem('userId')!==null;
    const navigate = useNavigate();

    const [message, setMessage] = useState('d')
    useEffect(()=>{
        async function get() {
            const res = await axios.get("http://localhost:8080/hello")
            setMessage(res.data);
        }

        get();
    }, [])

    const onClickCert = () => {
        if(login === false) {
            alert("로그인이 필요합니다.")
            navigate('/login');
        } else {
          navigate('/managecertifications');
        }
    };

    const onClickUsePoints = () => {
        if(login === false) {
            alert("로그인이 필요합니다.")
            navigate('/login');
        } else {
          navigate('/usepoints');
        }
    };

    const onClickManagePoints = () => {
        if(login === false) {
            alert("로그인이 필요합니다.")
            navigate('/login');
        } else {
          navigate('/managepoints');
        }
    };

    return (
        <>
            <Header />
            <Banner container direction="row" sx={{backgroundColor: '#E7F0F9'}}>
                <Grid item sx={{paddingRight: '100px'}}>
                    <Box sx={{fontFamily: 'PretendardB', fontSize: 20, padding: '20px 0 10px 0', lineHeight: 1.5}}>블록체인 기반의<br/>봉사 인증서 발급 시스템</Box>
                    <Box sx={{fontSize: 14, color: 'grey', padding: '10px 0 30px 0', lineHeight: 1.5}}>디지털 봉사 인증서를 발급하여<br/>인증서를 쉽고 안전하게 보관하세요.</Box>
                    <Box sx={{padding: '30px 0 20px 0'}}><CustomButton onClick={onClickCert} variant="contained">인증서 확인하러가기</CustomButton></Box>
                </Grid>
                <Grid item sx={{paddingLeft: '100px'}}><img src={main1} width={250} alt="img"/></Grid>
            </Banner>
            <Banner container direction="row"  sx={{backgroundColor: '#FBFBFB'}}>
                <img src={main2} width={220} alt="img"/>
                <Grid item sx={{padding: '0 10px 0 10px'}}><KeyboardDoubleArrowRightRoundedIcon sx={{fontSize: 60}} /></Grid>
                <PaidRoundedIcon sx={{fontSize: 80}} />
                <Grid item sx={{paddingLeft: '120px'}}>
                    <Box sx={{fontFamily: 'PretendardB', fontSize: 20, padding: '20px 0 5px 0', lineHeight: 1.5}}>봉사 인증서를 기반으로<br/>포인트 발급</Box>
                    <Box sx={{fontSize: 14, color: 'grey', padding: '5px 0 10px 0', lineHeight: 1.5}}>봉사 인증서를 토대로 포인트를 발급받아<br/>다양하게 사용해보세요.</Box>
                    <Grid container direction="row" sx={{padding: '10px 0 20px 0'}} spacing={3}>
                        <Grid item>
                            <AddShoppingCartRoundedIcon />
                            <Box sx={{fontFamily: 'PretendardM', fontSize: 14, padding: '0 0 2px 0', lineHeight: 1.5}}>물품 구매</Box>
                            <Box sx={{fontSize: 10, color: 'grey', padding: '2px 0 0 0', lineHeight: 1.5}}>사이트에 등록된<br/>다양한 물품들을 구매해보세요.</Box>
                        </Grid>
                        <Grid item>
                            <PercentRoundedIcon />
                            <Box sx={{fontFamily: 'PretendardM', fontSize: 14, padding: '0 0 2px 0', lineHeight: 1.5}}>서비스 할인</Box>
                            <Box sx={{fontSize: 10, color: 'grey', padding: '2px 0 0 0', lineHeight: 1.5}}>다양한<br/>공직 서비스들을 할인해보세요.</Box>
                        </Grid>
                    </Grid>
                    <Box sx={{padding: '10px 0 20px 0'}}><CustomButton onClick={onClickManagePoints} variant="contained">포인트 확인하러가기</CustomButton></Box>
                </Grid>
            </Banner>
            <Banner container direction="row"  sx={{backgroundColor: '#F1F1FD'}}>
                <Grid item sx={{paddingRight: '80px'}}>
                    <Box sx={{fontFamily: 'PretendardB', fontSize: 20, padding: '20px 0 10px 0', lineHeight: 1.5}}>포인트를 사용하여<br/>다양한 물품 구매</Box>
                    <Box sx={{fontSize: 14, color: 'grey', padding: '10px 0 30px 0', lineHeight: 1.5}}>지급받은 포인트를 사용하여<br/>사이트에 등록된 다양한 물품들을 구매하세요.</Box>
                    <Box sx={{padding: '30px 0 20px 0'}}><CustomButton onClick={onClickUsePoints} variant="contained">물품 구매하러가기</CustomButton></Box>
                </Grid>
                <Grid item sx={{paddingLeft: '80px'}}><img src={main3} width={300} alt="img"/></Grid>
            </Banner>
            <p>{message}</p>

        </>
    );
}

const Banner = styled(Grid)(() => ({
    // border: '1px dashed #A09',
    height: 400, 
    justifyContent: "center",
    alignItems: "center",
}));

const CustomButton = styled(Button)(() => ({
    fontFamily: 'PretendardM', 
    fontSize: 16, 
    boxShadow: 'none', 
    backgroundColor: '#0094FF', 
    borderRadius: 0,
    '&:hover': {
        backgroundColor: '#0094FF',
    },
}));

export default MainPage;