import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Button } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import InputLabel from "@mui/material/InputLabel";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Select from "@mui/material/Select"
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { LoginOutlined } from '@mui/icons-material';
import Title from './Title';
import axios from 'axios';
import ChannelTable from './ChannelChart';
import ResellerTable from './SubAdminTable';


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

const defaultTheme = createTheme();

export default function SubAdminDashboard() {
    const[mydata,setmydata]=React.useState([]);
    const[dashboard,setdashboard]=React.useState(true);
    const[addSubadmin,setaddSubadmin]=React.useState(false);
    const[addchannel,setaddchannel]=React.useState(false);
    const[addUser,setaddUser]=React.useState(false);
    const[addReseller,setaddReseller]=React.useState(false);
    const[resellers,setresellers]=React.useState([]);
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleDashboardClick=()=>{
    setdashboard(true);
    setaddUser(false);
    setaddchannel(false)
    setaddReseller(false);
  }
   
    const handlerelleraddclick=()=>{
        setdashboard(false);
        setaddUser(false);
        setaddchannel(false)

        setaddReseller(true);
    }
    const handleadduserclick=()=>{
        setdashboard(false);
        setaddchannel(false)

        setaddUser(true);
        setaddReseller(false);
    }
    const handleaddchannelclick=()=>{
        setdashboard(false);
        setaddUser(false);
        setaddchannel(true)

        setaddReseller(false);
    }
    React.useEffect(() => {
        // Fetch subadmins from the API
        axios.get('https://api.dcvip.one/get/resellers',)


            .then((response) => {
                setresellers(response.data)
           
            })
            .catch((error)=>{

            })


        axios.get('https://api.dcvip.one/subadmin/verify',{
            headers:{
                Authorization:sessionStorage.getItem('subadminToken')
            },
        })
          .then((response) => {
           console.log(response.data)
           setmydata(response.data.user.subadmin)
           sessionStorage.setItem('subadminId',response.data.user.subadmin._id)
           if(response.status===200){
            console.log("valid")
           }
           else{
            window.location.href="/subadmin/signin"
           }
          })
          .catch((error) => {
            console.error('Error fetching subadmins:', error);
            window.location.href="/subadmin/signin"

          });
      }, []);
      const [userdata, setuserdata] = React.useState({
        username: '',
        email: '',
        password: '',
      });
      const handleuserchange = (event) => {
        const { id, value } = event.target;
        setuserdata((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      };
      const handleuserclick = () => {
        // Access the form data from the 'formData' state
        console.log('Username:', userdata.username);
        console.log('Email:', userdata.email);
        console.log('Password:', userdata.password);
      };
      const [resellerdata, setresellerdata] = React.useState({
        username: '',
        email: '',
        password: '',
      });
      const [creditdata, setcreditdata] = React.useState({
        senderId:sessionStorage.getItem('subadminId'),
        recieverId:'',
      });
      const handleCreditChange = (event) => {
        const { id, value } = event.target;
        setcreditdata((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      };
      const handlecreditadd = async ()=>{
    
        try {
          const response = await axios.post('https://api.dcvip.one/transfer-credits',{
                senderId:creditdata.senderId,
                receiverId:creditdata.undefined,
                creditsToTransfer:parseInt(creditdata.creditToTransfer)
            });
          console.log(response.data);
          alert("Send"+creditdata.creditToTransfer)
        } catch (error) {
          console.error(error);
        }

      }
      const handleresellerchange = (event) => {
        const { id, value } = event.target;
        setresellerdata((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      };
      const handleresellerclick = async () => {
        // Access the form data from the 'formData' state
        const response=await axios.post('https://api.dcvip.one/reseller',{
            username:resellerdata.username,
            email:resellerdata.email,
            password:resellerdata.password,
            subadminRef:sessionStorage.getItem('subadminId')
            })
        
        .then((response) => {
            alert("Added")
        }
        )
        .catch((error) => {
            console.log("Error")
        }
        );
   
      };
      const [channeldata, setchanneldata] = React.useState({
        name: '',
        mpdKey: '',
        clearKey: '',
      });
      const handlechannelchange = (event) => {
        const { id, value } = event.target;
        setchanneldata((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      };
      const handlechannelclick = () => {
        // Access the form data from the 'formData' state
        console.log('Username:', channeldata.username);
        console.log('Email:', channeldata.email);
        console.log('Password:', channeldata.password);
      };
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
              SubAdmin Dashboard
            </Typography>
            <IconButton onClick={()=>window.location.href="/subadmin/signin"} color="inherit">
              <LoginOutlined/>
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
          <ListItemButton onClick={handleDashboardClick} >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton onClick={handlerelleraddclick} >
      <ListItemIcon  >
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Add Resellers" />
    </ListItemButton>
    <ListItemButton onClick={handleadduserclick} >
      <ListItemIcon>
      <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Add Users" />
    </ListItemButton>
    <ListItemButton onClick={handleaddchannelclick} >
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Transfer Credit " />
    </ListItemButton>
    
    
              <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        {dashboard && 
        <Box
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
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
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
<Title  >Resellers</Title>
<ResellerTable/>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                    <Title>Credits Available</Title>

                    <Typography  fontStyle={'bold'} variant="h1" gutterBottom marginTop={8} textAlign={'center'} fontSize={'40px'} >{mydata.credits}</Typography>
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
               <Title>Users</Title>


                </Paper>
              </Grid>
              
              
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
               <Title>Channels</Title>
<ChannelTable/>

                </Paper>
              </Grid>
            </Grid>
            
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>}
        {addReseller && <Box
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
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={15}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  
                  }}
                >
                    <Title>Add Reseller</Title><TextField
        required
        sx={{ m: 2 }}
        id="username"
        label="Username"
        type="text"
        value={resellerdata.username}
        onChange={handleresellerchange}
      />
      <TextField
        required
        sx={{ m: 2 }}
        id="email"
        label="Email"
        type="email"
        value={resellerdata.email}
        onChange={handleresellerchange}
      />
      <TextField
        required
        sx={{ m: 2 }}
        id="password"
        label="Password"
        type="password"
        value={resellerdata.password}
        onChange={handleresellerchange}
      />
      <Button variant="contained" onClick={handleresellerclick}>
        Add
      </Button>

                </Paper>
              </Grid>
              {/* Recent Deposits */}
              
              {/* Recent Orders */}
              
              {/* Recent Orders */}
            </Grid>
            
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>}
{addUser && <Box
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
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={15}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  
                  }}
                >
                    <Title>Add User</Title><TextField
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
      <Button variant="contained" onClick={handleuserclick}>
        Add
      </Button>

                </Paper>
              </Grid>
              {/* Recent Deposits */}
              
              {/* Recent Orders */}
              
              {/* Recent Orders */}
            </Grid>
            
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>}
{addchannel && <Box
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
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={15}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  
                  }}
                >
                    <Title>Add Channel</Title>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Reseller</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="recieverId"
        value={creditdata.recieverId}
        sx={{ m: 2 }}


        label="Reseller"
        onChange={handleCreditChange}
      >
       <MenuItem value="">Select Reseller</MenuItem>
       {resellers.map((reseller) => (
          <MenuItem key={reseller._id} value={reseller._id}>
            {reseller.username}
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
        onChange={handleCreditChange}
      />
      <Button variant="contained" onClick={handlecreditadd}>
        Add
      </Button>
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              
              {/* Recent Orders */}
              
              {/* Recent Orders */}
            </Grid>
            
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>}
      </Box>
    </ThemeProvider>
  );
}