import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Button, Modal, Stack, Checkbox } from '@mui/material'
import Close from "@mui/icons-material/CloseRounded";
import Minus from '@mui/icons-material/RemoveRounded';
import Arrow from '@mui/icons-material/KeyboardDoubleArrowRightRounded';

function ConfirmPurchaseModal() {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(true);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setError(!error);
    }

    const navigate = useNavigate();

    const onClickPurchase = () => {
        navigate('/puchaseresult');
    };

    return (
        <>
            <PurchaseButton onClick={handleOpen}>구매하기</PurchaseButton>
            <Modal open={open} onClose={handleClose}>
                <Body spacing={2}>
                    <CloseButton onClick={handleClose} title="닫기" />
                    <Title>구매 하시겠습니까?</Title>
                    <Stack spacing={1}>
                        <SubTitle>상품 정보</SubTitle>
                        <Stack direction="row">
                            <ProductImg />
                            <Stack spacing={0.5} ml={2}>
                                <ProductName>츄파춥스</ProductName>
                                <ProductCount>수량 : 1개</ProductCount>
                            </Stack>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center" py={1}>
                            <PointChange spacing={0.5}>
                                <SubTitle sx={{textAlign: 'center'}}>보유 Points</SubTitle>
                                <SubContent sx={{color: 'grey'}}>2500 Points</SubContent>
                            </PointChange>
                            <Minus />
                            <PointChange spacing={0.5}>
                                <SubTitle sx={{textAlign: 'center'}}>주문 Points</SubTitle>
                                <SubContent sx={{color: '#0094FF', fontFamily: "PretendardM"}}>250 Points</SubContent>
                            </PointChange>
                            <Arrow />
                            <PointChange spacing={0.5}>
                                <SubTitle sx={{textAlign: 'center'}}>잔여 Points</SubTitle>
                                <SubContent sx={{color: 'grey'}}>2250 Points</SubContent>
                            </PointChange>
                        </Stack>
                        <Stack py={1} spacing={0.5}>
                            <Description>상품 쿠폰이 다음 연락처로 발송됩니다.</Description>
                            <SubTitle>010-2581-7018</SubTitle>
                        </Stack>
                        <Description sx={{textAlign: 'center'}} pt={1}>
                            <Checkbox size="small" sx={{padding: '5px'}} />
                            회원 본인은 구매 조건, 주문 내용 확인 및 결제에 동의합니다.
                        </Description>
                    </Stack>
                    <ConfirmButton onClick={onClickPurchase}>250 Points 결제하기</ConfirmButton>
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