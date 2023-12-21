import React from 'react'
import Navbar from '../components/Navbar';
import '../cssFiles/home.css'

function Home() {
  return (
    <div className='home'> 
      <Navbar/>

      <h3>Welcome to the E-Voting App</h3> 
    </div>
  )
}

export default Home