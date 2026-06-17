import React, { useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import WalletIcon from '@mui/icons-material/Wallet';
import { CopyIcon, DollarSign, DownloadIcon, Icon, ShuffleIcon, UploadIcon } from 'lucide-react';
import ReplayIcon from '@mui/icons-material/Replay';


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import TopupForm from './TopupForm';
import WithdrawalForm from './WithdrawalForm';
import TransferForm from './TransferForm';
import SyncIcon from '@mui/icons-material/Sync';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { confirmPayment, getUserWallet, getWalletTransactions } from '@/State/Wallet/Action';
import { useLocation, useNavigate } from 'react-router-dom';
// import { Avatar } from '@mui/material';


import api from '@/config/api';// 🔴 FIX: API IMPORT FOR PAYMENT CONFIRM



function useQuery(){
  return new URLSearchParams(useLocation().search)
}


export default function Wallet() {


  const dispatch = useDispatch();
  const { wallet} = useSelector(store => store);
  const query = useQuery();
    
  const paymentId= query.get("payment_Id");

      const navigate = useNavigate();


    const orderId = query.get("order_id");  
    const razorpayPaymentId = query.get("razorpay_payment_id");

      // 🔴 FIX: Razorpay sends ONLY razorpay_payment_id

    //  ================= PAYMENT CONFIRM =================
      useEffect(() => {
        if (orderId && razorpayPaymentId) {
          dispatch(confirmPayment({
            jwt: localStorage.getItem("jwt"),
            orderId,
            paymentId: razorpayPaymentId
          }));

          // 🔴 FIX: remove params to prevent double credit
          window.history.replaceState({}, document.title, "/wallet");
        }
      }, [orderId, razorpayPaymentId, dispatch]);



  
  useEffect(()=> {

    handleFetchUserWallet();
    handleFetchWalletTransaction();
  }, [dispatch]);


  // useEffect(() => {
  //   if(orderId){
  //     dispatch(depositMoney ({jwt:localStorage.getItem("jwt"),
  //       orderId,
  //       paymentId: razorpayPaymentId || paymentId,
  //       navigate
        
  //     }))
  //   }
  // },[])

  // hello world


  const handleFetchUserWallet =()=>{
    dispatch(getUserWallet(localStorage.getItem("jwt")))

  }

  const handleFetchWalletTransaction = () =>{
    dispatch(getWalletTransactions({
      jwt:localStorage.getItem("jwt")
    }))
    
  }


  useEffect(() => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
    dispatch(getWalletTransactions({ jwt: localStorage.getItem("jwt") }));
  }, [dispatch]);




  const [openDialog, setOpenDialog] = React.useState(null);

  const handleClickOpen = (type) => {
    setOpenDialog(type);
  };

  const handleClose = () => {
    setOpenDialog(null);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="pt-10 w-full lg:w-[60%]">
        <Card sx={{ maxWidth: 1500 }} > 
          <CardActionArea className="pb-9 ">

            <CardContent>
              <div className="flex justify-between items-center text-center">

                {/* Wallet Title */}
                <div className="flex items-center gap-5">
                  <WalletIcon size={30} />
                  <div>
                    <Typography className="text-2xl" gutterBottom variant="h5">
                      Wallet
                    </Typography>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-200 text-sm"> #{wallet.userWallet?.id}</p>
                      <CopyIcon size={15} className="cursor-pointer hover:text-slate-300" />
                    </div>
                  </div>
                </div>
                <Button variant='outlined'>

                  <ReplayIcon onClick = { handleFetchUserWallet} fontSize="large" 
                className="w-10 h-10 cursor-pointer hover:text-gray-400" />

                </Button>
                
              </div>
            </CardContent>

            {/* ---------------- MONEY SECTION ---------------- */}
            <CardContent>
              <div className="flex items-center ">
                <DollarSign />
                <span className="text-2xl font-semibold">{wallet.userWallet?.balance}</span>
              </div>

              <div className="flex gap-7 mt-5 ">



                {/* ---------------- ADD MONEY ---------------- */}
                <Button variant="outlined" onClick={() => handleClickOpen("add")}>
                  <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-md">
                    <UploadIcon />
                    <span className="text-md mt-2">Add Money</span>
                  </div>
                </Button>



                <Dialog    open={openDialog === "add"} onClose={handleClose}>
                  <DialogTitle sx={{ textAlign: "center", fontWeight: 600 }} >Top Up Your Wallet</DialogTitle>
                  <DialogContent>                    
                    <TopupForm onClose={handleClose} />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                  </DialogActions>
                </Dialog>





                {/* ---------------- WITHDRAW ---------------- */}
                <Button variant="outlined" onClick={() => handleClickOpen("withdraw")}>
                  <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-md">
                    <DownloadIcon />
                    <span className="text-md mt-2">Withdrawal</span>
                  </div>
                </Button>



                <Dialog open={openDialog === "withdraw"} onClose={handleClose} fullWidth  maxWidth="sm"  >
                  <DialogTitle sx={{ textAlign: "center", fontWeight: 600 }}>Request Withdrawal</DialogTitle>
                  <DialogContent>
                    
                    <WithdrawalForm  onClose={handleClose} />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                  </DialogActions>
                </Dialog>









                {/* ---------------- TRANSFER ---------------- */}
                <Button variant="outlined" onClick={() => handleClickOpen("transfer")}>
                  <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-md">
                    <ShuffleIcon />
                    <span className="text-md mt-2">Transfer</span>
                  </div>
                </Button>




                <Dialog open={openDialog === "transfer"} onClose={handleClose} fullWidth  maxWidth="sm" >
                  <DialogTitle sx={{ textAlign: "center", fontWeight: 600 }}>Transfer to other Wallet </DialogTitle>
                  <DialogContent>
                   
                    <TransferForm onClose={handleClose}/>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                  </DialogActions>
                </Dialog>

              </div>
            </CardContent>

          </CardActionArea>
        </Card>

            < div className='py-5 pt-10'>

                <div className='flex gap-2 items-center pb-5'>

                  <h1 className='text-2xl font-semibold'> History</h1>

                  <SyncIcon onClick= {handleFetchWalletTransaction} className='h-7 w-7 p-0 cursor-pointer hover:text-gray-400'/>

                </div>

                <div className='space-y-5'> 

                  {wallet.transactions.map((item, i) =><div key={i}>

                  <Card className=' px-5 flex justify-between  items-center p-2 '
                  sx={{ maxWidth: 1500 }} >

                    <div className='flex items-center gap-5'>

                      <div>
                        <IconButton>
                            <ShuffleIcon />
                        </IconButton>                       

                      </div>

                      <div className='space-y-1'>
                        <h1> {item.type || item.purpose}</h1>
                        <p className='text-sm text-gray-500'> {item.date}</p>
                      </div>

                    </div>

                    <div>
                      
                      <p className={`text-green-500`}>  {item.amount} USD</p>
                    </div>

                  </Card>


                  </div> )}

                </div>

            </div>
      </div>
    </div>
  );
}
