import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Button } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useDispatch, useSelector } from 'react-redux';
import { getUserWatchlist } from '@/State/Watchlist/Action';
import { existInWatchlist } from '@/utils/existInWatchlist';


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

function createData(name, SYMBOL, VOLUME, MARKETCAP, change_24H, PRICE, REMOVE) {
  return { name, SYMBOL, VOLUME, MARKETCAP, change_24H, PRICE, REMOVE };
}



// const rows = [
//   createData("Bitcoin", "BTC", 12000, 700000000, -2.5, 45000,
//     <Button  onClick={()=> handleRemoveToWatchlist(item.id)} >
//       <BookmarkIcon />
//     </Button>
//   ),
//   createData("Ethereum", "ETH", 8000, 300000000, 1.2, 2300,  <Button>
//       <BookmarkIcon />
//     </Button>),  
//   createData("Solana", "SOL", 5000, 80000000, 3.5, 98, <Button>
//       <BookmarkIcon />
//     </Button>),
//       createData("Bitcoin", "BTC", 12000, 700000000, -2.5, 45000,
//     <Button>
//       <BookmarkIcon />
//     </Button>
//   ),
//   createData("Ethereum", "ETH", 8000, 300000000, 1.2, 2300,  <Button>
//       <BookmarkIcon />
//     </Button>),  
//   createData("Solana", "SOL", 5000, 80000000, 3.5, 98, <Button>
//       <BookmarkIcon />
//     </Button>),
//       createData("Bitcoin", "BTC", 12000, 700000000, -2.5, 45000,
//     <Button>
//       <BookmarkIcon />
//     </Button>
//   ),
//   createData("Ethereum", "ETH", 8000, 300000000, 1.2, 2300,  <Button>
//     <BookmarkIcon />
//     </Button>),  
//   createData("Solana", "SOL", 5000, 80000000, 3.5, 98, <Button>
//       <BookmarkIcon />
//     </Button>),
 
  
// ];



export default function WatchList() {

   const {watchlist} = useSelector(store => store);

   const dispatch = useDispatch();

     const handleRemoveToWatchlist = (value) => {

    dispatch( addItemToWatchlist ({coinId:value, jwt:localStorage.getItem("jwt")}));
    console.log(value);
    
   useEffect ( () => {

    dispatch ( getUserWatchlist ( localStorage.getItem("jwt")) )
   }, []);

  //  const handleAddToWatchlist = (item) => {
  //        dispatch( addItemToWatchlist ({coinId:item?.id, jwt:localStorage.getItem("jwt")}));
  //      }



}

  return (
      

      <div className="flex justify-center items-center">

        <div className="pt-10 w-full lg:w-[75%]">

           
      <h1 className='font-bold text-3xl pb-5'>Watchlist</h1>
       <TableContainer component={Paper} >
      <Table sx={{ minWidth: 700 }} aria-label="customized table" className='border'>

        <TableHead  >
          <TableRow >
            <StyledTableCell >Coin</StyledTableCell>
            <StyledTableCell align="right">Symbol</StyledTableCell>
            <StyledTableCell align="right">Volume</StyledTableCell>
            <StyledTableCell align="right">Market Cap</StyledTableCell>
            <StyledTableCell align="right">24H</StyledTableCell>            
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right" className=' text-right text-red-600'>Remove</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody >
          {watchlist.items.map((row) => (
            <StyledTableRow key={row.name}>
              
              {/* First column: Avatar + Name */}
              <StyledTableCell component="th" scope="row">
                <div className="flex items-center gap-2">
                  <Avatar sx={{ width: 32, height: 32 }}>
                    <img
                      src= {row.image}
                      alt="coin"
                      className="w-full h-full"
                    />
                  </Avatar>
                  <span>{row.name}</span>
                </div>
              </StyledTableCell>

              {/* Shortened using .map for other fields */}
              {[
                row.symbol.toUpperCase(),
                row.total_volume,
                row.market_cap,
                `${row.market_cap_change_24h}%`,
                row.current_price,               
              (<Button   
                
              onClick={()=> handleRemoveToWatchlist(item.id)} >
                
                <BookmarkIcon 
                sx={{  color: "white"}}
                 
                />
              </Button>)
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
