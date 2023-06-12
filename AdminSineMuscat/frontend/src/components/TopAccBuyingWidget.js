import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button } from '@mui/material';
import { Link } from 'react-router-dom'; 

// Erc_20관리자 계정
const ERC_20_ADMIN = '0xec2C46385e57223Ba0E754eaAE0b57C6a239019c';
// Erc_20 컨트랙트 주소
const ERC_20_CONTRACT = '0xc5c7dC1950dE092715a08658812D94A5E76F44AF';
// ERC_721 관리자 계정
const ERC_721_ADMIN = '0x06D279B975c44Cc3Ff40B44CC1Bf71643192AbB7';
// ERC_721 컨트랙트 주소
const ERC_721_CONTRACT = '0x6462549A4Dbe5C7267d838c9Ac9418b41346916e';





const UserTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [topCertificate, setTopCertificate] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const navigate = useNavigate();

  const onClickAddress = (address) => {
    navigate('/userdetail', { state: address });
  };

  const shortenAddress = (address) => {
    const start = address.slice(0, 6);
    const end = address.slice(-4);
    return `${start}...${end}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(
          `https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=${ERC_20_CONTRACT}&startblock=0&endblock=99999999&page=1&offset=1000&sort=asc&apikey=XBUMCXKUGFRV6636VA96QB2SNP6EZ876DV`
        );
  
        const data1 = await response1.json();
        console.log(data1);
  
        // 필터링된 데이터를 담을 배열 선언
        const filteredData = [];
  
        // 각각의 from 주소 개수 계산
        data1.result.forEach((transaction) => {
          const { from } = transaction;
          if (from.toLowerCase() !== ERC_20_ADMIN.toLowerCase()) {
            // ERC_20_ADMIN 주소가 아닌 경우에만 배열에 추가
            filteredData.push(from);
          }
        });
  
        // 주소와 개수를 배열로 변환하여 내림차순 정렬
        const top_certificate = Object.entries(
          filteredData.reduce((map, address) => {
            map[address] = (map[address] || 0) + 1;
            return map;
          }, {})
        ).sort((a, b) => b[1] - a[1]);
  
        setTopCertificate(top_certificate);
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
      }
    };
  
    fetchData();
  }, []);
  

  const fetchTokenBalance = async (address) => {
    const apiURL = `https://api-testnet.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=${ERC_20_CONTRACT}&address=${address}&tag=latest&apikey=XBUMCXKUGFRV6636VA96QB2SNP6EZ876DV`;

    try {
      const response = await fetch(apiURL);
      const data = await response.json();

      if (data.status === '1') {
        const balance = parseInt(data.result) / 10 ** 18; // 10^18로 나누어 실제 잔액 얻기
        console.log(`Account: ${address}`);
        console.log(`Token Balance: ${balance}`);
        return balance;
      } else {
        console.log(`Failed to fetch token balance for account: ${address}`);
        return null;
      }
    } catch (error) {
      console.log(`Error fetching token balance for account: ${address}`);
      console.error(error);
      return null;
    }
  };

  const columns = [
    { id: 'no', label: '#', minWidth: 5 },
    { id: 'address', label: 'Address', minWidth: 100 },
    // { id: 'name', label: 'Name', minWidth: 50 },
    { id: 'txnCnt', label: 'Txn Count', minWidth: 80, format: (value) => value },
  ];

  function createData(no, address, name, balance, txnCnt) {
    return { no, address, name, balance, txnCnt };
  }

  const StyledLink = styled('a')({
    textDecoration: 'none',
  });

  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {topCertificate
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const [address, count] = row;
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = column.id === 'address' ? address : column.id === 'txnCnt' ? count : row[column.id];
                      return (
                        <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                          {column.id === 'address' ? 
                            <StyledLink href={`https://mumbai.polygonscan.com/address/${value}`} target="_blank" rel="noreferrer">{value}</StyledLink> : // 여기를 수정합니다.
                            column.format && typeof value === 'number' ? column.format(value) : value
                          }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 25, 100]}
        component="div"
        count={topCertificate.length} // rows 대신 topCertificate의 길이로 수정
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

const TopAccBuyingWidget = ({ fullHeight = false }) => {
  return (
    <Body>
      <WidgetTitle>Top Accounts - Buying Prodoucts</WidgetTitle>
      <Box sx={{ width: '100%' }}>
        {fullHeight ? <UserTable /> : <Box></Box>}
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

export default TopAccBuyingWidget;
