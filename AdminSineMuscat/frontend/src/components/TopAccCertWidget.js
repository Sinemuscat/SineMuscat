import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button } from '@mui/material';

const columns = [
    { id: 'no', label: '#', minWidth: 5 },
    { id: 'address', label: 'Address', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 50 },
    { id: 'balance', label: 'Balance', minWidth: 120, format: (value) => value + ' ETH' },
    { id: 'txnCnt', label: 'Txn Count', minWidth: 80, format: (value) => value.toFixed(2) },
];

const columns2 = [
  { id: 'no', label: '#', minWidth: 5 },
  // { id: 'address', label: 'Address', minWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 50 },
  { id: 'address', label: 'Address', minWidth: 50 },
  { id: 'cnt', label: 'Count', minWidth: 20, format: (value) => value + ' 개' },
  { id: 'balance', label: 'Balance', minWidth: 40, format: (value) => value + ' ETH' },
];


function createData(no, address, name, cnt, balance, txnCnt) {
    return { no, address, name, cnt, balance, txnCnt };
}

const rows = [
    createData(0, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 10, 2106 , 3263.0),
    createData(1, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 10, 9591, 9591.0),
    createData(2, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 10, 301, 30130),
    createData(3, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 10, 9830, 9830.0),
    createData(4, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 10, 9980, 9980.0),
    createData(5, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 10, 7694, 7694.0),
    createData(6, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 10, 357, 35750),
    createData(7, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 10, 702, 7027),
    createData(8, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 10, 1970, 1970.0),
    createData(9, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 10, 377, 37790),
    createData(10, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 10, 649, 640.0),
    createData(11, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 10, 245, 242.0),
    createData(12, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 10, 17246, 18246.0),
    createData(13, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 10, 928, 923.0),
    createData(14, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 10, 8567, 8567.0),
];

const UserTable = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const navigate = useNavigate();

    const onClickAddress = (address) => {
        navigate('/userdetail', {state: address});
    };

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
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : column.id === 'address'
                                  ? <Button onClick={() => onClickAddress(value)}>{value}</Button>
                                  : value
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
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}

const UserTableDense = () => {
  return (
      <>
          <TableContainer>
            <Table>
              <TableBody>
                {rows
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns2.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                              {column.id === 'address'
                                ? column.format && typeof value === 'number'
                                ? column.format(value)
                                : value.substring(0, 10) + '...'
                                : value
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
      </>
  );
};

const TopAccCertWidget = ({fullHeight=false}) => {
    return (
        <Body>
            <WidgetTitle>Top Accounts - Certifications</WidgetTitle>
            <Box sx={{width: '100%'}}>
                {
                    fullHeight ?
                    <UserTable /> :
                    <Box sx={{height: '300px', overflowY: 'scroll', overflowX: 'hidden'}}>
                      <UserTableDense />
                    </Box>
                }
            </Box>
        </Body>
    );
};

const Body = styled(Stack)(() => ({
    // height: '260px',
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

export default TopAccCertWidget;