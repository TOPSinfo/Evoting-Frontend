import React, { useState , useEffect } from 'react'
import Candidates from '../components/candidates'
import '../cssFiles/votingPage.css'
import { Stack } from '@mui/material'
import Navbar from '../components/Navbar';
import { getVotingPhase } from '../web3Client'



function VotingPage () {

  // call API here to get Candidate list with their details and add it to `candidateList`

  let candidatesList = [{ candidateName : "candidate1",party : "XYZ" , age : "40"},
                      {candidateName : "candidate2",party : "ABC" , age : "45"}]

  const [voteDone,setVoteDone] = useState(false);
  const [currentPhase,setcurrentPhase] = useState("");


  useEffect(() => {
    getVotingPhase().then((phase) => {
      setcurrentPhase(phase);
    })

  },[])


  return (
    <div className='voting'>
      <Navbar/>
      <h3>{currentPhase == "Voting" ? "Please choose your Candidate": "Voting Not started yet"}</h3>
      <br></br>
      {currentPhase == "Voting" &&
      <Stack direction="row" >
        {candidatesList.map((candidate) => (
        <Candidates pos = {candidatesList.indexOf(candidate)} candidateName = {candidate.candidateName} party = {candidate.party} age = {candidate.age} handler = {setVoteDone} />
        ))}
        </Stack>
      }
  

      

      <h5></h5>

    </div>
  )
}

export default VotingPage