import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Button, Modal, Stack, Checkbox } from '@mui/material'
import Close from "@mui/icons-material/CloseRounded";
import Minus from '@mui/icons-material/RemoveRounded';
import Arrow from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import { BeatLoader } from 'react-spinners';
import abiobj2 from '../js/ContractABI2';
import Users from '../data/Users';
import BigNumber from 'bignumber.js';

const contractAddress2 = '0xc5c7dC1950dE092715a08658812D94A5E76F44AF';
const recipientAddress = '0xec2C46385e57223Ba0E754eaAE0b57C6a239019c';


function ConfirmPurchaseModal({product, count}) {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(true);
    const [loading, setLoading] = useState(false);
    const [wallet, setWallet] = useState('');
    const [balanceInEther, setBalanceInEther] = useState('');
    const [tokenBalance, setTokenBalance] = useState(0);
    const [purchaseProduct, setPurchaseProduct] = useState(null);
    const [purchaseCount, setPurchaseCount] = useState(0);
    const web3 = new Web3(window.ethereum);

    // Redux store에서 totalPoints를 가져옴
    const totalPoints = useSelector(state => state.totalPoints);

    const getCurrentWalletBalance = async () => {
      if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts',
          });
          if (accounts.length > 0) {
            const address = accounts[0];
            const balanceInWei = await web3.eth.getBalance(address);
            const balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');
            setBalanceInEther(balanceInEther);
            console.log(`Wallet address: ${address}`);
            console.log(`Balance in ether: ${balanceInEther}`);
          } else {
            console.log('No wallet connected.');
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
  
    useEffect(() => {
      const getBalance = async () => {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });
        if (accounts.length > 0) {
          const address = accounts[0];
          const MyTokenContract = new web3.eth.Contract(abiobj2, contractAddress2);
          const balance = await MyTokenContract.methods.balanceOf(address).call();
          setTokenBalance(web3.utils.fromWei(balance, 'ether'));
        }
      };
  
      getBalance();
    }, []);
  
    useEffect(() => {
      getCurrentWalletBalance();
    }, [wallet]);
  

    const handleOpen = () => {
      if (totalPoints < product.price*count) {
        alert("포인트가 부족합니다.");
        return;
      }
      else {
        setOpen(true);
      }
    }

    const handleClose = () => {
        setOpen(false);
        setError(!error);
    }

    const navigate = useNavigate();
    
    const purchase = async (value) => {
      setLoading(true);
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        const address = accounts[0];
        const MyTokenContract = new web3.eth.Contract(abiobj2, contractAddress2);
        const valueInEther = new BigNumber(product.price).multipliedBy(count);
        const valueInWei = web3.utils.toWei(valueInEther.toFixed(), 'ether');
        const tokenValue = new BigNumber(product.price).multipliedBy(count).multipliedBy(10 ** 18); // assuming you want to send `count` amount of tokens

        MyTokenContract.methods
          .balanceOf(address)
          .call()
          .then((balance) => {
            if (new BigNumber(balance).comparedTo(tokenValue) < 0) {
              throw new Error('Not enough tokens for transaction');
            }
            return MyTokenContract.methods.transfer(recipientAddress, tokenValue.toFixed()).send({ from: address });
          })
          .then(() => {
            console.log('Token transfer successful.');
            setLoading(false);
            navigate('/purchaseresult', { state: { product: purchaseProduct, count: purchaseCount } });
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      } else {
        console.log('No wallet connected.');
        setLoading(false);
      }
    };

    const [checked, setChecked] = useState(false);
    const handleCheckChange = (event) => {
        if (event.target.checked) {
          setChecked(true);
        } else {
          setChecked(false);
        }
    };

    const onClickPurchase = () => {
        // 결제 동의가 체크 되었을 때만 결제 진행
        if (checked) {
            purchase();
        }
        else {
            alert("결제 동의 항목에 체크가 필요합니다.")
        }
      };

      useEffect(() => {
        setPurchaseProduct(product);
        setPurchaseCount(count);
      }, [product, count]);

    return (
        <>
            <PurchaseButton onClick={handleOpen}>구매하기</PurchaseButton>
            <Modal open={open} onClose={handleClose}>
                <Body spacing={2}>
                    {
                        loading ?
                        <Stack sx={{padding: '100px 80px'}} alignItems="center" spacing={2}>
                          <BeatLoader color="#0094FF" loading={loading} size={15} />
                          <Box sx={{color: 'grey'}}>거래를 진행 중입니다.</Box>
                        </Stack> :
                        <>
                    <CloseButton onClick={handleClose} title="닫기" />
                    <Title>구매 하시겠습니까?</Title>
                    <Stack spacing={1}>
                        <SubTitle>상품 정보</SubTitle>
                        <Stack direction="row">
                            <ProductImg />
                            <Stack spacing={0.5} ml={2}>
                                <ProductName>{product.name}</ProductName>
                                <ProductCount>수량 : {count}개</ProductCount>
                            </Stack>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center" py={1}>
                            <PointChange spacing={0.5}>
                                <SubTitle sx={{textAlign: 'center'}}>보유 Points</SubTitle>
                                      <SubContent sx={{ color: 'grey' }}>{tokenBalance ? Number.parseFloat(tokenBalance).toFixed(3) + ' Points' : ''}</SubContent>
                            </PointChange>
                            <Minus />
                            <PointChange spacing={0.5}>
                                <SubTitle sx={{textAlign: 'center'}}>주문 Points</SubTitle>
                                <SubContent sx={{ color: '#0094FF', fontFamily: 'PretendardM' }}>{new BigNumber(product.price).multipliedBy(count).toFixed()} Points</SubContent>
                            </PointChange>
                            <Arrow />
                            <PointChange spacing={0.5}>
                                <SubTitle sx={{textAlign: 'center'}}>잔여 Points</SubTitle>
                                <SubContent sx={{ color: 'grey' }}>
                                  {tokenBalance && product.price && count
                                    ? new BigNumber(tokenBalance).minus(new BigNumber(product.price).multipliedBy(count)).toFixed(3) + ' Points'
                                    : ''}
                </SubContent>                            </PointChange>
                        </Stack>
                        <Stack py={1} spacing={0.5}>
                            <Description>상품 쿠폰이 다음 연락처로 발송됩니다.</Description>
                            <SubTitle>{
                                Users[sessionStorage.getItem('userId')].phoneNumber.slice(0,3)+"-"+
                                Users[sessionStorage.getItem('userId')].phoneNumber.slice(3,7)+"-"+
                                Users[sessionStorage.getItem('userId')].phoneNumber.slice(7,11)
                            }</SubTitle>
                        </Stack>
                        <Description sx={{textAlign: 'center'}} pt={1}>
                            <Checkbox size="small" sx={{padding: '5px'}} onChange={handleCheckChange} />
                            회원 본인은 구매 조건, 주문 내용 확인 및 결제에 동의합니다.
                        </Description>
                    </Stack>
                    <ConfirmButton onClick={onClickPurchase}>{product.price*count} Points 결제하기</ConfirmButton>
                        </>
                    }
                </Body>
            </Modal>
        </>
    );
}

