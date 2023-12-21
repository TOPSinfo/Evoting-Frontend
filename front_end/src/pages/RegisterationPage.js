import React , { useState , useEffect }  from 'react'
import '../cssFiles/registration.css'
import { Stack , TextField , Button } from '@mui/material';
import { init, isApproved , changePhase } from '../web3Client.js'
import Navbar from '../components/Navbar';



function RegisterationPage(){

  useEffect(() => {
    
      init().then( (account) =>{
        setWalletAddress(account);
      })
     
      
    ;},[]);

  const [aadhar,setAadhar] = useState("");
  const [voterId,setvoterId] = useState("");
  const [age,setAge] = useState("");
  const [walletAddress,setWalletAddress] = useState("");
  const [responseVal,setResponse] = useState(true);


  function checkAadhar(event){
    setAadhar(event.target.value);
  }
  function checkVoterId(event){
    setvoterId(event.target.value);
  }
  function checkAge(event){
    setAge(event.target.value);
  }

    function verifyUser() {

      isApproved("123456",walletAddress).then( (resp) => {
        console.log(resp);
        setResponse(resp);

        if (resp){

          //call API here to save data to DB

        }


      })
    }


  return (
    <div className='registration'>
      <Navbar/>
      <Stack spacing={2}>
        <h3 className='headerText'>Please Enter your Adhar No., Voter Id and Age for Registeration</h3>
        <br></br>
        <TextField label = "Adhar no." variant='outlined' className='headerText'
        onChange={checkAadhar}
         ></TextField>
          <TextField label = "Voter Id" variant='outlined' className='headerText'
        onChange={checkVoterId}
         ></TextField>
      </Stack>
      <br></br>
      <TextField label = "Age" variant='outlined' className='headerText age' onChange={checkVoterId}></TextField>
      <br></br>
      <br></br>
      <Button variant="contained" size = "small" onClick={verifyUser} >Submit</Button>
      <br></br>
      <p>Connected to wallet account :  {walletAddress}</p>
    </div>
  )
}


export default RegisterationPage