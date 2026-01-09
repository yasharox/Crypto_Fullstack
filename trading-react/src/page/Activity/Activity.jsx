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
import { getAllOrdersForUser } from '@/State/Order/Action';
import { calculateProfit } from '@/utils/CalculateProfit';


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

function createData(name, SYMBOL, VOLUME, MARKETCAP, change_24H, PRICE, VALUE) {
  return { name, SYMBOL, VOLUME, MARKETCAP, change_24H, PRICE,VALUE};
}

const rows = [
  createData("Bitcoin", "BTC", 12000, 700000000, -2.5, 45000,345),
  createData("Ethereum", "ETH", 8000, 300000000, 1.2, 2300,345),
  createData("Solana", "SOL", 5000, 80000000, 3.5, 98,345),
   createData("Bitcoin", "BTC", 12000, 700000000, -2.5, 45000,345),
  createData("Ethereum", "ETH", 8000, 300000000, 1.2, 2300,345),
  createData("Solana", "SOL", 5000, 80000000, 3.5, 98,345),
   createData("Bitcoin", "BTC", 12000, 700000000, -2.5, 45000,345),
  createData("Ethereum", "ETH", 8000, 300000000, 1.2, 2300,345),
  createData("Solana", "SOL", 5000, 80000000, 3.5, 98,345),
 
];

export default function Activity() {

  const dispatch = useDispatch ();

  const {order} = useSelector(store =>store);

  useEffect(()=> {

    dispatch(getAllOrdersForUser ( { jwt: localStorage.getItem('jwt')}))
  }, [])
  return (
       <div className=' flex justify-center items-center'>

     <div className="pt-10 w-full lg:w-[75%] " >

       <h1 className='font-bold text-4xl pb-5'>Activity</h1>
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">

        <TableHead>
          <TableRow>
            <StyledTableCell align="">Date& Time</StyledTableCell>
            <StyledTableCell align="">Trading Pair</StyledTableCell>
            <StyledTableCell align="right">Buy Price</StyledTableCell>
            <StyledTableCell align="right">Sell Price</StyledTableCell>
            <StyledTableCell align="right">Order Type</StyledTableCell>            
            <StyledTableCell align="right">Profit/Loss</StyledTableCell>
            <StyledTableCell align="right" >Value</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {order.orders.map((row) => (
            <StyledTableRow key={row.name}>
              
              {/* first column: Avatar + Name */}
              <StyledTableCell component="th" scope="row">
                <p> {row.timestamp}</p>
                {/* <p className='text-gray-400'>12:39:32</p>               */}
              </StyledTableCell>
              
              {/* second column: Avatar + Name */}
              <StyledTableCell align="left"  component="th" scope="row"  >
                <div className="flex  justify-start items-right gap-2">
                  <Avatar sx={{ width: 32, height: 32 }}>
                    <img
                      src={row.orderItem.coin.image}
                      alt="coin"
                      className="w-full h-full"
                    />
                  </Avatar>
                  <span>{row.orderItem.coin.name}</span>
                </div>
              </StyledTableCell>

              {/* Shortened using .map for other fields */}
              {[
                // row.SYMBOL,
                
                row.orderItem.buyPrice,
                row.orderItem.sellPrice,
                row.orderType,
                // calculateProfit(orderItem),,
                row.orderItem.coin.price_change_24h,
                row.price,
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
