import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

import { useState, useEffect } from 'react';
import { Title } from '@mui/icons-material';
import ResellerEmailResolver from './ResellerEmailResolver';
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



  
  
  // ... Rest of your
  
export default function ChannelTable() {
    const [resellers, setResellers] = useState([]);
   
   
   
    useEffect(() => {
        // Fetch data from the API endpoint
        axios.get('http://api.dcvip.one/get/channels')
          .then((response) => {
            setResellers(response.data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);
      const resellerRows = resellers.map((reseller) => ({
        name: reseller.channelName,
        mpdLink:reseller.mpdKey,
    
        clearKey: reseller.clearKey,

     }));
      
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">mpdLink</TableCell>
            <TableCell align="right">clearKey</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {resellerRows.map((resellerRows) => (
            <TableRow
              key={resellerRows.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{resellerRows.name}</TableCell>
              <TableCell align="right">{resellerRows.mpdLink}</TableCell>
              <TableCell align="right">{resellerRows.clearKey}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}