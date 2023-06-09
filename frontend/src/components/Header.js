import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Web3 from 'web3';
import { Box, Stack, Avatar, Button } from '@mui/material';
import abiobj2 from '../js/ContractABI2';
import Users from '../data/Users';

const contractAddress2 = '0xc5c7dC1950dE092715a08658812D94A5E76F44AF';


function Header() {
    var login = sessionStorage.getItem('userId')!==null;
    const navigate = useNavigate();
    const [wallet, setWallet] = useState("");
    const [balanceInEther, setBalanceInEther] = useState("");
    const [tokenBalance, settokenBalance] = useState(0);

    // Redux store에서 totalPoints를 가져옴
    const totalPoints = useSelector(state => state.totalPoints);

    // useEffect(() => {
    //   getCurrentWalletBalance();
    // }, [wallet]);
    
    const onClickHome = () => {
        navigate('/');
    };

    const onClickUser = () => {
        if(login === false) {
            navigate('/login');
        } else {
            navigate('/mypage');
        }
    };

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

    const web3 = new Web3(window.ethereum);
    const getCurrentWalletBalance = async () => {
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            const address = accounts[0];
            const balanceInWei = await web3.eth.getBalance(address);
            const balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');
            setBalanceInEther(balanceInEther);
            console.log(`Wallet address: ${address}`);
            console.log(`Balance in ether: ${balanceInEther}`);
          } else {
            console.log("No wallet connected.");
          }
        } catch (err) {
          console.error(err);
        }
      }
    };

    useEffect(() => {
      const fetchToken = async () => {
          const accounts = await web3.eth.getAccounts();
          const contract2 = new web3.eth.Contract(abiobj2, contractAddress2);
          const balance =await contract2.methods.balanceOf(accounts[0]).call();
          settokenBalance(parseFloat(web3.utils.fromWei(balance, 'ether')).toLocaleString('en-US'));
      };
      fetchToken();
      }, [tokenBalance]);

    return (
        <>
            <Frame>
                <Stack direction="row" alignItems='center' justifyContent='space-between'>
                    <Box><Title onClick={onClickHome}>SINEMUSCAT</Title></Box>
                    <Stack direction="row" spacing={5}>
                        <Box><Menu onClick={onClickCert}>봉사 인증서 관리</Menu></Box>
                        <Box><Menu onClick={onClickUsePoints}>포인트 사용</Menu></Box>
                        <Box><Menu onClick={onClickManagePoints}>{tokenBalance} Points</Menu></Box> 
                        {
                            login ? 
                            <LoginAvatar onClick={onClickUser}>{Users[sessionStorage.getItem('userId')].name.substring(1,3)}</LoginAvatar> :
                            <CustomAvatar onClick={onClickUser} />
                        }
                    </Stack>
                </Stack>
            </Frame>
            <Box sx={{height: 60}} />
        </>
    );
}

const Frame = styled(Box)(() => ({
    padding: '5px 30px 5px 20px', 
    backgroundColor: 'white',
    position: 'fixed', 
    top: 0, 
    left: 0, 
    right: 0,
    zIndex: 999,
}));

const Title = styled(Button)(() => ({
    // border: '1px dashed #D09', 
    textAlign: 'center', 
    fontFamily: 'PretendardB', 
    fontSize: 22,
    color: 'black',
    '&:hover': {
        backgroundColor: 'transparent',
        color: 'grey',
      },
}));

const Menu = styled(Button)(() => ({
    // border: '1px dashed #F09', 
    width: '100%',
    textAlign: 'center', 
    fontFamily: 'PretendardL',
    fontSize: 14,
    color: 'black',
    '&:hover': {
        backgroundColor: 'transparent',
        color: 'grey',
      },
}));

const LoginAvatar = styled(Avatar)(() => ({
    height: 35,
    width: 35,
    backgroundColor: sessionStorage.getItem('userColor'),
    fontSize: 16,
    '&:hover': {
        backgroundColor: sessionStorage.getItem('userColor')+'80',
        cursor: 'pointer'
      },
}));

const CustomAvatar = styled(Avatar)(() => ({
    height: 35,
    width: 35,
    '&:hover': {
        backgroundColor: '#D9D9D9',
        cursor: 'pointer'
      },
}));

export default Header;