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
import SubAdminEmailReslover from './SubAdminEmailReslover';



  
  // ... Rest of your
  
export default function ResellerTable() {
    const [resellers, setResellers] = useState([]);

    useEffect(() => {
        // Fetch data from the API endpoint
        axios.get('http://api.dcvip.one/get/resellers')
          .then((response) => {
            setResellers(response.data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);
      const resellerRows = resellers.map((reseller) => ({
        username: reseller.username,
        email:reseller.email,
    
        credits: reseller.credits,
        subadminRef:reseller.subadminRef,
    
     }));
      
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Credits</TableCell>
            <TableCell align="right">SubAdminRef</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {resellerRows.map((resellerRow) => (
  <TableRow
    key={resellerRow.username} // Use resellerRow.username as the key
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  >
    <TableCell align="right">{resellerRow.username}</TableCell>
    <TableCell align="right">{resellerRow.email}</TableCell>
    <TableCell align="right">{resellerRow.credits}</TableCell>
    <TableCell align="right" >
      <SubAdminEmailReslover subadminId={resellerRow.subadminRef} />
    </TableCell>
  </TableRow>
))}

        </TableBody>
      </Table>
    </TableContainer>
  );
}