import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TextField from "@mui/material/TextField"
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Button, FormControl, InputLabel, MenuItem } from '@mui/material/';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import Title from "./Title"
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { LoginOutlined } from '@mui/icons-material';
import axios from 'axios';
import SubAdminEmailReslover from '../../SubAdmin/Dashboard/SubAdminEmailReslover';
import Select from '@mui/material/Select';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ResellerDashboard() {


  const [open, setOpen] = React.useState(true);
  const[mydata,setmydata]=React.useState([]);
  const[dashboard,setdashboard]=React.useState(true);
  const[adduser,setadduser]=React.useState(false);
  const[addcredit,setaddcredit]=React.useState(false);
  
  const[users,setuser]=React.useState([]);
  
  const toggleDrawer = () => {
    setOpen(!open);
  };
 const handledashboard=()=>{

    setdashboard(true)
    setaddcredit(false)
    setadduser(false)

 }

    const handleadduser=()=>{
        setdashboard(false)
        setaddcredit(false)
        setadduser(true)
    }

    const handleaddcredit=()=>{
        setdashboard(false)
        setaddcredit(true)
        setadduser(false)

    }

  React.useEffect(() => {
    // Fetch subadmins from the API
    

    axios.get('https://api.dcvip.one/get/users')
      .then((response) => {
       console.log(response.data)
       if(response.status===200){
        setuser(response.data)
       }
    
      })
      .catch((error) => {
        console.error('Error fetching subadmins:', error);


      });

    axios.get('https://api.dcvip.one/reseller/verify',{
        headers:{
            Authorization:sessionStorage.getItem('resellerToken')
        },
    })
      .then((response) => {
       console.log(response.data)
       if(response.status===200){
        console.log("valid")
        setmydata(response.data.user.reseller)
        sessionStorage.setItem('resellerId',response.data.user.reseller._id)
       }
    
      })
      .catch((error) => {
        console.error('Error fetching subadmins:', error);
        window.location.href="/reseller/signin"


      });
  }, []);


  const[userdata,setuserdata]=React.useState({
    username:'',
    email:'',
    password:'',
  })
  const[creditdata,setcreditdata]=React.useState({
senderId:'',
    recieverId:'',
    creditToTransfer:'',
  })

  const handlecreditdatachange = (event) => {
    const { id, value } = event.target;
    setcreditdata((prevData) => ({
      ...prevData,
      [id]: value,

    }));
  };
  const handleaddcredittouser= async()=>{

    const response = await axios.post("https://api.dcvip.one/reseller/transfer",{
        senderId:sessionStorage.getItem('resellerId'),
        receiverId:creditdata.undefined,
        creditsToTransfer:parseInt(creditdata.creditToTransfer)
  })
        .then((response)=>{
            console.log(response)
            alert("Transfered")
        })
        .catch((error)=>{
console.log(error)
        })
  }

const handleuserchange = (event) => {
        const { id, value } = event.target;
        setuserdata((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      };

const handleadduserclickbtn= async ()=>{
    const response = axios.post("https://api.dcvip.one/user",{
        username:userdata.username,
        email:userdata.email,
        password:userdata.password,
        resellerId:mydata._id
    })
       .then((response)=>{
              console.log(response)
         }
         )
         .catch((error)=>{
                console.log(error)
            }
            )

}
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton onClick={()=>window.location.href="/reseller/signin"}  color="inherit">
             <LoginOutlined />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
          <ListItemButton onClick={handledashboard} >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton onClick={handleadduser} >
      <ListItemIcon>
      <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Add Users" />
    </ListItemButton>
    <ListItemButton onClick={handleaddcredit} >
      <ListItemIcon>
      <ShoppingCartIcon />

      </ListItemIcon>
      <ListItemText primary="Add Credit" />
    </ListItemButton>
              <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>

        {dashboard &&   <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >

                <Title>Your Details</Title>
                <Typography  fontStyle={'bold'} variant="h3" fontSize={'20px'} >Userame:{mydata.username}</Typography>
                <Typography  fontStyle={'bold'} variant="h3"  fontSize={'20px'} >Email:{mydata.email}</Typography>

                <Typography  fontStyle={'bold'} variant="h3"  sx={{height:10}} fontSize={'20px'} >SubAdmin Ref:<SubAdminEmailReslover subadminId={mydata.subadminRef}/></Typography>

                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                <Title>Credits</Title>

                <Typography  fontStyle={'bold'} variant="h1" gutterBottom marginTop={8} textAlign={'center'} fontSize={'40px'} >{mydata.credits}</Typography>

                </Paper>

              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Title>Channel Access</Title>



                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
 }
 {addcredit && <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={15}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 400,
                  }}
                ><FormControl sx={{ m: 1, minWidth: 120 }} size="small" >
                    
 <InputLabel id="demo-select-small-label">SubAdmin</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="recieverId"
        sx={{ m: 2 }}
        onChange={handlecreditdatachange}
        value={creditdata.recieverId}

        label="Reseller"
      >
       <MenuItem value="">Select SubAdmin</MenuItem>
       {users.map((user) => (
          <MenuItem key={user._id} id={user._id} value={user._id}>
            {user.username}
          </MenuItem>
        ))}
       
      </Select>
                </FormControl>
                
      <TextField
        required
        sx={{ m: 2 }}
        id="creditToTransfer"
        label="amount"
        type="numbers"
        value={creditdata.creditToTransfer}
        onChange={handlecreditdatachange}
      />
      <Button variant="contained" onClick={handleaddcredittouser}>
        Add
      </Button>

    
     

                </Paper>
              </Grid>
              {/* Recent Deposits */}
    
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>}
        {adduser && <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={15}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 400,
                  }}
                >
  <Title>Add User</Title>
  <TextField
        required
        sx={{ m: 2 }}
        id="username"
        label="Username"
        type="text"
        value={userdata.username}
        onChange={handleuserchange}
      />
      <TextField
        required
        sx={{ m: 2 }}
        id="email"
        label="Email"
        type="email"
        value={userdata.email}
        onChange={handleuserchange}
      />
      <TextField
        required
        sx={{ m: 2 }}
        id="password"
        label="Password"
        type="password"
        value={userdata.password}
        onChange={handleuserchange}
      />
      <Button variant="contained" onClick={handleadduserclickbtn}>
        Add
      </Button>


                </Paper>
              </Grid>
              {/* Recent Deposits */}
              {/* Recent Orders */}
          
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>}
           </Box>
    </ThemeProvider>
  );
}