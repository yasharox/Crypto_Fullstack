import { fetchMarketChart } from "@/State/Coin/Action";
import { Button } from "@mui/material";
import React, {  useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";



// const timeSeries = [

//   {
//     keyword: "DIGITAL_CURRENCY_DAILY",
//     key: "Time Series (Daily)",
//     label: "1 Day",
//     value: 1,
//   },
//   {
//     keyword: "DIGITAL_CURRENCY_WEEKLY",
//     key: "Weekly Time Series",
//     label: "1 Week",
//     value: 7,
//   },
//   {
//     keyword: "DIGITAL_CURRENCY_MONTHLY",
//     key: "Monthly Time Series",
//     label: "1 Month",
//     value: 30,
//   },
// ];

const timeSeries = [
  { label: "1 Day", value: 1 },
  { label: "1 Week", value: 7 },
  { label: "1 Month", value: 30 },
  { label: "1 Year", value: 365 },
];

const StockChart = ({coinId}) => {


   const dispatch = useDispatch (); 

   const { marketChart = { data: [] }, loading } =
    useSelector(state => state.coin);
  
    const [days, setDays] = useState(30);

    useEffect (()=> {

      if (!coinId) return;
      dispatch(
      fetchMarketChart({
        coinId,
        days,
        jwt: localStorage.getItem("jwt"),
      })
    );
    }, [ coinId, days])



  // const [activelabel, setActivelabel] = useState();
 
  const series = [
    {
      name: "Price",
      data: marketChart.data.map(([time, price]) => [time, price]),
    
    },
  ];

  // ----------------------------
  // CHART OPTIONS
  // ----------------------------
  const options = {
    chart: {
      id: "area-datetime",
      type: "area",
      zoom: { autoScaleYaxis: true },
      toolbar: { show: false },
    },

    dataLabels: {
      enabled: false,
    },

    stroke: {
      curve: "smooth",
      width: 2,
    },

    xaxis: {
      type: "datetime",
      tickAmount: 6,
    },

    markers: {
      size: 0,
    },

    tooltip: {
      theme: "dark",
      x: { format: "dd MMM yyyy HH:mm" },
    },

    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },

    grid: {
      borderColor: "#47535E",
      strokeDashArray: 4,
    },
  };

  // const handleActiveLabel = (value) => { setActivelabel(value)};

  if (loading) return <p className="text-white">Loading chart...</p>;

  

  return (

    
    
    <div  className="mt-5">  

       <h2 className="text-white text-xl mb-5 font-semibold">Stock Chart</h2>

       <div className="flex gap-3  "> 
                { timeSeries.map((item) => <Button 

                                key={item.label} 
                                variant= {days === item.value? "": "outlined" }                
                                onClick={()=> setDays(item.value)} 
                
                                sx={{                  

                                "&:hover": {
                                bgcolor: "white",  // dark gray (Tailwind gray-800)
                                color: "#1f2937",
                                borderColor: "#1f2937",
                                }
                            }}> {item.label}</Button>)}

       </div>


        <div id =" chart-timelines">
            <ReactApexChart options={options} series={series} type='area'
             height= {550} />
        </div>

        
    </div>
  );
};

export default StockChart;
