import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAssets } from '@/State/Asset/Action';
import { store } from '@/State/Store';


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

function createData(name, SYMBOL, VOLUME, MARKETCAP, change_24H, PRICE) {
  return { name, SYMBOL, VOLUME, MARKETCAP, change_24H, PRICE };
}

const rows = [
  createData("Bitcoin", "BTC", 12000, 700000000, -2.5, 45000),
  createData("Ethereum", "ETH", 8000, 300000000, 1.2, 2300),
  createData("Solana", "SOL", 5000, 80000000, 3.5, 98),
  createData("Bitcoin", "BTC", 12000, 700000000, -2.5, 45000),
  createData("Ethereum", "ETH", 8000, 300000000, 1.2, 2300),
  createData("Solana", "SOL", 5000, 80000000, 3.5, 98),
  createData("Bitcoin", "BTC", 12000, 700000000, -2.5, 45000),
  createData("Ethereum", "ETH", 8000, 300000000, 1.2, 2300),
  createData("Solana", "SOL", 5000, 80000000, 3.5, 98),
  
];

export default function Portfolio() {

  const dispatch = useDispatch();
  const {asset} = useSelector( store =>store);

  useEffect ( () => {

    dispatch( getUserAssets ( localStorage.getItem("jwt")));
  }, [1])
  return (
    <div className="flex justify-center items-center">

        <div className="pt-10 w-full lg:w-[75%] ">

      
      <h1 className='font-bold text-3xl pb-5'>Portfolio</h1>
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">

        <TableHead>
          <TableRow>
            <StyledTableCell align="">Assets</StyledTableCell>
          <StyledTableCell align="right">Symbol</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Market Cap</StyledTableCell>
            <StyledTableCell align="right">Price Change 24H %</StyledTableCell>            
            <StyledTableCell align="right">Volume</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {asset.userAssets.map((row) => (
            <StyledTableRow key={row.name}>
              
              {/* First column: Avatar + Name */}
              <StyledTableCell component="th" scope="row">
                <div className="flex items-center gap-2">
                  <Avatar sx={{ width: 32, height: 32 }}>
                    <img
                      
                      src={row.coin.image}
                      alt="coin"
                      className="w-full h-full"
                    />
                  </Avatar>
                  <span>{row.coin.name}</span>
                </div>
              </StyledTableCell>

              {/* Shortened using .map for other fields */}
              {[
                row.coin.symbol.toUpperCase (),
                row.quantity,
                row.coin.market_cap,
                `${row.coin.price_change_percentage_24h}%`,
                row.coin.total_volume
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
    </div>
        </div>

    
   
  )
}
