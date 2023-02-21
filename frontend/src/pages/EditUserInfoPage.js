import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Button, TextField, Stack, ToggleButton, ToggleButtonGroup, Select, MenuItem } from '@mui/material';
import PhoneAndroidRoundedIcon from '@mui/icons-material/PhoneAndroidRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Header from '../components/Header';

function EditUserInfoPage() {
    const [gender, setGender] = useState('female');
    const [email, setEmail] = React.useState('');
    
    const navigate = useNavigate();

    const handleGenderChange = (event, newGender) => {
        setGender(newGender);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
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
                            defaultValue="dnjsrbwls"
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
                            inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                        />
                    </ItemStack>
                    <ItemStack direction="row" alignItems='center'>
                        <ItemTitle>비밀번호 확인</ItemTitle>
                        <TextField 
                            size="small" 
                            inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                        />
                        <CloseRoundedIcon sx={{color: 'red', marginLeft: '10px'}} />
                    </ItemStack>
                </Stack>
                <Stack mt={5}>
                    <SubTitle>회원 정보</SubTitle>
                    <ItemStack direction="row" alignItems='center'>
                        <ItemTitle>이름</ItemTitle>
                        <TextField 
                            size="small" 
                            defaultValue="원규진"
                            sx={{width: 120}}
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
                            defaultValue="010"
                            inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                        />
                        <Box sx={{fontSize: 14, padding: '0 8px 0 8px'}}>-</Box>
                        <NumberField 
                            size="small" 
                            defaultValue="2581"
                            inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                        />
                        <Box sx={{fontSize: 14, padding: '0 8px 0 8px'}}>-</Box>
                        <NumberField 
                            size="small" 
                            defaultValue="7018"
                            inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                        />
                    </ItemStack>
                    <ItemStack direction="row" alignItems='center'>
                        <ItemTitle>이메일</ItemTitle>
                        <TextField 
                            size="small" 
                            defaultValue="dnjsrbwls08"
                            sx={{width: 130}}
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
                          <MenuItem value="" selected>gmail.com</MenuItem>
                          <MenuItem value={10}>naver.com</MenuItem>
                        </Select>
                    </ItemStack>
                    <ItemStack direction="row" alignItems='center'>
                        <ItemTitle>지갑 주소</ItemTitle>
                        <TextField 
                            size="small" 
                            inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                        />
                    </ItemStack>
                </Stack>
                <SaveButton>저장</SaveButton>
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

const SaveButton = styled(Button)(() => ({
    position: 'relative',
    left: '50%',
    transform: 'translate(-50%, 0)', 
    width: 150,
    marginTop: 100,
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