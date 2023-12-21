import React, { useState , useEffect } from 'react'
import '../cssFiles/resultPage.css'
import { getWinner } from '../web3Client'
import Navbar from '../components/Navbar';


function ResultsPage() {

  const [winner,setWinner] = useState("");

  useEffect(() => {

    getWinner().then((winner) => {
      setWinner(winner);
    })
      },[]);
  
  return (
    <div className='resultPage'>
      <Navbar/>

    <h3>Winner of the Voting is</h3>
    <br></br>
    <br></br>
    <h2>{winner}</h2>

    </div>
  )
}

export default ResultsPage