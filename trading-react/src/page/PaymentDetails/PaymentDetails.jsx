import React, { useEffect,  } from "react";
import { 
  Card, 
  CardContent, 
  DialogActions, 
  Dialog, 
  DialogTitle, 
  DialogContent 
} from "@mui/material";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { PaymentDetailsForm } from "./PaymentDetailsForm";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentDetails } from "@/State/Withdrawal/Action";


export default function PaymentDetails() {
  const {withdrawal} = useSelector(store => store  );
  const dispatch = useDispatch ();

  useEffect(() => {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    dispatch(getPaymentDetails({ jwt }));
  }
}, [dispatch]);



  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div className="flex flex-col items-center">
  <div className="pt-5 w-full lg:w-[50%]">
    <div className="px-20 mt-10">
      <h1 className="text-4xl pb-8">Payment Details</h1>

      {/* Improved Check: Ensure paymentDetails exists and has a key like bankName */}
      {withdrawal.paymentDetails? (
        <Card>
          <CardContent>
            <Typography variant="h5" className="pb-5">
              {withdrawal.paymentDetails?.bankName}
            </Typography>

            <Typography variant="h6" sx={{ color: "text.secondary" }}>
              A/C NO: {withdrawal.paymentDetails?.accountNumber}
            </Typography>
          </CardContent>

          <CardContent>
            <div className="flex items-center pb-5">
              <p className="w-32">A/c Holder</p>
              <p className="text-grey-400"> : {withdrawal.paymentDetails?.accountHolderName}</p>
            </div>

            <div className="flex items-center">
              <p className="w-32">IFSC</p>
              <p className="text-grey-400"> : {withdrawal.paymentDetails?.ifsc}</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Button 
            variant="outlined" 
            className="w-full h-14 mt-6 py-6"
            onClick={handleClickOpen}
          >
            Add Payment details
          </Button>

          <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ textAlign: "center", fontWeight: 600 }}>
              Payment Details
            </DialogTitle>
            <DialogContent>
              <PaymentDetailsForm onClose={handleClose} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  </div>
</div>
  );
}
