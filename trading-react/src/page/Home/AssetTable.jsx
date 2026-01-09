import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: "#1f2937",
    color: "white",
    cursor: "pointer",
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



const AssetTable = ({coin, category}) => {

  const navigate = useNavigate();

   

  return (

    <Box
      sx={{
        height: {
          // xs: "h-[65vh]",   // mobile
          // md: category === "all" ? "63vh" : "80vh", // tablet
          lg: category === "all" ? "h-[77vh]" : "82vh", // desktop
        },
        overflowY: "auto",
        borderRadius: 2,
      }}
>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">

        <TableHead>
          <TableRow>
            <StyledTableCell>Coin</StyledTableCell>
            <StyledTableCell align="right">SYMBOL</StyledTableCell>
            <StyledTableCell align="right">VOLUME</StyledTableCell>
            <StyledTableCell align="right">MARKETCAP</StyledTableCell>
            <StyledTableCell align="right">24H change %</StyledTableCell>
            <StyledTableCell align="right">PRICE</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {coin.map((row) => (
            <StyledTableRow key={row.id}>
              
              {/* First column: Avatar + Name */}
              <StyledTableCell  onClick={()=> navigate ( `/market/${row.id}`)} component="th" scope="row">
                <div className="flex items-center gap-2">
                  <Avatar sx={{ width: 32, height: 32 }}>
                    <img
                      src={row.image}
                      alt={row.name}
                      className="w-full h-full"
                    />
                  </Avatar>
                  <span>{row.name}</span>
                </div>
              </StyledTableCell>

              {/* Shortened using .map for other fields */}
              {[
                `${row.symbol.toUpperCase()}`,
                `${row.total_volume}`,
                `${row.market_cap}`,
                `${row.price_change_percentage_24h}%`,
                `${row.current_price
}`
              ].map((value, idx) => (
                <StyledTableCell key={idx} align="right">
                  {value}
                </StyledTableCell>
              ))}

            </StyledTableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>

    </Box>
  );
};

export default AssetTable;
