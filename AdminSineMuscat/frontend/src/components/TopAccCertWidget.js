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
  
  function createData(no, address, name, balance, txnCnt) {
    return { no, address, name, balance, txnCnt };
  }
  
  const rows = [
    createData(0, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 21072466.19432501 , 3287263.0),
    createData(1, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 9596961, 9596961.0),
    createData(2, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 301340, 301340.0),
    createData(3, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 9833520, 9833520.0),
    createData(4, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 9984670, 9984670.0),
    createData(5, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 7692024, 7692024.0),
    createData(6, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 357578, 357578.0),
    createData(7, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 70273, 70273.0),
    createData(8, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 1972550, 1972550.0),
    createData(9, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 377973, 377973.0),
    createData(10, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 640679, 640679.0),
    createData(11, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 242495, 242495.0),
    createData(12, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 17098246, 17098246.0),
    createData(13, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 923768, 923768.0),
    createData(14, '0x00000000219ab540356cBB839Cbe05303d7705Fa', '원규진', 8515767, 8515767.0),
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

const TopAccCertWidget = ({fullHeight=false}) => {
    return (
        <Body>
            <WidgetTitle>Top Accounts - Certifications</WidgetTitle>
            <Box sx={{width: '100%'}}>
                {
                    fullHeight ?
                    <UserTable /> :
                    <Box></Box>
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