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

  const dispatch = useDispatch();

  // ✅ FIX: select ONLY coin slice
  const { coinList, top50, loading } = useSelector((state) => state.coin);

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



  const displayedCoins = category === "top50" ? top50 : coinList;

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

          <div className="flex justify-center mt-5">
          <Pagination
            page={page}
            count={10}            // total pages (adjust from API later)
            color="primary"
            onChange={(e, value) => setPage(value)}
            sx={{
              "& .MuiPaginationItem-root": {
                color: "white",
              },
            }}
          />
        </div>

          
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
                <p className="text-xl font-bold">5464</p>
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
      <section className="absolute bottom-5 right-5 z-40 flex flex-col items-end gap-2">
        {isBotRelease && (
          <div className="rounded-md w-[20rem] md:w-[25rem] h-[55vh] bg-slate-900">
            {/* Header */}
            <div className="flex justify-between items-center border-b px-6 h-[12%]">
              <p className="text-white text-lg font-semibold">Chat Bot</p>

              <IconButton
                onClick={handleBotRelease}
                size="small"
                className="text-white hover:bg-slate-700 rounded-full"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>

            {/* Body */}
            <div className="h-[76%] flex flex-col overflow-y-auto gap-5 px-5 py-2">
              <div className="self-start pb-5">
                <div className="px-5 py-2 rounded-md bg-slate-800">
                  <p>Hello Yashar!!</p>
                  <p>how's the chat bot</p>
                  <p>like, price, market cap</p>
                </div>
              </div>

              {[1, 1, 1, 1, 1].map((_, i) => (
                <div
                  key={i}
                  className={`${i % 2 === 0 ? "self-start" : "self-end"} pb-5`}
                >
                  <div className="px-5 py-2 rounded-md bg-slate-800">
                    {i % 2 === 0 ? (
                      <p>prompt, who are you</p>
                    ) : (
                      <p>hi, Sadham Hussain here</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="h-[12%] border-t">
              <TextField
                className="w-full h-full"
                fullWidth
                label="write prompt"
                onChange={handleChange}
                value={inputValue}
                onKeyUp={handleKeyUp}
              />
            </div>
          </div>
        )}

        <Button
          onClick={handleBotRelease}
          className="gap-2"
          variant="contained"
        >
          <MessageCircle
            size={30}
            className="fill-[#1e293b] -rotate-90 stroke-none"
          />
          <span className="text-xl">Chat Bot</span>
        </Button>
      </section>
    </div>
  );
};

export default Home;




// 2:08 resume