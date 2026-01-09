import React from 'react';
import Input from '@mui/material/Input';
import { Button, DialogActions } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { withdrawalRequest } from '@/State/Withdrawal/Action';

const WithdrawalForm = ({ onClose }) => {

  const dispatch = useDispatch();
  const {wallet,withdrawal} = useSelector(store => store);


  const [amount, setAmount] = React.useState("");

  const handleSubmit = () => {
    dispatch(withdrawalRequest ({ amount: Number(amount),
                                  jwt:localStorage.getItem("jwt")?.trim(),
     }))
    console.log(amount);
  };

  return (
      <div className="pt-8 space-y-8">

        <div className="flex justify-between items-center rounded-md
          bg-slate-900 text-xl font-bold px-3 py-4 text-white">
          <p>Available Balance</p>
          <p>$9000</p>
        </div>

        <div>
          <h1 className="pb-4 text-lg font-semibold">
            Enter Withdrawal Amount
          </h1>

          <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="$9999"
            type="number"
            fullWidth
            className="py-3 text-2xl"
          />
        </div>

        <div>
          <p className="pb-2">Transfer to</p>

          <div className="flex items-center gap-5 border px-5 py-3 rounded-md">
            <img
              className="h-8 w-8"
              src="https://cdn.pixabay.com/photo/2020/02/18/11/03/bank-4859142_1280.png"
              alt=""
            />
            <div>
              <p className="text-xl font-bold">{withdrawal.paymentDetails?.bankName}</p>
              <p className="text-xl">{withdrawal.paymentDetails?.accountNumber}</p>
            </div>
          </div>
        </div>

        <DialogActions className="px-0">
          <Button
            onClick={() => {
              handleSubmit();
              onClose();
            }}
            variant="outlined"
            className="w-full h-14 mt-6"
          >
            Withdraw
          </Button>
        </DialogActions>

      </div>
  );
};

export default WithdrawalForm;
