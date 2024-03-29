import React, { useState } from 'react';
import Web3 from "web3";
import { styled } from '@mui/material/styles';
import { Box, Button, Modal, Stack, Avatar, TextField, InputAdornment } from '@mui/material'
import Close from "@mui/icons-material/CloseRounded";
import { BeatLoader } from 'react-spinners';
import abiobj2 from "../js/ContractABI2";

const contractAddress2 = "0xc5c7dC1950dE092715a08658812D94A5E76F44AF";

function PresendPointModal() {
  const [open, setOpen] = useState(false);
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpen = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const walletAddress = accounts[0];
        setWallet(walletAddress);
        console.log(walletAddress);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      alert("Please install MetaMask");
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
  
    if (!wallet) {
      alert("Wallet address is not set.");
      return;
    }
  
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abiobj2, contractAddress2);
    const recipient = e && e.target.received ? e.target.received.value : "";
    const amountEntered = e && e.target.amount ? e.target.amount.value : "";
  
    const amountInTokens = web3.utils.toWei(amountEntered, "ether");
  
    try {
      // 토큰 전송
      setLoading(true);
      await contract.methods.transfer(recipient, amountInTokens).send({ from: wallet });
      setLoading(false);
      handleClose(); // Close the modal  
    } catch (error) {
      console.error(error);
      alert("포인트 전송에 실패하였습니다. 다시 시도해주세요.");
      setLoading(false);
    }
  };
    
  return (
    <>
      <CustomButton variant="contained" onClick={handleOpen}>포인트 선물하기</CustomButton>
      <Modal open={open} onClose={handleClose}>
        <Body alignItems='center' spacing={2}>
          {loading ?
            <Stack sx={{padding: '100px 80px'}} alignItems="center" spacing={2}>
              <BeatLoader color="#0094FF" loading={loading} size={15} />
              <Box sx={{color: 'grey'}}>거래를 진행 중입니다.</Box>
            </Stack> :
            <>
          <CloseButton onClick={handleClose} title="닫기" />
          <Title>포인트 선물</Title>
          <form alignItems='center' onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <SubTitle>받는 사람</SubTitle>
              <Avatar />
              <TextField 
                type="text"
                id="received"
                size="small" 
                sx={{width: 250}}
                inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                placeholder="받는 사람 아이디를 입력해주세요."
              />
            </Stack>
            <Stack spacing={2} mt={4}>
              <SubTitle>선물할 포인트</SubTitle>
              <TextField
                type="number" 
                id="amount"
                size="small" 
                sx={{width: 250}}
                inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                InputProps={{
                  endAdornment: <InputAdornment position="end">Points</InputAdornment>,
                }}
                placeholder="100포인트 이상 입력해주세요."
                helperText="선물 가능 포인트 : 2,000 Points"
              />
            </Stack>
            <PresentButton type="submit">선물하기</PresentButton>
          </form>
          </>
          }
        </Body>
      </Modal>
    </>
  );
}

const Title = styled(Box)(() => ({
  paddingTop: '10px',
  paddingBottom: '20px',
  fontFamily: 'PretendardB', 
  fontSize: 18,
}));

const Body = styled(Stack)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '380px',
  overflowX: 'hidden',
  overflowY: 'auto',
  backgroundColor: 'white',
  borderRadius: '10px',
  boxShadow: '0 10px 50px rgb(70, 70, 70)',
  padding: '20px 30px 40px 30px',
}));

const CloseButton = styled(Close)(() => ({
  position: 'absolute', 
  right: 20, 
  cursor: 'pointer',
  color: 'grey',
  fontSize: 26,
  '&:hover': {
    color: 'lightgrey'
  },
}));

const SubTitle = styled(Box)(() => ({
  fontFamily: 'PretendardM',
  fontSize: '16px'
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

const PresentButton = styled(Button)(() => ({
  width: 250,
  padding: 10,
  marginTop: 50,
  fontFamily: 'PretendardM', 
  fontSize: 16, 
  boxShadow: 'none', 
  color: 'white',
  backgroundColor: '#0094FF', 
  '&:hover': {
    backgroundColor: '#34ABFF',
  },
}));

export default PresendPointModal;
