import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import { fetchMarketChart } from "@/State/Coin/Action";

const timeSeries = [
  { label: "1 Day", value: 1 },
  { label: "1 Week", value: 7 },
  { label: "1 Month", value: 30 },
  { label: "1 Year", value: 365 },
];

const StockChart = ({ coinId }) => {
  const dispatch = useDispatch();
  const { marketChart = { data: [] }, loading } = useSelector(state => state.coin);
  const [days, setDays] = useState(30);

  useEffect(() => {
    if (!coinId) return;
    dispatch(fetchMarketChart({
      coinId,
      days,
      jwt: localStorage.getItem("jwt"),
    }));
  }, [coinId, days, dispatch]);

  const series = [{
    name: "Price",
    data: marketChart.data.map(([time, price]) => [time, price]),
  }];

  const options = {
    chart: {
      id: "area-datetime",
      type: "area",
      zoom: { autoScaleYaxis: true },
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    xaxis: { type: "datetime", tickAmount: 6 },
    tooltip: { theme: "dark" },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    grid: { borderColor: "#47535E", strokeDashArray: 4 },
  };

  if (loading) return <p className="text-white">Loading chart...</p>;

  return (
    <Box
      sx={{
        width: "100%",
        // 1. Matches the responsive height logic from your Home.jsx
        height: {
          xs: "65vh",   // mobile
          lg: "80vh",   // desktop
          xl: "85vh",   // extra large/4K
        },
        display: "flex",       // 2. Critical: Use flexbox to push the chart to fill space
        flexDirection: "column",
        bgcolor: "transparent",
        borderRadius: 2,
      }}
    >
      {/* HEADER & BUTTONS (Fixed at top) */}
      <div className="pt-5 flex-shrink-0">
        <h2 className="text-white text-xl mb-5 font-semibold">Stock Chart</h2>
        <div className="flex gap-3 mb-5">
          {timeSeries.map((item) => (
            <Button
              key={item.label}
              variant={days === item.value ? "contained" : "outlined"}
              onClick={() => setDays(item.value)}
              sx={{
                textTransform: "none",
                "&:hover": { bgcolor: "white", color: "#1f2937" }
              }}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {/* 3. DYNAMIC CHART WRAPPER */}
      <div 
        id="chart-timelines" 
        style={{ 
          flexGrow: 1,      // Forces this div to fill all remaining height in the Box
          width: '95%', 
          minHeight: 0,     // Prevents chart from overflowing its parent
        }}
      >
        <ReactApexChart 
          options={options} 
          series={series} 
          type="area" 
          height="95%"     // 4. SET TO 100% so it grows with the Box

          
        />
      </div>
    </Box>
  );
};

export default StockChart;