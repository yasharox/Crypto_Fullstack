import React from 'react';
import Input from '@mui/material/Input';
import { Button, DialogActions } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { transferMoney } from '@/State/Wallet/Action';

const TransferForm = ({ onClose }) => {

  const dispatch = useDispatch();
    const { wallet} = useSelector(store => store);

  const [formData, setFormData] = React.useState({
    amount: '',
    walletId: '',
    purpose: '',
  });


  const handleChange = (e) => {
    setFormData({ 
      ...formData,
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = () => {
    dispatch(transferMoney ({
      jwt:localStorage.getItem("jwt"),
      walletId:formData.walletId,
      reqData: {

        amount:formData.amount,
        purpose:formData.purpose,
      }


    }))
    console.log(formData);
  };

  return (
    <div className='pt-10 space-y-5'>
      
      {/* Amount */}
      <div>
        <h1 className='pb-1'>Enter Amount</h1>
        <Input
          name="amount"      
          onChange={handleChange}
          value={formData.amount}
          className='py-3'
          placeholder='$9999'
          fullWidth
        />
      </div>

      {/* Wallet ID */}
      <div>
        <h1 className='pb-1'>Wallet Id</h1>
        <Input
          name="walletId"
          onChange={handleChange}
          value={formData.walletId}
          className='py-3'
          placeholder='#ADER455'
          fullWidth
        />
      </div>

      {/* Purpose */}
      <div>
        <h1 className='pb-1'>Purpose</h1>
        <Input
          name="purpose"
          onChange={handleChange}
          value={formData.purpose}
          className='py-3 mb-8'
          placeholder='gift for your friend'
          fullWidth
        />
      </div>

      {/* Submit Button */}
      <DialogActions>
        <Button
          onClick={() => {
            handleSubmit();
            onClose();
            
          }}
          variant="outlined"
          className="w-full h-15 mt-6"

          
        >
          Submit
        </Button>
      </DialogActions>

    </div>
  );
};

export default TransferForm;
