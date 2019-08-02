import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import { Button } from 'reactstrap'


const Home = () => {
  return (
    <div className='home'>
    <div id="landing-header">
 		<h1>Welcome to A to Z experiences</h1>
		 <div className="home-buttons">
      <Button className='btn-home' color="info" size="lg"><Link to='/login'>Log In</Link></Button>
      <Button className='btn-home' color="info" size="lg"><Link to='/register'>Sign Up</Link></Button>
     </div>
    </div>
    
    <ul className="slideshow">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    </div>
  );
};

export default Home;


