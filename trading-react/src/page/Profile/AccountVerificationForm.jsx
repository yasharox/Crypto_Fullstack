import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

import { TextField, Box } from "@mui/material";
import { useState, useRef } from "react";

export const AccountVerificationForm = () => {

    

        const handleSubmit = () => {
        console.log("OTP:", otp.join(""));
        setOtp(Array(6).fill(""));
        handleClose();
        };


      const [openDialog, setOpenDialog] = React.useState(null);
    
      const handleClickOpen = (type) => {
        setOpenDialog(type);
      };
    
      const handleClose = () => {
        setOpenDialog(null);
      };

        const [otp, setOtp] = useState(Array(6).fill(""));
        const inputsRef = useRef([]);

        const handleChange = (value, index) => {
            if (!/^\d?$/.test(value)) return;

            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < 5) {
            inputsRef.current[index + 1].focus();
            }
        };

        const handleBackspace = (e, index) => {
            if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
            }
        };
  

  return (

      <div className="flex justify-between items-center text-white mt-4">
          <p>Email :</p>
          <p>CryptoMaster@gmail.com</p>          

         
          <Button variant="outlined" onClick={() => handleClickOpen("add")}
            sx={{ backgroundColor: "white", color: "black" }} > SEND OTP   </Button>      
                
                <Dialog    open={openDialog === "add"} onClose={handleClose} disableRestoreFocus>
                 
  
                  <DialogTitle sx={{ textAlign: "center", fontWeight: 600 }} > Enter OTP</DialogTitle>
                  <DialogContent>                    
                    {/* <TopupForm onClose={handleClose} /> */}

                    <div className="py-5 flex gap-10 justify-between items-center">
                            <Box className="flex gap-3 justify-center">
                                {otp.map((digit, index) => (
                                    <TextField
                                    key={index}
                                    inputRef={(el) => (inputsRef.current[index] = el)}
                                    value={digit}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    onKeyDown={(e) => handleBackspace(e, index)}
                                    inputProps={{
                                        maxLength: 1,
                                        className:
                                        "text-center text-xl font-semibold text-white bg-transparent",
                                    }}
                                    sx={{
                                        width: 48,
                                        "& .MuiOutlinedInput-root": {
                                        borderRadius: "10px",
                                        backgroundColor: "#1f2937",
                                        },
                                        "& fieldset": {
                                        borderColor: "#374151",
                                        },
                                    }}
                                    />
                                ))}
                         </Box>

                     <DialogActions>
                        <Button onClick={handleSubmit} sx={{ backgroundColor: "white", color: "black" }}>Submit</Button>
                    </DialogActions>
                    </div>

                   
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                  </DialogActions>
                </Dialog>

          
        </div>
   
     

      

      
   
  );
};
