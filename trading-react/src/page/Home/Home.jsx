import { Avatar, Button, IconButton, Pagination } from "@mui/material";
import React, { useEffect } from "react";
import AssetTable from "./AssetTable";
import StockChart from "./StockChart";
import { DotIcon, MessageCircle } from "lucide-react";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { getCoinList, getTop50CoinList } from "@/State/Coin/Action";



const Home = () => {
  const [category, setCategory] = React.useState("all");
  const [inputValue, setInputValue] = React.useState("");
  const [isBotRelease, setIsBotRelease] = React.useState(false);
  const [page, setPage] = React.useState(1);

  // const{ coin} = useSelector( store => store);

  const dispatch = useDispatch();

  // ✅ FIX: select ONLY coin slice
  const {  top50, loading } = useSelector((state) => state.coin);

  const { coin} = useSelector(store => store);



  useEffect(() => {
    if (category === "all") {
    dispatch(getCoinList(page));
  }
  }, [dispatch]);
  

  useEffect(() => {
    if (category === "top50") {
      dispatch(getTop50CoinList(page));
    }
  }, [category, dispatch]);


   useEffect(() => {
    if (category === "topGainers") {
    dispatch(getCoinList());
  }
  }, [dispatch]);

  




  const displayedCoins = category === "top50" ? top50 : coin.coinList;

  const handleBotRelease = () => setIsBotRelease(!isBotRelease);

  const handleCategory = (value) => {
    setCategory(value);
    setPage(1);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      console.log(inputValue);
    }
  };

  return (
    <div className="relative ">
      <div className="lg:flex ">
        {/* LEFT SIDE */}

        
        {/* <div className="lg:w-1/2 p-3"> */}
        <div className="lg:w-[50%] lg:border-r p-3">
          <div className="p-3 flex items-center gap-4">
            <Button
              onClick={() => handleCategory("all")}
              variant={category === "all" ? "default" : "outline"}
              className="rounded-full"
              sx={{
                "&:hover": {
                  bgcolor: "white",
                  color: "#1f2937",
                  borderColor: "#1f2937",
                },
              }}
            >
              All
            </Button>

            <Button
              onClick={() => handleCategory("top50")}
              variant={category === "top50" ? "default" : "outline"}
              className="rounded-full"
              sx={{
                "&:hover": {
                  bgcolor: "white",
                  color: "#1f2937",
                  borderColor: "#1f2937",
                },
              }}
            >
              Top 50
            </Button>

            <Button
              onClick={() => handleCategory("topGainers")}
              variant={category === "topGainers" ? "default" : "outline"}
              className="rounded-full"
              sx={{
                "&:hover": {
                  bgcolor: "white",
                  color: "#1f2937",
                  borderColor: "#1f2937",
                },
              }}
            >
              Top Gainers
            </Button>

            <Button
              onClick={() => handleCategory("topLosers")}
              variant={category === "topLosers" ? "default" : "outline"}
              className="rounded-full"
              sx={{
                "&:hover": {
                  bgcolor: "white",
                  color: "#1f2937",
                  borderColor: "#1f2937",
                },
              }}
            >
              Top Losers
            </Button>
          </div>

          <AssetTable coin={displayedCoins} category={category} />

               

         {/* // pagination */}          
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:block lg:w-[50%] p-5">

            {/* <div className="hidden lg:flex lg:w-1/2 h-screen p-10 flex-col"> */}
          <StockChart coinId={coin.id} />

          <div className="flex gap-5 items-center mt-5">
            <Avatar src={coin.coinDetails?.image.large} />

            <div>
              <div className="flex items-center gap-2">
                <p>{coin.coinDetails?.symbol.toUpperCase()}</p>
                <DotIcon className="text-gray-400" />
                <p className="text-gray-400">{coin.coinDetails?.name}</p>
              </div>

              <div className="flex items-end gap-2">
                <p className="text-xl font-bold">{coin.coinDetails?.market_data.current_price.usd}</p>
                <p className="text-red-600">
                  <span>{coin.coinDetails?.market_data.market_cap_change_24h}</span>
                  <span> - ({coin.coinDetails?.market_data.market_cap_change_percentage_24h}) %</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CHAT BOT */}
      
    </div>
  );
};

export default Home;




// 2:08 resume