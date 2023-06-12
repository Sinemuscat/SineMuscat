import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Stack } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

// Erc_20관리자 계정
const ERC_20_ADMIN = '0xec2C46385e57223Ba0E754eaAE0b57C6a239019c';
// Erc_20 컨트랙트 주소
const ERC_20_CONTRACT = '0xc5c7dC1950dE092715a08658812D94A5E76F44AF';
// ERC_721 관리자 계정
const ERC_721_ADMIN = '0x06D279B975c44Cc3Ff40B44CC1Bf71643192AbB7';
// ERC_721 컨트랙트 주소
const ERC_721_CONTRACT = '0x6462549A4Dbe5C7267d838c9Ac9418b41346916e';


const API_Key = "XBUMCXKUGFRV6636VA96QB2SNP6EZ876DV"

const TinyLineChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <Tooltip 
                    formatter={(value, name, props) => {
                        const { payload } = props;
                        return [`${value} (Date: ${payload.date})`, name];
                    }}
                />
                <Line type="monotone" dataKey="value" stroke="#0094FF" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
}

const FullLineChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 30, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    dataKey="date" 
                    tickFormatter={(str) => {
                        const date = new Date(str);
                        return new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit' }).format(date);
                    }}
                />
                <YAxis />
                <Tooltip 
                    formatter={(value, name, props) => {
                        const { payload } = props;
                        return [`${value} (Date: ${payload.date})`, name];
                    }}
                />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#0094FF" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
}

// const DailyTxWidget = ({ fullHeight = false }) => {
//     const [data, setData] = useState([]);

//     // 컴포넌트가 마운트될 때 API를 호출
//     useEffect(() => {
//         const fetchData = async () => {
//             let page = 1;
//             const dailyTransactionValues = {};

//             while (true) {
//                 try {
//                     const response = await axios.get(`https://api-testnet.polygonscan.com/api?module=account&action=tokentx&contractaddress=${ERC_20_CONTRACT}&address=${ERC_20_ADMIN}&page=${page}&offset=10&sort=asc&apikey=${API_Key}`);

//                     if (!response.data.result || !Array.isArray(response.data.result)) {
//                         console.error('Invalid response data:', response.data);
//                         break;
//                     }

//                     // 더 이상 가져올 데이터가 없을 경우 반복 종료
//                     if (response.data.result.length === 0) {
//                         break;
//                     }

//                     // 타임스탬프를 일자로 변환하고 value를 일별로 합산
//                     response.data.result.forEach(tx => {
//                         const date = new Date(tx.timeStamp * 1000).toISOString().split('T')[0];
//                         if (!dailyTransactionValues[date]) {
//                             dailyTransactionValues[date] = 0;
//                         }
//                         dailyTransactionValues[date] += Number(tx.value);
//                     });

//                     // 다음 페이지로 이동
//                     page++;
//                 } catch (error) {
//                     console.error(`Error fetching data: ${error}`);
//                     break;
//                 }
//             }

//             // Wei를 Ether로 변환하고 결과를 출력
//             const dataForChart = [];
//             for (const date in dailyTransactionValues) {
//                 dataForChart.push({
//                     date,
//                     value: dailyTransactionValues[date] / Math.pow(10, 18),
//                 });
//             }

//             setData(dataForChart);
//         }

//         fetchData();
//     }, []);


    
//     return (
//         <Body>
//             <WidgetTitle>Daily Transactions</WidgetTitle>
//             <Box sx={{ height: fullHeight ? '400px' : '200px', width: '100%' }}>
//                 {fullHeight ? <FullLineChart data={data} /> : <TinyLineChart data={data} />}
//             </Box>
//         </Body>
//     );
// };




const DailyTxWidget = ({ fullHeight = false }) => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const pageLimit = 10; // 요청할 페이지 수
          const offset = 1000; // 한 페이지에 포함된 데이터 개수
          const dailyTransactionValues = {}; // 일별 거래 값 저장 객체
  
          for (let page = 1; page <= pageLimit; page++) {
            const response = await axios.get(`https://api-testnet.polygonscan.com/api?module=account&action=tokentx&contractaddress=${ERC_20_CONTRACT}&address=${ERC_20_ADMIN}&page=${page}&offset=${offset}&sort=asc&apikey=${API_Key}`);
  
            if (!response.data.result || !Array.isArray(response.data.result)) {
              console.error('Invalid response data:', response.data);
              break;
            }
  
            response.data.result.forEach(tx => {
              const date = new Date(tx.timeStamp * 1000).toISOString().split('T')[0];
              if (!dailyTransactionValues[date]) {
                dailyTransactionValues[date] = 0;
              }
              dailyTransactionValues[date] += Number(tx.value) / Math.pow(10, 18);
            });
          }
  
          const dataForChart = Object.entries(dailyTransactionValues).map(([date, value]) => ({
            date,
            value,
          }));
  
          setData(dataForChart);
        } catch (error) {
          console.error(`Error fetching data: ${error}`);
        }
      };
  
      fetchData();
    }, []);
  
  
    return (
      <Body>
        <WidgetTitle>Daily Token Transactions</WidgetTitle>
        <Box sx={{ height: fullHeight ? '400px' : '200px', width: '100%' }}>
          {data.length > 0 ? (
            fullHeight ? <FullLineChart data={data} /> : <TinyLineChart data={data} />
          ) : (
            <div>Loading...</div>
          )}
        </Box>
      </Body>
    );
  };
  

const Body = styled(Stack)(() => ({
    width: '100%',
    backgroundColor: '#FFF',
    padding: '20px 10px',
    borderRadius: '15px',
    boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.1)',
}));

const WidgetTitle = styled(Box)(() => ({
    color: '#C0C0C0',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
}));

export default DailyTxWidget;
