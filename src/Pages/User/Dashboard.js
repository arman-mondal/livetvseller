import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import { mainListItems, secondaryListItems } from './listItems';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Card, CardMedia } from '@mui/material';
import Title from './Title';
import ChannelList from './ChannelList';
import axios from 'axios';
import { LoginOutlined } from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';

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

const defaultTheme = createTheme();

export default function Dashboard() {
  const [player, setplayer] = useState(false);
  const [mydata, setmydata] = useState([]);
  const [channelname, setchannelnames] = useState([]);

  const logout = () => {
    window.location.href = '/';
    sessionStorage.removeItem('userToken');
  };

  useEffect(() => {
    axios
      .get('https://api.dcvip.one/get/channels')
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setchannelnames(response.data);
        } else {
        }
      })
      .catch((error) => {
        console.error('Error fetching subadmins:', error);
      });

    axios
      .get('https://api.dcvip.one/user/verify', {
        headers: {
          Authorization: sessionStorage.getItem('userToken'),
        },
      })
      .then((response) => {
        console.log(response.data);
        setmydata(response.data.user.user);
        if (response.status === 200) {
          console.log('valid');
        } else {
          window.location.href = '/user/signin';
        }
      })
      .catch((error) => {
        console.error('Error fetching subadmins:', error);
        window.location.href = '/user/signin';
      });
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="absolute">
        <Toolbar>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Live TV
          </Typography>
          <Typography sx={{m:2}} >Username : {mydata.username}</Typography>
              <Typography sx={{m:2}} >Email : {mydata.email}</Typography>
              <Typography sx={{m:2}} >Credits : {mydata.credits}</Typography>
          <IconButton color="inherit" onClick={logout}>
            <LoginOutlined />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="lg"
        sx={{ mt: 4, mb: 4, backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900], flexGrow: 1, height: '100vh', overflow: 'auto' }}
      >
        <Toolbar />
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
              <Title>LIVE SERIE A</Title>
              <ChannelList channels={channelname.filter((channel) => channel.category === "LIVE SERIE A")} />
            </Paper>
          </Grid>

          {/* Recent Deposits */}
          
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Title>Champions League</Title>
              <ChannelList channels={channelname.filter((channel) => channel.category === "Champions League")} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Title>SKY CALCIO</Title>
              <ChannelList channels={channelname.filter((channel) => channel.category === "SKY CALCIO")} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Title>CANALI DAZN</Title>
              <ChannelList channels={channelname.filter((channel) => channel.category === "CANALI DAZN")} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Title>SKY SPORT</Title>
              <ChannelList channels={channelname.filter((channel) => channel.category === "SKY SPORT")} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Title>SKY CINEMA</Title>
              <ChannelList channels={channelname.filter((channel) => channel.category === "SKY CINEMA")} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Title>SKY ALTRI</Title>
              <ChannelList channels={channelname.filter((channel) => channel.category === "SKY ALTRI")} />
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
