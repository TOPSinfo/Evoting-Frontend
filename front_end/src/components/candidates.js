import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { castVote , init } from '../web3Client';
import { useEffect , useState } from 'react';
import logoImage from '../assets/person.jpg'
import '../cssFiles/card.css'


const Candidates = (props) => {

    const [aadhar,setAadhar] = useState("");
    const [walletAddress,setWalletAddress] = useState("");

    function vote(){
        console.log(props.pos);
        castVote(props.pos,"123456").then((resp) =>{

            console.log(resp);
            props.setVoteDone(resp);
        })
    }

    useEffect(() => {
    
        init().then( (account) =>{
          setWalletAddress(account);
        })
      ;},[]);
  
    


  return (
    <div>

      <Card sx={{ maxWidth: 200,
                margin:5,
                width: 150, height : 270 }}>
      <CardMedia 
        component="img"
        height="110"
        image={logoImage}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.candidateName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.party}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.age}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' onClick={vote} className="card__actions">Vote</Button>
      </CardActions>
    </Card>

    </div>
  )
}

export default Candidates