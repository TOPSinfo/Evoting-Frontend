import React, { useState, useEffect } from 'react'
import '../cssFiles/admin.css'
import NavbarAdmin from '../components/NavbarAdmin';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BASE_EVOTE_URL } from '../helper/constants';


function createData(name, age, party, qualification) {
  return { name, age, party, qualification };
}


function AdminCandidateListPage() {

  const [rows, setRows] = useState([]);

  useEffect(() => {

    const baseUrl = "http://127.0.0.1:8000/api/v1/";

    const response = async () => {
      console.log("calling api")
      let result = await fetch(BASE_EVOTE_URL + "candidate/list/", {
        method: "GET"
      });

      const jsonRes = await result.json();
      console.log("res:", result.status);
      console.log("res1:", jsonRes);

      if (result.status === 200) {
        let temprows = [];
        for (let i = 0; i < jsonRes.length; i++) {
          temprows.push(createData(jsonRes[i]["full_name"], jsonRes[i]["age"], jsonRes[i]["party_name"], jsonRes[i]["qualification"]));
        }
        setRows(temprows);
      } else {
        // !showError && setShowError(true);
        // setErrorMsg(jsonRes['detail']);
      }
    };

    response();

  }, []);


  return (
    <div className='admin'>
      <NavbarAdmin />
      <br></br>
      <h4>List of candidates who are participating in the voting:</h4>
      <TableContainer component={Paper} className="table" >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Party</TableCell>
              <TableCell align="right">Qualification</TableCell>
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
                <TableCell align="right">{row.age}</TableCell>
                <TableCell align="right">{row.party}</TableCell>
                <TableCell align="right">{row.qualification}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>



    </div>
  )
}

export default AdminCandidateListPage