import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Stack, Button, TextField } from '@mui/material';
import Header from '../components/Header';

function FindPwPage() {    
    return (
        <>
            <Header />
            <Title>아이디/비밀번호 찾기</Title>
            <Body direction="row" spacing={3}>
                <CustomStack alignItems="center">
                    <BoxTitle>아이디 찾기</BoxTitle>
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
                            inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                        />
                        <Box sx={{fontSize: 14, padding: '0 8px 0 8px'}}>-</Box>
                        <NumberField 
                            size="small" 
                            inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                        />
                        <CheckButton>인증번호</CheckButton>
                    </ItemStack>
                    <ItemStack direction="row" alignItems='center'>
                        <ItemTitle>인증번호</ItemTitle>
                        <TextField 
                            size="small"
                            sx={{width: 100}}
                            inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                        />
                    </ItemStack>
                    <ItemStack direction="row" alignItems='center'>
                        <ItemTitle></ItemTitle>
                        <TextField size="small" sx={{visibility: 'hidden'}}/>
                    </ItemStack>
                    <CustomButton>확인</CustomButton>
                </CustomStack>
                <CustomStack alignItems="center">
                    <BoxTitle>비밀번호 찾기</BoxTitle>
                    <ItemStack direction="row" alignItems='center'>
                        <ItemTitle>아이디</ItemTitle>
                        <TextField 
                            size="small"
                            inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                        />
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
                            inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                        />
                        <Box sx={{fontSize: 14, padding: '0 8px 0 8px'}}>-</Box>
                        <NumberField 
                            size="small" 
                            inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                        />
                        <CheckButton>인증번호</CheckButton>
                    </ItemStack>
                    <ItemStack direction="row" alignItems='center'>
                        <ItemTitle>인증번호</ItemTitle>
                        <TextField 
                            size="small"
                            sx={{width: 100}}
                            inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
                        />
                    </ItemStack>
                    <CustomButton>확인</CustomButton>
                </CustomStack>
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
    display: 'inline-block',
    position: 'relative',
    left: '50%',
    transform: 'translate(-50%, 0)', 
    marginTop: 10,
    paddingBottom: 80,
}));

const CustomStack = styled(Stack)(() => ({
    display: 'inline-block',
    border: '1px solid lightgrey', 
    width: 400,
    padding: 20, 
}));

const BoxTitle = styled(Box)(() => ({
    fontFamily: 'PretendardB', 
    fontSize: 18, 
    textAlign: 'center',
    marginBottom: 10,
}));

const ItemStack = styled(Stack)(() => ({
    padding: '20px 0 0 20px',
}));

const ItemTitle = styled(Box)(() => ({
    width: 60,
    fontSize: 13,
    color: 'grey',
}));

const NumberField = styled(TextField)(() => ({
    width: 60,
}));

const CheckButton = styled(Button)(() => ({
    padding: '4px 10px 4px 10px',
    marginLeft: 15,
    fontFamily: 'PretendardM', 
    fontSize: 12, 
    boxShadow: 'none', 
    color: 'white',
    backgroundColor: '#0094FF', 
    '&:hover': {
        backgroundColor: '#34ABFF',
    },
}));

const CustomButton = styled(Button)(() => ({
    position: 'relative',
    left: '50%',
    transform: 'translate(-50%, 0)', 
    width: 140,
    marginTop: 80,
    padding: 10,
    fontFamily: 'PretendardM', 
    fontSize: 14, 
    textAlign: 'center',
    boxShadow: 'none', 
    color: 'white',
    backgroundColor: '#0094FF', 
    '&:hover': {
        backgroundColor: '#34ABFF',
    },
}));

export default FindPwPage;