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
  const { coinList, top50, loading } = useSelector((state) => state.coin);

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
              onClick={() => handleCategory("topGainer")}
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

          {/* <AssetTable coin={coin.coinList} category={category} /> */}

          

         {/* // pagination */}

          
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:block lg:w-[50%] p-5">

            {/* <div className="hidden lg:flex lg:w-1/2 h-screen p-10 flex-col"> */}
          <StockChart coinId={"bitcoin"} />

          <div className="flex gap-5 items-center mt-5">
            <Avatar src="https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628" />

            <div>
              <div className="flex items-center gap-2">
                <p>ETH</p>
                <DotIcon className="text-gray-400" />
                <p className="text-gray-400">Ethereum</p>
              </div>

              <div className="flex items-end gap-2">
                <p className="text-xl font-bold">3079.7</p>
                <p className="text-red-600">
                  <span>-1319049822.578</span>
                  <span> (-0.29803%)</span>
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