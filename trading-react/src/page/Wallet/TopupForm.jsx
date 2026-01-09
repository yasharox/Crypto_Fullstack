import React from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import { Button, DialogActions } from '@mui/material';
import { useDispatch } from 'react-redux';
import { paymentHandler } from '@/State/Wallet/Action';




const TopupForm = ({onClose}) => {
  const [amount, setAmount] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("RAZORPAY");


  const dispacth = useDispatch();
  const handleSubmit = (e) => {

    if (!amount || Number(amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }
    
    console.log( amount, paymentMethod);
    dispacth( paymentHandler( { jwt:localStorage.getItem("jwt"),
      paymentMethod,
      amount: Number(amount),

    }))

    onClose();
  }


  return (
    <div className="pt-10 space-y-5 ">

      {/* ---------- AMOUNT INPUT ---------- */}
      <div>
        <h1 className="pb-1 font-semibold">Enter Amount</h1>

        <Input
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          className="py-3 text-2xl"
          placeholder="$9999"
          fullWidth
        />
      </div>

      {/* ---------- PAYMENT METHOD ---------- */}
      <div className=" flex items-center justify-center">
        <FormControl>
          <FormLabel id="payment-method">
            <h1 className="pb-1 font-semibold">Select Payment Method</h1>
          </FormLabel>

          <RadioGroup
            row
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className='gap-5 mt-3 p-10'
            // className="flex justify-center gap-5 mt-3"
            
          >
            {/* -------- RAZORPAY -------- */}
            <FormControlLabel
              value="RAZORPAY"
              control={<Radio />}
              label={
                <div className="bg-white p-3 rounded-xl shadow-md w-36 h-12 flex items-center justify-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Razorpay_logo.svg/256px-Razorpay_logo.svg.png"
                    alt="Razorpay"
                    className="h-10 object-contain"
                  />
                </div>
              }
            />

            {/* -------- STRIPE -------- */}
            <FormControlLabel
              value="STRIPEPAY"
              control={<Radio />}
              label={
                <div className="bg-white p-3 rounded-xl shadow-md w-36 h-12 flex items-center justify-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/256px-Stripe_Logo%2C_revised_2016.svg.png"
                    alt="Stripe"
                    className="h-10 object-contain"
                  />
                </div>
              }
            />
          </RadioGroup>
          
        </FormControl>
      </div>

      {/* <Button onClick={handleSubmit} onClose() className="w-full  h-15 " variant="outlined"> Submit</Button> */}

       <DialogActions className="px-0">
                <Button
                  onClick={() => {
                    handleSubmit();
                    onClose();
                  }}
                  variant="outlined"
                  className="w-full h-14 mt-6" >
                  
                  Submit
                </Button>
              </DialogActions>

    </div>
  );
};

export default TopupForm;
