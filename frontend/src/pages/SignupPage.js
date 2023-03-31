import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Button, TextField, Stack, ToggleButton, ToggleButtonGroup, Select, MenuItem } from '@mui/material';
import PhoneAndroidRoundedIcon from '@mui/icons-material/PhoneAndroidRounded';
import Close from '@mui/icons-material/CloseRounded';
import Check from '@mui/icons-material/TaskAltRounded';

import Header from '../components/Header';
import Users from '../data/Users';

function SignupPage() {
    const [step, setStep] = useState(false);
    const [id, setId] = useState('');
    const [idCheck, setIdCheck] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordC, setPasswordC] = useState('');
    const [passwordCheck, setPasswordCheck] = useState(false);
    const [name, setName] = useState('');
    const [gender, setGender] = useState('male');
    const [phoneNumber, setPhoneNumber] = useState('01025817018');
    const [emailInput, setEmailInput] = useState('');
    const [email, setEmail] = useState('gmail.com');
    const [wallet, setWallet] = useState('1234');
    
    const navigate = useNavigate();
    const onClickSetStep = () => {
        setStep(false);
    };

    const handleGenderChange = (event, newGender) => {
        setGender(newGender);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

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

    const onClickCheckId = () => {
        if (Object.keys(Users).includes(id)) {
            alert("이미 존재하는 아이디입니다.")
            setIdCheck(false)
        } else {
            alert("사용 가능한 아이디입니다.")
            setIdCheck(true)
        }
    };

    const onClickSignUp = () => {
        if (!id || !password || !name || !emailInput || !wallet) {
            alert("입력하지 않은 값이 있습니다.")
        }
        else if (!idCheck) {
            alert("아이디 중복 확인이 되지 않았습니다.")
        }
        else if (!passwordCheck) {
            alert("비밀번호 일치 확인이 되지 않았습니다.")
        }
        else if (id.length<4 || id.length>10) {
            alert("아이디는 4~10글자 이내여야합니다.")
        }
        else {
            Users[id] = {
                id: id,
                password: password,
                name: name,
                gender: gender,
                birth: '',
                phoneNumber: phoneNumber,
                email: emailInput+'@'+email,
                walletAddress: wallet,
                totalPoints: 0,
                pointList: [],
                certificationList: [],
                purchaseList: [],
            };
            console.log(Users);
            alert(`회원가입 완료! ${name}님 환영합니다.`)
            navigate('/login');
        }
    };

    return (
        <>
            <Header />
            <Title>회원가입</Title>
            <Box sx={{position: 'relative'}}>
                <ProgressBar />
                <Stack alignItems='center' sx={{position: 'absolute', left: '30%'}}>
                    <Step>step 1</Step>
                    <StepColor sx={{backgroundColor: step ? '#0094FF' : 'lightgrey'}} />
                    <StepTitle>본인 인증</StepTitle>
                </Stack>
                <Stack alignItems='center' sx={{position: 'absolute', right: '30%'}}>
                    <Step>step 2</Step>
                    <StepColor sx={{backgroundColor: step ? 'lightgrey' : '#0094FF'}} />
                    <StepTitle>회원 정보 입력</StepTitle>
                </Stack>
            </Box>
            <Body>
                {
                step ? 
                <AuthStack alignItems="center" spacing={2}>
                    <Box sx={{fontFamily: 'PretendardB', fontSize: 18}}>휴대폰 인증</Box>
                    <Box sx={{fontSize: 14}}>휴대폰 인증 관련된 설명</Box>
                    <PhoneAndroidRoundedIcon sx={{fontSize: 120, color: 'lightgrey', padding: 1}} />
                    <AuthButton onClick={onClickSetStep}>휴대폰 인증</AuthButton>
                </AuthStack> :
                <>
                    <Stack>
                        <SubTitle>가입 정보</SubTitle>
                        <ItemStack direction="row" alignItems='center'>
                            <ItemTitle>아이디</ItemTitle>
                            <TextField 
                                size="small" 
                                value={id}
                                onChange={(event) => {
                                    setId(event.target.value);
                                    setIdCheck(false);
                                }}
                                inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                            />
                            <CheckButton onClick={onClickCheckId} disabled={idCheck}>중복 확인</CheckButton>
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
                              <GenderButton value="femal">여자</GenderButton>
                            </ToggleButtonGroup>
                        </ItemStack>
                        <ItemStack direction="row" alignItems='center'>
                            <ItemTitle>전화번호</ItemTitle>
                            <NumberField 
                                size="small"
                                defaultValue={phoneNumber.substring(0,3)}
                                disabled={true}
                                inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                            />
                            <Box sx={{fontSize: 14, padding: '0 8px 0 8px'}}>-</Box>
                            <NumberField 
                                size="small"
                                defaultValue={phoneNumber.substring(3,7)} 
                                disabled={true}
                                inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                            />
                            <Box sx={{fontSize: 14, padding: '0 8px 0 8px'}}>-</Box>
                            <NumberField 
                                size="small" 
                                defaultValue={phoneNumber.substring(7,11)}
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
                    <SignupButton onClick={onClickSignUp}>가입</SignupButton>
                </>
                }
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

const ProgressBar = styled(Box)(() => ({
    position: 'absolute', 
    left: '50%', 
    transform: 'translate(-50%, 0)', 
    width: '80%', 
    height: '0.5px',
    backgroundColor: 'lightgrey', 
    marginTop: '32px'
})); 

const Step = styled(Box)(() => ({
    fontSize: 11, 
    marginBottom: '7px'
})); 

const StepColor = styled(Box)(() => ({
    height: '24px', 
    width: '24px', 
    borderRadius: 50
})); 

const StepTitle = styled(Box)(() => ({
    fontSize: 12, 
    marginTop: '8px'
})); 

const Body = styled(Box)(() => ({
    display: 'block',
    position: 'relative',
    top: 120,
    left: '50%',
    width: 500,
    marginTop: 10,
    paddingBottom: 50,
    transform: 'translate(-50%, -0)', 
}));

const AuthStack = styled(Stack)(() => ({
    position: 'relative', 
    border: '1px solid lightgrey', 
    width: 450, 
    padding: '30px 0 30px 0', 
    left: '50%', 
    transform: 'translate(-50%, -0)'
}));

const AuthButton = styled(Button)(() => ({
    width: 140,
    marginTop: 30,
    padding: 6,
    fontFamily: 'PretendardM', 
    fontSize: 14, 
    boxShadow: 'none', 
    color: 'white',
    backgroundColor: '#0094FF', 
    '&:hover': {
        backgroundColor: '#34ABFF',
    },
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
    // backgroundColor: '#EFEFEF',
    // borderRadius: 5,
}));

const WalletButton = styled(Button)({
    width: 200, 
    fontFamily: 'PretendardL',
    fontSize: 13,
    color: '#0094FF',
    border: '1px solid #0094FF',
});

const SignupButton = styled(Button)(() => ({
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

export default SignupPage;