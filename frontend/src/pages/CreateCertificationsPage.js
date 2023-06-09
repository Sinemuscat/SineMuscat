import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Stack, Button, TextField, IconButton } from '@mui/material';
import Header from '../components/Header';
import logo1365 from '../images/1365_logo.jpg';
import logoVMS from '../images/vms_logo.png';
import CreateCertModal from '../components/CreateCertModal';
import Refresh from '@mui/icons-material/RefreshRounded';

function CreateCertificationsPage() {
    // const [option, setOption] = useState(false);

    // const onClickButton1 = () => {
    //     setOption(true);
    // };

    // const onClickButton2 = () => {
    //     setOption(false);
    // };

    const [certificateNumber, setCertificateNumber] = useState("");
    const [responseNumber, setResponseNumber] = useState(null);
  
    const handleChange = (event) => {
      setCertificateNumber(event.target.value);
    };

//     return (
//         <>
//             <Header />
//             <Title>인증서 신규 발급</Title>
//             <Body spacing={5} alignItems="center">
//                 <Box sx={{lineHeight: 1.5, fontSize: '15px'}}>
//                     <li>발급인증서 상단에 표기된 인증서 발급번호를 입력하시면 인증서 발급된 내역을 확인하실 수 있습니다.</li>
//                     <li>인증서는 발급 후 3개월간 유효하므로 3개월 이전에 발급된 인증서의 발급번호는 조회 할 수 없습니다.</li>
//                     <li>출력되는 내용은 전산 DB상의 내용을 확인하기 위한 것으로 법적인 효력을 가지지는 않습니다.</li>
//                 </Box>
//                 <Box sx={{border: '1px solid lightgrey', width: 300, textAlign: 'center', lineHeight: 5}}>예시 그림</Box>
//                 <InputStack spacing={3}>
//                     {/* <Stack direction="row" spacing={2}>
//                         <OptionButton onClick={onClickButton1} sx={{border: option ? '2px solid purple' : '2px solid lightgrey', opacity: option ? '100%' : '60%'}}>
//                             <img src={logoVMS} width={120} alt="img1"/>
//                         </OptionButton>
//                         <OptionButton onClick={onClickButton2} sx={{border: option ? '2px solid lightgrey' : '2px solid orange', opacity: option ? '60%' : '100%'}}>
//                             <img src={logo1365} width={120} alt="img2"/>
//                         </OptionButton>
//                     </Stack> */}
//                     <Stack direction="row" spacing={1} alignItems="center">
//                         <Box sx={{paddingRight: 1, fontSize: '14px'}}>인증서 발급번호</Box>
//                         {
//                             option ? 
//                             <>
//                                 <TextField 
//                                     size="small" 
//                                     sx={{width: 150, backgroundColor: 'white', borderRadius: 1}}
//                                     inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
//                                 />
//                                 <Box sx={{fontSize: '14px'}}>-</Box>
//                                 <TextField 
//                                     size="small" 
//                                     sx={{width: 100, backgroundColor: 'white', borderRadius: 1}}
//                                     inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL', }}}
//                                 />
//                                 <Box sx={{fontSize: '14px'}}>-</Box>
//                                 <TextField 
//                                     size="small" 
//                                     sx={{width: 150, backgroundColor: 'white', borderRadius: 1}}
//                                     inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
//                                 />
//                                 <IconButton><Refresh sx={{color: 'grey'}} /></IconButton>
//                             </>
//                             :
//                             <>
//                                 <TextField 
//                                     size="small" 
//                                     sx={{width: 200, backgroundColor: 'white', borderRadius: 1}}
//                                     inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL'}}}
//                                 />
//                                 <Box sx={{fontSize: '14px'}}>_</Box>
//                                 <TextField 
//                                     size="small" 
//                                     sx={{width: 150, backgroundColor: 'white', borderRadius: 1}}
//                                     inputProps={{style: {fontSize: 14, fontFamily: 'PretendardL', }}}
//                                 />
//                                 <IconButton><Refresh sx={{color: 'grey'}} /></IconButton>
//                             </>
//                         }
//                     </Stack>
//                 </InputStack>
//                 <CreateCertModal />
//             </Body>
//         </>
//     );
// }

// const Title = styled(Box)(() => ({
//     padding: '50px 0 30px 0', 
//     textAlign: 'center', 
//     fontFamily: 'PretendardB', 
//     fontSize: 22,
// }));

// const Body = styled(Stack)(() => ({
//     // border: '1px solid pink',
//     position: 'relative',
//     left: '50%',
//     transform: 'translate(-50%, 0)', 
//     width: 800,
//     paddingTop: 15,
//     paddingBottom: 30,
// }));

// const InputStack = styled(Stack)(() => ({
//     backgroundColor: '#F0F0F0',
//     width: '650px',
//     padding: '25px 40px 25px 40px',
// }));

// const OptionButton = styled(Button)(() => ({
//     width: 160,
//     height: 50,
//     textAlign: 'center', 
//     fontFamily: 'PretendardB', 
//     fontSize: 22,
//     backgroundColor: 'white',
//     '&:hover': {
//         backgroundColor: 'white',
//         opacity: '100%',
//     },
// }));

// export default CreateCertificationsPage;

return (
    <>
      <Header />
      <Title>인증서 신규 발급</Title>
      {" "}
      <Body spacing={5} alignItems="center">
        <Box sx={{ lineHeight: 1.5, fontSize: "15px" }}>
          <li>발급인증서 상단에 표기된 인증서 발급번호를 입력하시면 인증서 발급된 내역을 확인하실 수 있습니다.</li>
          <li>인증서는 발급 후 3개월간 유효하므로 3개월 이전에 발급된 인증서의 발급번호는 조회 할 수 없습니다.</li>
          <li>출력되는 내용은 전산 DB상의 내용을 확인하기 위한 것으로 법적인 효력을 가지지는 않습니다.</li>
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box sx={{ paddingRight: 1, fontSize: "14px" }}>인증서 발급번호</Box>
          <TextField
            size="small"
            sx={{
              width: 400,
              backgroundColor: "white",
              borderRadius: 1,
            }}
            inputProps={{ style: { fontSize: 14, fontFamily: "PretendardL" } }}
            value={certificateNumber}
            onChange={handleChange}
          />
          <IconButton>
            <Refresh sx={{ color: "grey" }} />
          </IconButton>
        </Stack>
        <CreateCertModal
          certificateNumber={certificateNumber}
        />
      </Body>
    </>
  );
};

const Title = styled(Box)(() => ({
  padding: "50px 0 30px 0",
  textAlign: "center",
  fontFamily: "PretendardB",
  fontSize: 22,
}));

const Body = styled(Stack)(() => ({
  // border: '1px solid pink',
  position: "relative",
  left: "50%",
  transform: "translate(-50%, 0)",
  width: 800,
  paddingTop: 15,
  paddingBottom: 30,
}));

const InputStack = styled(Stack)(() => ({
  backgroundColor: "#F0F0F0",
  width: "650px",
  padding: "25px 40px 25px 40px",
}));

const OptionButton = styled(Button)(() => ({
  width: 160,
  height: 50,
  textAlign: "center",
  fontFamily: "PretendardB",
  fontSize: 22,
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: "white",
    opacity: "100%",
  },
}));

export default CreateCertificationsPage;
