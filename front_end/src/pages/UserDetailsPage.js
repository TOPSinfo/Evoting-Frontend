import React from 'react'
import Navbar from '../components/Navbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import '../cssFiles/userDetailsPage.css'


function UserDetailsPage (){


  ///call API here to get user details from DB and pass the data to `user` variable

  let user  = { name : "username" , 
            age : 25 , 
            email : "ajay@gmail.com",
            voter_id : "123123",
            Aadhar_no : "123123123123",
            wallet_add : "0xakjnjkfanj234nk2j4h242j342b34kmakds123",
            is_approved : " YES " }
  return (
    <div className='userDetails'>
      <Navbar/>
      <h3>User Details</h3>
      <br></br>
      <TableContainer component={Paper}  >
      <Table sx={{ minWidth: 500}} aria-label="simple table" >
        <TableBody>
            <TableRow>
              <TableCell variant="head">Name:</TableCell>
              <TableCell align="left">{user.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant='head'>Email:</TableCell>
              <TableCell align="left">{user.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant='head'>Age:</TableCell>
              <TableCell align="left">{user.age}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant='head'>Aadhar No.:</TableCell>
              <TableCell align="left">{user.Aadhar_no}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant='head'>Voter ID:</TableCell>
              <TableCell align="left">{user.voter_id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant='head'>Wallet Address:</TableCell>
              <TableCell align="left">{user.wallet_add}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant='head'>Approved:</TableCell>
              <TableCell align="left">{user.is_approved}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer></div>
  )
}

export default UserDetailsPage