import React, {useState} from 'react';
import Web3 from "web3";
import { styled } from '@mui/material/styles';
import { Box, Button, Modal, Stack, Avatar, TextField, InputAdornment } from '@mui/material'
import Close from "@mui/icons-material/CloseRounded";

function PresendPointModal() {
    const [open, setOpen] = useState(false);
    const [wallet, setWallet] = useState("");
    const [balanceInEther, setBalanceInEther] = useState("");
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onClickWallet = async () => {
      if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
        try {
          /* MetaMask is installed */
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setWallet(accounts[0]);
          console.log(accounts[0]);
        } catch (err) {
          console.error(err.message);
        }
      } else {
        /* MetaMask is not installed */
        alert("Please install MetaMask");
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      // Connect the wallet
      await onClickWallet();

      // Check if wallet is connected
      if (wallet === '') {
        console.log('Wallet not connected');
        return;
      }

      const recipient = e.target.received.value;
      
      const amountEntered = e.target.amount.value; // Get the amount entered by the user
      const amountInEther = amountEntered * 0.1; // Multiply the entered value by 0.1 
    

       // Send transaction
       await web3.eth.sendTransaction({
        from: wallet,
        to: recipient,
        value: amountInWei,
      });
    };

    
    return (
        <>
            <CustomButton variant="contained" onClick={handleOpen}>포인트 선물하기</CustomButton>
            <Modal open={open} onClose={handleClose}>
                <Body alignItems='center' spacing={2}>
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