const Title = styled(Box)(() => ({
    paddingTop: '20px',
    textAlign: 'center',
    fontFamily: 'PretendardB', 
    fontSize: 18,
}));

const Body = styled(Stack)(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    overflowX: 'hidden',
    overflowY: 'auto',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 10px 50px rgb(70, 70, 70)',
    padding: '20px 80px 40px 80px',
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

const ProductImg = styled(Box)(() => ({
    width: '60px', 
    height: '60px', 
    backgroundColor: '#F0F0F0'
}));

const ProductName = styled(Box)(() => ({
    fontSize: '18px',
    fontFamily: 'PretendardB'
}));

const ProductCount = styled(Box)(() => ({
    fontSize: '12px',
    color: 'grey'
}));

const PointChange = styled(Stack)(() => ({
    backgroundColor: '#F8F8F8',
    width: '90px',
    padding: '10px 15px 10px 15px',
    border: '0.5px solid #E0E0E0',
    borderRadius: 10,
}));

const SubTitle = styled(Box)(() => ({
    fontSize: 16,
    fontFamily: 'PretendardB'
}));

const SubContent = styled(Box)(() => ({
    fontSize: 14,
    textAlign: 'center'
}));

const Description = styled(Box)(() => ({
    fontSize: 12,
    color: '#B0B0B0'
}));

const ConfirmButton = styled(Button)(() => ({
    width: '100%',
    padding: 8,
    fontFamily: 'PretendardM', 
    fontSize: 16, 
    boxShadow: 'none', 
    color: 'white',
    backgroundColor: '#0094FF', 
    '&:hover': {
        backgroundColor: '#34ABFF',
    },
}));

const PurchaseButton = styled(Button)(() => ({
    position: 'relative',
    left: '50%',
    transform: 'translate(-50%, 0)', 
    width: '100%',
    padding: 12,
    fontFamily: 'PretendardM', 
    fontSize: 16, 
    boxShadow: 'none', 
    color: 'white',
    backgroundColor: '#0094FF', 
    '&:hover': {
        backgroundColor: '#34ABFF',
    },
}));

export default ConfirmPurchaseModal;