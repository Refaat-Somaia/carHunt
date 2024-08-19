import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import '../styles/Hero.css';


function Hero() {
  const goToBrowse =() =>{
    window.location.href='/Browse'
  }
  return (
    
    
    <div className='hero'>
        <div className='hero-left'>

<img className='hero-bg' src="../assets/images/hero.png"></img>
<img className='hero-car' src="../assets/cars-imgs/Genesis G70-rotated.png" ></img>
</div>
      <div className='hero-right'>
        <h2 className='hero-text'>Car Hunt</h2>
        <p className='hero-p'>Browse, select, and rent a car easily and smoothly.</p>
        <div className='hero-btn' onClick={goToBrowse}><p style={{top:'1rem',position:'relative'}}>Book now!</p>
        <button className='hero-btn1'><FontAwesomeIcon className='icon' icon={faMagnifyingGlass} 
        /></button>
          </div>
    

        </div>
        
    </div>
  )
}

export default Hero