import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react'
import { DotIcon } from 'lucide-react';
import { Avatar, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserWallet } from '@/State/Wallet/Action';
import { getAssetDetails } from '@/State/Asset/Action';
import { payOrder } from '@/State/Order/Action';

export const TradingForm = () => {
    const [orderType, setOrderType] = useState("BUY");

    const [amount, setAmount] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const {coin, wallet, asset} = useSelector(store => store);

    console.log ( "coin is here",coin);
    console.log ( "asset  is here",asset);

    console.log( "wallet is here",wallet);

    const dispatch = useDispatch();

    const handleChange = ( e) => {
        const amount = e.target.value;
        setAmount( amount);
        const volume = calculateBuyCost (
             amount,
             coin.market_data.current_price.usd);
             console.log ( volume);
            setQuantity( volume);
     };

     const calculateBuyCost = (amount, price) => {

        let volume = amount/price;

        let decimalPlaces = Math.max ( 2, price.toString().split (".") [0].length);

        // return Number(volume.toFixed( decimalPlaces));
          return Number(volume.toFixed( decimalPlaces));


     };

     useEffect ( () => {

        // if ( !coin,coinDetails) return; 

        dispatch(getUserWallet(localStorage.getItem("jwt")));
        dispatch(getAssetDetails ( {

            coinId:coin.id,
            jwt:localStorage.getItem("jwt"),
        }))
                                     
     }, [coin.coinDetails]);

     const handleBuyCrypto = () => {

        dispatch( payOrder ( {
            jwt: localStorage.getItem("jwt"),
             amount,
             orderData: {
                coinId: coin.coinDetails?.id,
                quantity,
                orderType,
             },

        }))

     }
  return (
    <div className='space-y-10 p5'>

        <div>
            <div className='flex gap-4 items-center justify-between'>

                <div>

                     <Box component="form"

                        className=' focus:outline-none h-14 mb-5' 
                        noValidate
                        autoComplete="off"
                        >
                        <TextField 
                        className='focus:outline-none h-14 w-80 ' 
                        onChange={handleChange}
                        type='number'
                        name='amount'    
                        
                        id="outlined-basic" label="Enter Amount" variant="outlined" />
                    
                </Box>               

                </div> 
                <div>
                    <p className='border text-2xl flex justify-center items-center w-36 h-12 mb-5 rounded-md'> 
                        {quantity}</p>
                </div>
                
                 
                
            </div>

                {false && <h1 className=' text-red-600 text-xl font-bold text-center pt-4'>                     
                Insufficient wallet balance to buy </h1>}   

        </div>

        <div className= 'flex  gap-5 items-center' >

              <div>
                  <Avatar src='https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628' />  
                    
              </div>

          <div>
              <div className='flex items-center gap-4'>

                  <p>BTC</p>
                  <DotIcon className='text-gray-400'/>
                  <p className='text-gray-400'>Bitcoin</p>

                </div>
                <div className='flex items-end gap-3 pt-2'>

                  <p className='text-xl font-bold'>${coin.coinDetails?.market_data.current_price.usd}</p>
                  <p className='text-green-600' >
                    
                      <span>1319049822.578</span>
                      <span>(0.29803%)</span>                
                  </p>
              </div>
        </div>
                  
        </div> 

        <div className='flex items-center justify-between'>

            <p> Order Type</p>
            <p> Market Order</p>

        </div>

         <div className='flex items-center justify-between'>

            <p> {orderType == "BUY" ? "Available Cash": " Available Quantity"}</p>
            <p> {orderType == "BUY" ? "$" + (wallet.userWallet.balance ) : ( asset.assetDetails?.quantity || 0)}</p>

            




        </div>

   


        <div className="flex flex-col items-center gap-5 w-full">

                {/* MAIN ACTION BUTTON */}
                <Button

                    onClick={handleBuyCrypto}
                    variant="contained"
                    fullWidth
                    sx={{
                    py: 2,
                    backgroundColor: orderType === "SELL" ? "red" : "#ffffff",
                    color: orderType === "SELL" ? "#ffffff" : "#000000",
                    "&:hover": {
                        backgroundColor: orderType === "SELL" ? "#b91c1c" : "#e5e7eb",
                    },
                    }}
                >
                    {orderType}
                </Button>

                {/* TOGGLE BUTTON */}
                <Button
                    variant="link"
                    onClick={() =>
                    setOrderType(orderType === "BUY" ? "SELL" : "BUY")
                    }
                    sx={{ color: "#93c5fd", borderColor: "#93c5fd" }}
                >
                    {orderType === "BUY" ? "Or Sell" : "Or Buy"}
                </Button>

        </div>
        
        
      
    </div>
  )
}
