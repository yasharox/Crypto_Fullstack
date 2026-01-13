import React from 'react'
import { Button } from '@mui/material'

import HomeIcon from '@mui/icons-material/Home';
import DashboardSharpIcon from '@mui/icons-material/DashboardSharp';
import BookmarkBorderSharpIcon from '@mui/icons-material/BookmarkBorderSharp';
import LocalActivitySharpIcon from '@mui/icons-material/LocalActivitySharp';
import WalletSharpIcon from '@mui/icons-material/WalletSharp';
import AccountBalanceSharpIcon from '@mui/icons-material/AccountBalanceSharp';
import CardTravelSharpIcon from '@mui/icons-material/CardTravelSharp';
import Person2SharpIcon from '@mui/icons-material/Person2Sharp';
import ExitToAppSharpIcon from '@mui/icons-material/ExitToAppSharp';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '@/State/Auth/Action';

const menu = [
  { name: "Home", path: "/", icon: <HomeIcon className='h-6 w-6' /> },
  { name: "Portfolio", path: "/portfolio", icon: <DashboardSharpIcon className='h-6 w-6' /> },
  { name: "Watchlist", path: "/watchlist", icon: <BookmarkBorderSharpIcon className='h-6 w-6' /> },
  { name: "Activity", path: "/activity", icon: <LocalActivitySharpIcon className='h-6 w-6' /> },
  { name: "Wallet", path: "/wallet", icon: <WalletSharpIcon className='h-6 w-6' /> },
  { name: "Payment Details", path: "/payment-details", icon: <AccountBalanceSharpIcon className='h-6 w-6' /> },
  { name: "withdrawal", path: "/withdrawal", icon: <AccountBalanceSharpIcon className='h-6 w-6' /> },
  { name: "Profile", path: "/profile", icon: <Person2SharpIcon className='h-6 w-6' /> },
  { name: "Logout", path: "/logout", icon: <ExitToAppSharpIcon className='h-6 w-6' /> },
];

const SideBar = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch( logout())

  }
  
  return (
    <div className=" flex flex-col gap-8 py- auto-cols-max w-f ">
      {menu.map((item) => (
        <div key={item.name}>
          
          <Button
                variant="outlined"
                className="flex items-center gap-2 py-30 w-full text-base transition-all"
                sx={{
                    justifyContent: "flex-start",
                    textTransform: "none",
                    bgcolor: "white",
                    color: "black",
                    borderColor: "#e5e7eb", // optional border color
                    py: { xs: 1, md: 1,lg:1.5 }, // Smaller padding on mobile, larger on desktop
                    fontSize: { xs: '0.875rem', md: '1rem' }, // Responsive text size

                    "&:hover": {
                    bgcolor: "#1f2937",  // dark gray (Tailwind gray-800)
                    color: "white",
                    borderColor: "#1f2937",
                    }
                }}

                onClick={()=> {navigate(item.path)

                  if (item.name == "Logout"){
                    handleLogout()
                  }

                }}
            >
            <span className="w-6 flex justify-center">{item.icon}</span>
            <span>{item.name}</span>
</Button>

        </div>
      ))}
    </div>
  );
};

export default SideBar;