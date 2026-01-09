import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ZoomOutSharpIcon from '@mui/icons-material/ZoomOutSharp';
import { Button } from '@mui/material';
import SideBar from './SideBar';
import { useSelector } from 'react-redux';
import { store } from '@/State/Store';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    // padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  // padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'center',
}));




export default function PersistentDrawerLeft() {

  const {auth} = useSelector(store => store)
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {    
    setOpen(true);    
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };



  return (

    
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>                       
          <IconButton  color="inherit"   aria-label="open drawer"  onClick={handleDrawerOpen}
            edge="start"    sx={[   {   mr: 2,},  open && { display: 'none' },  ]} >                        
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">   CRYPTO TRADING </Typography>
          <div className='p-0 ml-9'> 
            <Button variant="outline" className='flex items-center gap-3' > 

              <ZoomOutSharpIcon/>
              <span> Search</span>
              
          </Button>

          </div>

        
            <div className="ml-auto flex items-center" >
              <Avatar>
                      {auth.user?.fullName[0].toUpperCase ()}
              </Avatar>    

          </div>

        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader >
          <IconButton onClick={handleDrawerClose}>

            

            <Button onClick={handleDrawerOpen} variant="outlined" color='white'   ><span className='font-bold text-orange-700 text-xl gap-4 p-2'>Yash </span>
            
            <span  className=' text-xl  ' > Trading  </span> </Button>


            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        
        <Divider />

        <div className=' flex justify-between items-center px-6 py-3 border-b z-50 bg-background bg-opacity-0 sticky top-0 left-0 right-0 ' > 

              <div className='flex items-center gap-3'>

                     <   SideBar/>


              </div>

        </div>

   
    
    
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {/* <Typography sx={{ marginBottom: 2 }}>          
        </Typography> */}
        <Typography sx={{ marginBottom: 1 }}>          
        </Typography>
      </Main>
    </Box>
  );
}