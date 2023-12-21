import React , {useState , useEffect } from 'react'
import '../cssFiles/admin.css'
import NavbarAdmin from '../components/NavbarAdmin';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { getCandidates } from '../web3Client'
import { Button } from '@mui/material';

function createData(index , name,party, votes) {
  return { index , name, party,votes};
}

let temprows = [];

function AdminResultsPage() {

  const [rows,setRows] = useState([]);

  useEffect(() =>{

    console.log("useeffect called");
    getCandidates().then((candidatesList) => {
      for ( let i =0 ;i< candidatesList.length ; i++){
        
          // Call API here to get party of the candidate here
          // Replace `party` with actual party of the candidate 

        temprows.push(createData(i,candidatesList[i][0],"party",candidatesList[i][1]));
      }
    });
      setRows(temprows);
      //console.log(rows);
  },[]);


  function refreshPage() {

    let temp = rows;
    setRows([...rows]);
    console.log(rows);

  }


  return (
    <div className='admin'>
        <NavbarAdmin />
        <h4>List of candidates with their votes :</h4>
        <TableContainer component={Paper} className ="table" >
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Party</TableCell>
            <TableCell align="left">Votes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.party}</TableCell>
              <TableCell align="left">{row.votes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br></br>
    <Button onClick={refreshPage} variant='contained' size='small'>Refresh</Button>
        
        </div>
  )
}

export default AdminResultsPage