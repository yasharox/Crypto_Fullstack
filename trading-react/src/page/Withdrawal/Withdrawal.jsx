import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getWithdrawalHistory } from '@/State/Withdrawal/Action';

// -------------------- Styled Components --------------------

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0f172a",
    color: "#fff",
    fontSize: 16
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "white"
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#1e293b",
  '&:nth-of-type(odd)': {
    backgroundColor: "#0f172a",
  },
  '&:hover': {
    backgroundColor: "#334155",
    cursor: "pointer"
  }
}));

// -------------------- Data --------------------

// function createData(date, method, amount, status) {
//   return { date, method, amount, status };
// }

// const rows = [
//   createData("June 2, 2025 at 11:30", "Bank", "$69249", 345),
//   createData("June 2, 2025 at 11:30", "Bank", "$69249", 345),
//   createData("June 2, 2025 at 11:30", "Bank", "$69249", 345),
//   createData("June 2, 2025 at 11:30", "Bank", "$69249", 345),
//   createData("June 2, 2025 at 11:30", "Bank", "$69249", 345),
//   createData("June 2, 2025 at 11:30", "Bank", "$69249", 345),
//   createData("June 2, 2025 at 11:30", "Bank", "$69249", 345),
//   createData("June 2, 2025 at 11:30", "Bank", "$69249", 345),
//   createData("June 2, 2025 at 11:30", "Bank", "$69249", 345)
  
// ];

// -------------------- Component --------------------

export default function Withdrawal() {

  const dispatch = useDispatch();
    const {wallet,withdrawal} = useSelector(store => store);

    useEffect(()=>{

      dispatch( getWithdrawalHistory( localStorage.getItem("jwt")))
    },[])
  return (

    

    <div className="lg:px-120 pt-10">
      <h1 className="font-bold text-4xl pb-5 text-white">Withdrawal</h1>

      <TableContainer component={Paper} sx={{ backgroundColor: "#0f172a" }}>
        <Table sx={{ minWidth: 700 }}>

          {/* Header */}
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="right">Method</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
            </TableRow>
          </TableHead>

          {/* Body */}
          <TableBody>
            {withdrawal.history.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{row.date}</StyledTableCell>
                <StyledTableCell align="right">Bank</StyledTableCell>
                <StyledTableCell align="right">$ {row.amount}</StyledTableCell>
                <StyledTableCell align="right">{row.status}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </div>
  );
}
