import React, { useState, useEffect } from 'react'
import '../cssFiles/admin.css'
import NavbarAdmin from '../components/NavbarAdmin';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from '@mui/material';
import { getVotingPhase, changePhase } from '../web3Client'


function AdminChangeVotingPhase() {

  const [currentPhase, setcurrentPhase] = useState("");
  const [selectedVotingPhase, setSelectedVotingPhase] = useState("");
  const [isPhaseChanged, setPhaseChanged] = useState(false);



  useEffect(() => {
    getVotingPhase().then((phase) => {
      setcurrentPhase(phase);
    })

  }, [isPhaseChanged])


  function getPhase(event) {
    setSelectedVotingPhase(event.target.value);
  }


  function changeVotingPhase(event) {
    let phase;
    if (selectedVotingPhase == "Registration") phase = 0;
    if (selectedVotingPhase == "Voting") phase = 1;
    if (selectedVotingPhase == "Closed") phase = 2;

    changePhase(phase).then((resp) => {

      console.log(resp);
      setPhaseChanged(resp);

      if (resp) {

        // call API here
      }


    }).catch((error) => {
      console.log(error.message);
    });

  }

  return (
    <div className='admin'>
      <NavbarAdmin />
      <h4>Current Phase is :  {currentPhase}</h4>
      <FormControl className='table'>
        <FormLabel className='table' >Select Voting Phase</FormLabel>
        <RadioGroup onChange={getPhase} value={selectedVotingPhase}>
          <FormControlLabel value="Registration" control={<Radio />} label="Registration"
          />
          <FormControlLabel value="Voting" control={<Radio />} label="Voting"
          />
          <FormControlLabel value="Closed" control={<Radio />} label="Closed"
          />
        </RadioGroup>
      </FormControl>
      <br></br>
      <br></br>
      <Button variant='contained' color='primary' size='small' onClick={changeVotingPhase}>Submit</Button>

      <h5> {isPhaseChanged ? 'Phase changed successfully' : ''}</h5>
    </div>
  )
}

export default AdminChangeVotingPhase