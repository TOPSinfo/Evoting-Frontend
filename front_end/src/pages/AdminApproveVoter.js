import React, { useState } from 'react'
import '../cssFiles/admin.css'
import NavbarAdmin from '../components/NavbarAdmin';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';
import { approveVoter } from '../web3Client'

function AdminApproveVoter() {

  let rows = [{ name: "user1", aadhar: "723942012309123", voterId: "8234234", age: "24" },
  { name: "user2", aadhar: "345436309123322", voterId: "2343234", age: "29" },
  { name: "user3", aadhar: "898778012309123", voterId: "8784234", age: "40" }]


  let address = "0x332489EE672B4Dd6a7f9fa1857D99B6fb6A4EA03";
  const [aadhar, setAadhar] = useState();
  const [isApproved, setIsApproved] = useState(false);

  function getAadhar(event) {
    setAadhar(event.target.value);
  }

  function verifyUser() {
    approveVoter(address, aadhar).then((resp) => {
      setIsApproved(resp);

      if (resp) {

        // call API here
      }

    })

  }

  return (
    <div className='admin'>
      <NavbarAdmin />
      <h3>Approve the following users for voting</h3>
      <TableContainer component={Paper} className="table" sx={{ width: 550 }}>
        <Table sx={{ width: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Aadhar</TableCell>
              <TableCell align="left">Voter ID</TableCell>
              <TableCell align="left">Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.aadhar}</TableCell>
                <TableCell align="left">{row.voterId}</TableCell>
                <TableCell align="left">{row.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <h4>Paste the Aadhar no of the user that you want to approve</h4>
      <TextField variant='outlined' label='Aadhar no.' className="textField" onChange={getAadhar}>

      </TextField>
      <br></br>
      <br></br>
      <Button variant='contained' size='small' onClick={verifyUser}>Approve</Button>
      <br></br>
      <h5>{isApproved ? "Voter Approved successfully" : ""}</h5>
    </div>
  )
}

export default AdminApproveVoter