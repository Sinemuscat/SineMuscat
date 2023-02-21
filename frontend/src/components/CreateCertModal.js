import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Modal, Stack } from '@mui/material'
import Close from "@mui/icons-material/CloseRounded";
import Done from '@mui/icons-material/TaskAltRounded';
import Error from '@mui/icons-material/WarningRounded';

function CreateCertModal() {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <CreateButton onClick={handleOpen}>발급하기</CreateButton>
            <Modal open={open} onClose={handleClose}>
                <Body alignItems='center' spacing={2}>
                    <CloseButton onClick={handleClose} title="닫기" />
                    {
                        error ?
                        <>
                            <Title>인증서 발급 실패</Title>
                            <Error sx={{fontSize: 100, color: 'crimson', padding: '20px 0 20px 0'}} />
                            <Content sx={{lineHeight: 2}}>
                                <li>정확한 인증서 발급번호를 입력했는지 확인해주세요.</li>
                                <li>이미 등록된 인증서는 중복 등록이 불가능합니다.</li>
                            </Content>
                        </> :
                        <>
                            <Title>인증서 발급 완료</Title>
                            <Done sx={{fontSize: 100, color: 'green', padding: '20px 0 20px 0'}} />
                            <Content spacing={1}>
                                <Stack direction="row" alignItems='center'>
                                    <SubTitle>인증서 ID</SubTitle>
                                    <SubContent>ABCD1235</SubContent>
                                </Stack>
                                <Stack direction="row" alignItems='center'>
                                    <SubTitle>이름</SubTitle>
                                    <SubContent>원규진</SubContent>
                                </Stack>
                                <Stack direction="row" alignItems='center'>
                                    <SubTitle>발급일</SubTitle>
                                    <SubContent>2023년 2월 1일 17:15:11 GMT+0900 (대한민국 표준시)</SubContent>
                                </Stack>
                                <Stack direction="row" alignItems='center'>
                                    <SubTitle sx={{lineHeight: 4}}>상세 내역</SubTitle>
                                    <Stack spacing={0.5}>
                                        <SubContent>[ VMS ] 00100000-03012-123</SubContent>
                                        <SubContent>봉사기간 : 2018-01-25 ~ 2018-01-25</SubContent>
                                        <SubContent>봉사시간 : 2 시간</SubContent>
                                    </Stack>
                                </Stack>
                                <Stack direction="row" alignItems='center'>
                                    <SubTitle>적립 포인트</SubTitle>
                                    <SubContent>
                                        <Box sx={{display: 'inline-block', color: '#0094FF', fontFamily: 'PretendardB', paddingRight: 1}}>2 Points</Box>
                                        (누적 포인트 : 27 Points)
                                    </SubContent>
                                </Stack>
                            </Content>
                        </>
                    }
                </Body>
            </Modal>
        </>
    );
}

const Title = styled(Box)(() => ({
    paddingTop: '20px',
    // textAlign: 'center',
    fontFamily: 'PretendardB', 
    fontSize: 18,
}));

const Body = styled(Stack)(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '700px',
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

const Content = styled(Stack)(() => ({
    backgroundColor: '#F0F0F0',
    width: '600px',
    padding: 20,
    borderRadius: 5,
}));

const SubTitle = styled(Box)(() => ({
    width: 70,
    border: '1px solid lightgrey',
    color: 'grey',
    backgroundColor: 'white',
    textAlign: 'center',
    padding: 10,
    marginRight: 20,
    fontSize: 14,
    borderRadius: 5,
}));

const SubContent = styled(Box)(() => ({
    fontSize: 16,
}));

const CreateButton = styled(Button)(() => ({
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

export default CreateCertModal;