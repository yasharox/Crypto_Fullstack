import React from 'react';
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
    position: "sticky", // Keeps header visible while scrolling
    top: 0,
    zIndex: 10,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "white",
    borderBottom: "1px solid #374151", // Subtle border for dark mode
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "transparent",
  '&:nth-of-type(odd)': {
    backgroundColor: "rgba(255, 255, 255, 0.03)", // Very subtle stripe
  },
  '&:hover': {
    backgroundColor: "#1f2937 !important",
    cursor: "pointer",
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const AssetTable = ({ coin, category }) => {
  const navigate = useNavigate();

  return (

    
    <Box
      sx={{
        // Using standard CSS values for better MUI compatibility
        height: {
          xs: "65vh",   // mobile
          lg: category === "all" ? "100%" : "83vh", // desktop
          xl: category === "all" ? "100%" : "88vh", // Extra Large / 4K
        },
        overflowY: "auto",
        borderRadius: 2,
        // Custom Scrollbar for a premium look
        '&::-webkit-scrollbar': { width: '6px' },
        '&::-webkit-scrollbar-thumb': { backgroundColor: '#374151', borderRadius: '10px' }
      }}
    >
      <TableContainer 
        component={Paper} 
        sx={{ 
          bgcolor: "transparent", 
          boxShadow: "none",
          backgroundImage: "none" 
        }}
      >
        <Table sx={{ minWidth: 700 }} stickyHeader aria-label="customized table">
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
              <StyledTableRow key={row.id} onClick={() => navigate(`/market/${row.id}`)}>
                
                {/* First column: Avatar + Name */}
                <StyledTableCell component="th" scope="row">
                  <div className="flex items-center gap-2">
                    <Avatar sx={{ width: 32, height: 32 }} src={row.image} alt={row.name} />
                    <span>{row.name}</span>
                  </div>
                </StyledTableCell>

                {/* Data Fields */}
                <StyledTableCell align="right">{row.symbol.toUpperCase()}</StyledTableCell>
                <StyledTableCell align="right">{row.total_volume.toLocaleString()}</StyledTableCell>
                <StyledTableCell align="right">{row.market_cap.toLocaleString()}</StyledTableCell>
                <StyledTableCell 
                  align="right" 
                  sx={{ color: row.price_change_percentage_24h > 0 ? "#10b981" : "#ef4444" }}
                >
                  {row.price_change_percentage_24h?.toFixed(2)}%
                </StyledTableCell>
                <StyledTableCell align="right">
                  ${row.current_price.toLocaleString()}
                </StyledTableCell>

              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AssetTable;