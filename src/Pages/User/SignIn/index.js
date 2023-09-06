import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        LIVE TV 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();
export default function UserSignIn() {

    const navigate=useNavigate();
    React.useEffect(() => {
      const userToken = sessionStorage.getItem('userToken');
      if (userToken) {
        axios.get('https://api.dcvip.one/user/verify', {
          headers: {
            Authorization: userToken,
          },
        })
        .then((response) => {
          const userData = response.data.user;
          console.log('User data:', userData);
          // Token is valid, you can navigate to the dashboard or perform other actions
          navigate('/user/dashboard');
        })
        .catch((error) => {
          console.error('Error verifying token:', error);
          // Token is invalid, you can handle this case accordingly
        });
        // You can add code here to verify the token if needed
        // For now, simply redirect to /user/dashboard if a token is found
        navigate('/user/dashboard');
      }
    }, []);
    
    
    


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const response = await axios.post('https://api.dcvip.one/user/login', {
        email: data.get('email'),
        password: data.get('password')
    })

    .then((response) => {
      sessionStorage.setItem('userToken',response.data.token)
      console.log(response)
navigate('/user/dashboard')
    })
    .catch((error) => {
        alert("Invalid email or password")
              console.log(error)


    });

   
};


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
           </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}