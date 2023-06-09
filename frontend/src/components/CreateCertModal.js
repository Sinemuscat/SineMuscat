import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Modal, Stack } from '@mui/material'
import Close from "@mui/icons-material/CloseRounded";
import Done from '@mui/icons-material/TaskAltRounded';
import Error from '@mui/icons-material/WarningRounded';
import axios from 'axios';
import Web3 from 'web3';
import ipfsClient from 'ipfs-http-client';
import { ethers } from 'ethers';
import abiobj from '../js/ContractABI.js';
import abiobj2 from '../js/ContractABI2.js';
import { create } from 'ipfs-http-client';
import { Buffer as buffer } from 'buffer';

const contractAddress = '0x6462549A4Dbe5C7267d838c9Ac9418b41346916e';
const contractAddress2 = '0xc5c7dC1950dE092715a08658812D94A5E76F44AF';
const anotherAccountPrivateKey = '2e58c63b6ae8ff4deaac3e6506e379b66b209881041e4221ff0d66d35cb63430';

// Initialize web3 and ipfs
const web3 = new Web3(window.ethereum);

//ipfs 연결
var IPFS_URL = 'https://ipfs.io/ipfs/';
var IPFS_API_URL = 'ipfs.infura.io';
const projectId = '2Mmbcqj2D9Shv87NDnrqL5JvmJu';
const projectSecret = 'c35e95c3abeeb977892a991ac5f89fa6';
const auth = 'Basic ' + btoa(projectId + ':' + projectSecret);
console.log('-> ' + auth);

const ipfs = create({
  host: IPFS_API_URL,
  port: '5001',
  protocol: 'https',
  headers: { authorization: auth },
});

