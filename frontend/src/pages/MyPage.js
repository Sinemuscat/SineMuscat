import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Grid, Stack, Button, Avatar } from '@mui/material';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Header from '../components/Header';
import abiobj from "../js/ContractABI.js";
import abiobj2 from "../js/ContractABI2.js";
import Web3 from 'web3';
import axios from "axios";


import Users from '../data/Users';

const contractAddress = "0x6462549A4Dbe5C7267d838c9Ac9418b41346916e";
const contractAddress2 = '0xc5c7dC1950dE092715a08658812D94A5E76F44AF';




function MyPage() {
    // Redux store에서 totalPoints를 가져옴
    // const totalPoints = useSelector(state => state.totalPoints);

    const user = Users[sessionStorage.getItem('userId')];
    // const totalTime = user.certificationList.reduce((acc, cur) => acc + cur.hour, 0);
    const unusedProduct = user.purchaseList.filter(item => !item.isUsed).length;

    const [certList, setCertList] = useState(user.certificationList.sort((a, b) => b.id - a.id));
    const [totalPoints, setTotalPoints] = useState(0);
    const [tokenBalance, settokenBalance] = useState(0);
    const [totalCnt, setTotalCnt] = useState(certList.length);
    const [totalTime, setTotalTime] = useState(certList.reduce((acc, cur) => acc + cur.hour, 0));



    const navigate = useNavigate();
    
    const onClickEdit = () => {
        navigate('/edituserinfo');
    };

    const onClickLogout = () => {
        if(window.confirm("로그아웃 하시겠습니까?")) {
            sessionStorage.clear()
            navigate("/")
        }
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



    useEffect(() => {
        const fetchNFTData = async () => {
          if (
            typeof window !== "undefined" &&
            typeof window.ethereum !== "undefined"
          ) {
            try {
              const web3 = new Web3(window.ethereum);
              const accounts = await web3.eth.getAccounts();
    
              if (accounts.length === 0) {
                console.log("No wallet connected.");
                return;
              }
    
              const contract = new web3.eth.Contract(abiobj, contractAddress);
              const tempnftListArray = await contract.methods
                .getNftTokens(accounts[0])
                .call();
    
              const certDataPromises = tempnftListArray.map(async (nft) => {
                const ipfsData = await fetchIPFSData(nft.nftTokenURI);
                return ipfsData;
              });
    
              const certData = await Promise.all(certDataPromises);
              setCertList(certData);
              setTotalPoints(
                certData.reduce((acc, cur) => acc + Number(cur.point), 0)
              );
              setTotalCnt(certData.length);
              setTotalTime(
                certData.reduce((acc, cur) => acc + Number(cur.hour), 0)
              );
    
              const contract2 = new web3.eth.Contract(abiobj2, contractAddress2);
              const balance =await contract2.methods.balanceOf(accounts[0]).call();
              settokenBalance(parseFloat(web3.utils.fromWei(balance, 'ether')).toLocaleString('en-US'));
              
            } catch (err) {
              console.error(err);
            }
          }
        };
        fetchNFTData();
      }, []);

      const fetchIPFSData = async (ipfsAddress) => {
        try {
          const response = await axios.get(ipfsAddress);
          const { name, content, volunteerDate, submitDate, hour, point } =
            response.data;
          return { name, content, volunteerDate, submitDate, hour, point };
        } catch (error) {
          console.log("Failed to fetch IPFS data.", error);
          return null;
        }
      };


    return (
        <>
            <Header />
            <Title>마이페이지</Title>
            <Body container spacing={2}>
                <Grid item xs={6} alignItems="center">
                    <Item alignItems="center" spacing={2}>
                        <UserAvatar>{user.name.substring(1,3)}</UserAvatar>
                        <Stack direction="row" alignItems="end">
                            <Box sx={{fontSize: 25, fontFamily: 'PretendardB'}}>{user.name}</Box>
                            <Box sx={{fontSize: 16, margin: '0 0 2px 4px', fontFamily: 'PretendardB'}}>님</Box>
                        </Stack>
                        <Stack>
                            <CustomButton onClick={onClickEdit} sx={{fontSize: 16, padding: 0}}>
                                <Stack direction="row" alignItems="center">
                                    <Box sx={{color: 'grey'}}>회원 정보</Box>
                                    <Box sx={{color: 'black', marginLeft: '5px'}}>수정</Box>
                                    <ChevronRightRoundedIcon sx={{color: 'black'}} />
                                </Stack>
                            </CustomButton>
                            <CustomButton onClick={onClickLogout} sx={{fontSize: 16, padding: 0}}>
                                <Stack direction="row" alignItems="center">
                                    <Box sx={{color: 'grey'}}>로그아웃</Box>
                                    <ChevronRightRoundedIcon sx={{color: 'black'}} />
                                </Stack>
                            </CustomButton>
                        </Stack>
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
                            <Box sx={{color: 'black', marginLeft: '5px'}}>{totalPoints} 점</Box>
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
                            <Box sx={{color: 'black', marginLeft: '5px'}}>{totalCnt} 회</Box>
                        </Stack>
                        <Stack direction="row">
                            <Box sx={{color: 'grey'}}>총 봉사 시간</Box>
                            <Box sx={{color: 'black', marginLeft: '5px'}}>{Math.floor(totalTime)}시간 {0}분</Box>
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
                            <Box sx={{color: 'black', marginLeft: '5px'}}>{user.purchaseList.length} 회</Box>
                        </Stack>
                        <Stack direction="row">
                            <Box sx={{color: 'grey'}}>미사용 상품</Box>
                            <Box sx={{color: 'black', marginLeft: '5px'}}>{unusedProduct} 개</Box>
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

const UserAvatar = styled(Avatar)(() => ({
    width: 65, 
    height: 65, 
    backgroundColor: sessionStorage.getItem('userColor'), 
    fontSize: 30
}));

export default MyPage;