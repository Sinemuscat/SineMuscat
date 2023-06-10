import React, { useState } from 'react';
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Button, TextField, Stack, ToggleButton, ToggleButtonGroup, Select, MenuItem } from '@mui/material';
import Close from '@mui/icons-material/CloseRounded';
import Check from '@mui/icons-material/TaskAltRounded';

import Header from '../components/Header';
import Users from '../data/Users';

function EditUserInfoPage() {
    const [id, setId] = useState(Users[sessionStorage.getItem('userId')].id);
    const [password, setPassword] = useState(Users[sessionStorage.getItem('userId')].password);
    const [passwordC, setPasswordC] = useState('');
    const [passwordCheck, setPasswordCheck] = useState(false);
    const [name, setName] = useState(Users[sessionStorage.getItem('userId')].name);
    const [gender, setGender] = useState(Users[sessionStorage.getItem('userId')].gender);
    const [phoneNumber, setPhoneNumber] = useState(Users[sessionStorage.getItem('userId')].phoneNumber);
    const [emailInput, setEmailInput] = useState(Users[sessionStorage.getItem('userId')].email.split('@')[0]);
    const [email, setEmail] = useState(Users[sessionStorage.getItem('userId')].email.split('@')[1]);
    const [walletAddress, setWalletAddress] = useState(Users[sessionStorage.getItem('userId')].walletAddress);
    const [wallet, setWallet] = useState(true);

    
    const navigate = useNavigate();

    const handleGenderChange = (event, newGender) => {
        setGender(newGender);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    /****** Edit by Hyeyeon *******/
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

    const onClickEdit = () => {
        if (!id || !password || !name || !emailInput || !wallet) {
            alert("입력하지 않은 값이 있음")
        }
        else if (!passwordCheck) {
            alert("비밀번호 일치 확인이 되지 않았습니다.")
        }
        else {
            Users[id].password = password;
            Users[id].name = name;
            Users[id].gender = gender;
            Users[id].email = emailInput+'@'+email;
            // Users[id].walletAddress = walletAddress;
            console.log(Users[id]);
            alert(`회원 정보 수정 완료!`)
            navigate('/mypage');
        }
    };

    return (
        <>
            <Header />
            <Title>회원 정보 수정</Title>
            <Body>
                <Stack>
                    <SubTitle>가입 정보</SubTitle>
                    <ItemStack direction="row" alignItems='center'>
                        <ItemTitle>아이디</ItemTitle>
                        <TextField 
                            size="small" 
                            value={id}
                            disabled={true}
                            inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                        />
                        <CheckButton disabled>중복 확인</CheckButton>
                    </ItemStack>
                    <Stack direction="row" alignItems='center' sx={{paddingTop: '5px'}}>
                        <ItemTitle></ItemTitle>
                        <Box sx={{fontSize: 8, color: 'lightgrey'}}>4~10글자 이내, 영어 대소문자, 한글, 숫자만 허용</Box>
                    </Stack>
                    <ItemStack direction="row" alignItems='center'>
                        <ItemTitle>비밀번호</ItemTitle>
                        <TextField 
                            size="small" 
                            value={password}
                            type="password"
                            onChange={(event) => {
                              setPassword(event.target.value);
                              if (event.target.value===passwordC) {
                                setPasswordCheck(true);
                            } else {
                                setPasswordCheck(false);
                            }
                            }}
                            inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                        />
                    </ItemStack>
                    <ItemStack direction="row" alignItems='center'>
                        <ItemTitle>비밀번호 확인</ItemTitle>
                        <TextField 
                            size="small" 
                            value={passwordC}
                            type="password"
                            onChange={(event) => {
                                setPasswordC(event.target.value);
                                if (password===event.target.value) {
                                    setPasswordCheck(true);
                                } else {
                                    setPasswordCheck(false);
                                }
                            }}
                            inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                        />
                        {
                            passwordCheck ?
                            <Check sx={{color: 'green', marginLeft: '10px'}} /> :
                            <Close sx={{color: 'red', marginLeft: '10px'}} />
                        }
                    </ItemStack>
                </Stack>
                <Stack mt={5}>
                    <SubTitle>회원 정보</SubTitle>
                    <ItemStack direction="row" alignItems='center'>
                        <ItemTitle>이름</ItemTitle>
                        <TextField 
                            size="small" 
                            sx={{width: 120}}
                            value={name}
                            onChange={(event) => {
                              setName(event.target.value);
                            }}
                            inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                        />
                    </ItemStack>
                    <ItemStack direction="row" alignItems='center'>
                        <ItemTitle>성별</ItemTitle>
                        <ToggleButtonGroup
                          value={gender}
                          exclusive
                          onChange={handleGenderChange}
                          aria-label="Platform"
                          size="small"
                        >
                          <GenderButton value="male">남자</GenderButton>
                          <GenderButton value="female">여자</GenderButton>
                        </ToggleButtonGroup>
                    </ItemStack>
                    <ItemStack direction="row" alignItems='center'>
                        <ItemTitle>전화번호</ItemTitle>
                        <NumberField 
                            size="small"
                            value={phoneNumber.substring(0,3)}
                            disabled={true}
                            inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                        />
                        <Box sx={{fontSize: 14, padding: '0 8px 0 8px'}}>-</Box>
                        <NumberField 
                            size="small" 
                            value={phoneNumber.substring(3,7)}
                            disabled={true}
                            inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                        />
                        <Box sx={{fontSize: 14, padding: '0 8px 0 8px'}}>-</Box>
                        <NumberField 
                            size="small" 
                            value={phoneNumber.substring(7,11)}
                            disabled={true}
                            inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                        />
                    </ItemStack>
                    <ItemStack direction="row" alignItems='center'>
                        <ItemTitle>이메일</ItemTitle>
                        <TextField 
                            size="small" 
                            sx={{width: 130}}
                            value={emailInput}
                            onChange={(event) => {
                                setEmailInput(event.target.value);
                              }}
                            inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                        />
                        <Box sx={{fontSize: 14, padding: '0 8px 0 8px'}}>@</Box>
                        <Select
                          value={email}
                          onChange={handleEmailChange}
                          displayEmpty
                          size="small"
                          MenuProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                        >
                          <MenuItem value="gmail.com" selected>gmail.com</MenuItem>
                          <MenuItem value="naver.com">naver.com</MenuItem>
                        </Select>
                    </ItemStack>
                    <ItemStack direction="row" alignItems='center'>
                        <ItemTitle>지갑 연결</ItemTitle>
                        <WalletButton variant={'outlined'} onClick={onClickWallet}>
                        {wallet && wallet.length > 0 ? '연결되었습니다' : 'Metamask 지갑 연결'}
                        </WalletButton>
                    </ItemStack>
                    <ItemStack direction="row" alignItems='center' sx={{height: '35px'}}>
                        <ItemTitle>지갑 주소</ItemTitle>
                        <Box sx={{color: 'grey', fontSize: 14}}>
                            {wallet && wallet.length > 0 ? `${wallet.substring()}` : ''}
                        </Box>
                    </ItemStack>
                </Stack>
                <SaveButton onClick={onClickEdit}>저장</SaveButton>
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

const Body = styled(Box)(() => ({
    display: 'block',
    position: 'relative',
    left: '50%',
    width: 500,
    marginTop: 10,
    paddingBottom: 50,
    transform: 'translate(-50%, -0)', 
}));

const SubTitle = styled(Box)(() => ({
    fontFamily: 'PretendardM',
    fontSize: 16,
    padding: '10px 0 10px 0'
}));

const ItemStack = styled(Stack)(() => ({
    paddingTop: '20px'
}));

const ItemTitle = styled(Box)(() => ({
    width: 100,
    fontSize: 13,
    color: 'grey',
}));

const CheckButton = styled(Button)(() => ({
    padding: '2px 12px 2px 12px',
    marginLeft: 10,
    fontFamily: 'PretendardM', 
    fontSize: 12, 
    boxShadow: 'none', 
    color: 'white',
    backgroundColor: '#0094FF', 
    '&:hover': {
        backgroundColor: '#34ABFF',
    },
    "&:disabled": {
        color: 'white',
        backgroundColor: 'lightgrey', 
    }
}));

const GenderButton = styled(ToggleButton)({
    width: 100, 
    fontFamily: 'PretendardL',
    fontSize: 13,
    "&.Mui-selected": {
        color: "white",
        backgroundColor: '#0094FF'
    },
    "&.Mui-selected:hover" : {
        color: "white",
        backgroundColor: '#34ABFF'
    }
});

const NumberField = styled(TextField)(() => ({
    width: 60,
}));

const WalletButton = styled(Button)({
    width: 200, 
    fontFamily: 'PretendardL',
    fontSize: 13,
    color: '#0094FF',
    border: '1px solid #0094FF',
});

const SaveButton = styled(Button)(() => ({
    position: 'relative',
    left: '50%',
    transform: 'translate(-50%, 0)', 
    width: 150,
    marginTop: 80,
    padding: 10,
    fontFamily: 'PretendardM', 
    fontSize: 16, 
    boxShadow: 'none', 
    color: 'white',
    backgroundColor: '#0094FF', 
    '&:hover': {
        backgroundColor: '#34ABFF',
    },
}));

export default EditUserInfoPage;