function CreateCertModal({ certificateNumber }) {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(true);
    const [contract, setContract] = useState(null);
    const [content, setContent] = useState('');
    const [volunteerDate, setVolunteerDate] = useState('');
    const [submitDate, setSubmitDate] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState(''); // New state variable
    const [point, setPoint] = useState('');
    const [anotherAccount, setAnotherAccount] = useState('0xec2C46385e57223Ba0E754eaAE0b57C6a239019c');

    useEffect(() => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abiobj, provider);
        setContract(contract);
      } else {
        console.log('Please install MetaMask!');
      }
    }, []);
  
    const loadWeb3 = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    };
  
    const sendToken = async () => {
      try {
        if (window.ethereum) {
          await window.ethereum.enable();
          const web3 = new Web3(window.ethereum);
          const contract = new web3.eth.Contract(abiobj2, contractAddress2);
          const amountToTransfer = web3.utils.toWei(point.toString(), 'ether');
    
          const transferFromTransaction = contract.methods
            .transfer(window.ethereum.selectedAddress, amountToTransfer)
            .encodeABI();
    
          const transferFromTransactionOptions = {
            from: anotherAccount,
            to: contractAddress2,
            data: transferFromTransaction,
            gas: await web3.eth.estimateGas({
              from: anotherAccount,
              to: contractAddress2,
              data: transferFromTransaction,
            }),
          };
    
          const signedTransferFromTransaction = await web3.eth.accounts.signTransaction(
            transferFromTransactionOptions,
            anotherAccountPrivateKey
          );
          const transferFromReceipt = await web3.eth.sendSignedTransaction(
            signedTransferFromTransaction.rawTransaction
          );
          console.log(transferFromReceipt);
          
          alert('포인트 발급이 완료되었습니다.'); // Add this line
          // Token 전송이 성공하면 모달을 닫습니다.
          handleClose();
          setError(false);
          
        } else {
          console.log('Please install MetaMask!');
        }
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };
    
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setError(!error);
    }

    const handleClick = async () => {
      try {
        const response = await axios.post('http://localhost:8080/api', {
          number: certificateNumber,
        });
  
        console.log(certificateNumber);
        console.log(response);
        console.log(response.data.number);
  
        const crawledData = response.data.number;
        // 데이터 재구성
        const lines = crawledData.split('\n');
        const content = lines[0].trim();
        const issueDateStr = lines[2].replace('[발급일]', '').trim();
        const activityPeriodStr = lines[4].replace('[활동기간]', '').trim();
        const serviceHoursStr = lines[6].replace('[봉사시간]', '').trim();
  
        const submitDate = new Date(issueDateStr).toLocaleDateString();
        const volunteerDate = new Date(activityPeriodStr).toLocaleDateString();
        const totalMinutes = parseInt(serviceHoursStr.split('시간')[0], 10) * 60; // 분으로 변환
        const hour = Math.floor(totalMinutes / 60);
        const minute = totalMinutes % 60;
        const point = totalMinutes;
  
        // 상태 변수에 저장합니다.
        setContent(content);
        setVolunteerDate(volunteerDate);
        setSubmitDate(submitDate);
        setHour(hour);
        setMinute(minute); // Set the minute state
        setPoint(point);
  
        var metaData = {};
        metaData['content'] = content;
        metaData['volunteerDate'] = volunteerDate;
        metaData['submitDate'] = submitDate;
        metaData['hour'] = hour;
        metaData['point'] = point;
  
        console.log(JSON.stringify(metaData));
  
        const buf = buffer.from(JSON.stringify(metaData));
        const result = await ipfs.add(buf);
        const hash_meta_url = IPFS_URL + result.path;
  
        console.log('hash_meta_url: ' + hash_meta_url);
  
        async function setMint(metaUrl) {
          // 이더리움 객체 존재 확인
          if (window.ethereum) {
            try {
              // 계정 접근 요청
              const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
              });
              // ethers.Contract 인스턴스 생성
              const contract = new ethers.Contract(
                contractAddress,
                abiobj,
                new ethers.providers.Web3Provider(window.ethereum).getSigner(accounts[0])
              );
              // mintNFT 함수 호출
              const transaction = await contract.mintNFT(metaUrl);
  
              console.log('Transaction: ', transaction);
            } catch (error) {
              console.error(error);
            }
          } else {
            console.log('Please install MetaMask!');
          }
        }

        setMint(hash_meta_url).then(() => {
          setOpen(true); // 성공적으로 완료되었을 때만 모달을 열도록 설정
          setError(false); // 성공적으로 완료되었을 때 오류를 false로 설정
      }).catch((error) => {
          console.error(`Error in setMint: ${error}`);
          setError(true); // setMint에 문제가 있을 경우 오류를 true로 설정
      });



      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    return (
        <>
            <CreateButton onClick={handleClick}>발급하기</CreateButton>
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
                                    <SubContent>{certificateNumber}</SubContent>
                                </Stack>
                                <Stack direction="row" alignItems='center'>
                                    <SubTitle>봉사명</SubTitle>
                                    <SubContent>{content}</SubContent>
                                </Stack>
                                <Stack direction="row" alignItems='center'>
                                    <SubTitle>발급일</SubTitle>
                                    <SubContent>{submitDate} GMT+0900 (대한민국 표준시)</SubContent>
                                </Stack>
                                <Stack direction="row" alignItems='center'>
                                    <SubTitle sx={{lineHeight: 4}}>상세 내역</SubTitle>
                                    <Stack spacing={0.5}>
                                        <SubContent>[ VMS ] 00100000-03012-123</SubContent>
                                        <SubContent>봉사기간 : {volunteerDate}</SubContent>
                                        <SubContent>봉사시간 : {hour} 시간</SubContent>
                                    </Stack>
                                </Stack>
                                <Stack direction="row" alignItems='center'>
                                    <SubTitle>적립 포인트</SubTitle>
                                    <SubContent>
                                        <Box sx={{display: 'inline-block', color: '#0094FF', fontFamily: 'PretendardB', paddingRight: 1}}>{point} Points</Box>
                                    </SubContent>
                                    <CreateButton onClick={sendToken}>포인트 발행</CreateButton>
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