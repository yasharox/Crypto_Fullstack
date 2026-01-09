
import "@fontsource/roboto";
import Navbar from "./page/Navbar/Navbar";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from "./page/Home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Portfolio from "./page/Portfolio/Portfolio";
import Activity from "./page/Activity/Activity";
import Wallet from "./page/Wallet/Wallet";
import PaymentDetails from "./page/PaymentDetails/PaymentDetails";
import WatchList from "./page/Watchlist/Watchlist";
import Withdrawal from "./page/Withdrawal/Withdrawal";
import Profile from "./page/Profile/Profile";
import Logout from "./page/Logout/Logout";
import StockDetails from "./page/StockDetails/StockDetails";
import { SearchCoin } from "./page/Search/SearchCoin";
import NotFound from "./page/NotFound/NotFound";
import { Auth } from "./page/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./State/Auth/Action";
import { store } from "./State/Store";


function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: { default: "#111827", paper: "#111827" },
      text: { primary: "#ffffff", secondary: "#9ca3af" },
    },
  });

  const { auth } = useSelector(state => state); // Use state => state or state => state.auth
  const dispatch = useDispatch();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [auth.jwt, dispatch]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      
      <div className="app-container min-h-screen h-screen w-full flex flex-col">
        {/* ==FIXED: Only show Navbar if user is logged in== */}
        {auth.user && <Navbar />}

        <Routes>
          {/* ==PUBLIC ROUTES (Accessible when not logged in)== */}
          <Route   path="/signin"  element={auth.user ? <Navigate to="/" /> : <Auth />} 
          />
          <Route  path="/signup" element={auth.user ? <Navigate to="/" /> : <Auth />} 
          />
          <Route  path="/forgot-password"  element={auth.user ? <Navigate to="/" /> : <Auth />} 
          />

          {/* ==PRIVATE ROUTES (Protected by auth.user check)== */}
          <Route  path="/" element={auth.user ? <Home /> : <Navigate to="/signin" />} 
                    />
          <Route path="/portfolio"element={auth.user ? <Portfolio /> : <Navigate to="/signin" />} 
          />
          <Route path="/watchlist" element={auth.user ? <WatchList /> : <Navigate to="/signin" />} 
          />
          <Route path="/payment-details" element={<PaymentDetails/>}/>
          <Route path="/withdrawal" element={<Withdrawal/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/search" element={<SearchCoin/>}/>

          <Route path="/activity" element={auth.user ? <Activity /> : <Navigate to="/signin" />} />
          <Route path="/wallet" element={auth.user ? <Wallet /> : <Navigate to="/signin" />} />
          <Route path="/profile" element={auth.user ? <Profile /> : <Navigate to="/signin" />} />
          <Route path="/market/:id" element={auth.user ? <StockDetails /> : <Navigate to="/signin" />} />
          
          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
