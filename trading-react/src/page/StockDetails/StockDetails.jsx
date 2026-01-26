
import React, { useEffect } from "react";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { DotIcon } from 'lucide-react'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { TradingForm } from "./TradingForm";
import StockChart from "../Home/StockChart";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCoinDetails,  } from "@/State/Coin/Action";
import { addItemToWatchlist, getUserWatchlist } from "@/State/Watchlist/Action";





const StockDetails = () => {

   const { coin} = useSelector( store => store);
   const dispatch = useDispatch();
   const {id} = useParams();

    useEffect (()=> {
      // if (id){}
        dispatch ( fetchCoinDetails({coinId:id,jwt:localStorage.getItem("jwt")}));  

        dispatch ( getUserWatchlist ( localStorage.getItem("jwt")) )
      
    }, [id]);

    const handleAddToWatchlist = () => {
      dispatch( addItemToWatchlist ({coinId:id, jwt:localStorage.getItem("jwt")
        
      }));
    }


    const [openDialog, setOpenDialog] = React.useState(null);  
    const handleClickOpen = (type) => {  setOpenDialog(type); };  
    const handleClose = () => {  setOpenDialog(null);};

  
    // console.log (" coin this is final",  coin);

    // const { coinDetails,coinList, loading } = useSelector( state => state.coin );

  //  console.log (" coinList2222",   coinList);
  

  return (

    <>

    <div className='p-5 mt-5 flex  justify-center'>  

      <div className= 'flex items-center justify-between   w-full lg:w-[80%]' >

            <div className= 'flex  gap-5 items-center' >

                  <div>
                      {/* <Avatar src={"https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"} />   */}

                      <Avatar src={coin.coinDetails?.image.large} />  
                      {/* // unable to change this to dynamic */}
                        
                  </div>

              <div>
                  <div className='flex items-center gap-2'>

                      <p>{coin.coinDetails?.symbol.toUpperCase()}</p>
                      <DotIcon className='text-gray-400'/>
                      <p className='text-gray-400'>{coin.coinDetails?.name}</p>

                    </div>
                    <div className='flex items-end gap-2'>

                      <p className='text-xl font-bold'>{coin.coinDetails?.market_data.current_price.usd} </p>
                      <p className='text-red-600' >
                        
                          <span>{coin.coinDetails?.market_data.market_cap_change_24h}</span>
                          <span> - ({coin.coinDetails?.market_data.market_cap_change_percentage_24h}) % </span>                
                      </p>
                  </div>
            </div>
                      
            </div> 

            <div className=" px-15 flex items-center gap-4">
              <Button  onClick={handleAddToWatchlist}  >

                {/* {existInWatchlist(watchlist?.items, coinDetails)} */}

              { true ?<BookmarkIcon className= 'h-6 w-6' sx={{ backgroundColor: "white",  color: "black"}} fontSize='large' />
                :
                <BookmarkBorderIcon className= 'h-6 w-6'  sx={{ backgroundColor: "black",  color: "white"}} fontSize='large' />}
                
              </Button>

              <Button   size="lg" sx={{ backgroundColor: "white",  color: "black"}}  onClick={() => handleClickOpen("transfer")}>
                    
                      <span className="text-lg mt-2">Trade</span>
                    
                </Button>


                    <Dialog open={openDialog === "transfer"} onClose={handleClose} fullWidth  maxWidth="sm" >
                      <DialogTitle sx={{ textAlign: "center", fontWeight: 600 }}>How Much do you want to spend?   </DialogTitle>
                      <DialogContent>                   
                        <TradingForm onClose={handleClose}/>                    
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                      </DialogActions>
                    </Dialog>
            </div>  
      </div>


      

      
    </div>

    <div className='p-5 mt-5 flex  justify-center'>  

      <div className= '   w-full lg:w-[80%]' >
            
             <div className='w-full h-"50%" md:h-[450px] lg:h-"90%"'>
             
             <StockChart coinId= {id} />
            </div>  
      </div>


      

      
    </div>

    
    </>
   
  )
}

export default StockDetails


// resume from 1:47