import {React,useEffect,useRef,useState} from 'react';

import '../styles/Location.css'
import map from '../assets/images/map.png'
import jordan from '../assets/images/jordan.png'
import syria from '../assets/images/syria.png'

function Location() {
  const locationRef=useRef(null)
  const [anim,setAnim]=useState("")
 
  const checkVisibility = () => {
   if (locationRef.current) {
     const rect = locationRef.current.getBoundingClientRect();
     const isElementVisible = (
       rect.top >= 0 &&
       rect.left >= 0 &&
       rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
       rect.right <= (window.innerWidth || document.documentElement.clientWidth)
     );
     if(isElementVisible)
     {
      var e=document.getElementById("col1").children
      var e1=document.getElementById("col2").children
      e[0].style.animation="map-in 0.5s forwards"
       e[1].style.animation="map-in 1s forwards"
      
       e1[0].style.animation="img-text-in 0.7s forwards"
       e1[1].style.animation="location-text-in 1.2s forwards"
     }
   }
 };
 useEffect(() => {
  window.addEventListener('scroll', checkVisibility);
  window.addEventListener('resize', checkVisibility);
  
  // Initial check
  checkVisibility();

  return () => {
    window.removeEventListener('scroll', checkVisibility);
    window.removeEventListener('resize', checkVisibility);
  };
}, []);



  return (
    <div ref={locationRef} className="container-location">
       <div id='col1' className="column">
       <h1>Where do we operate</h1>

       <img src={map} alt="" />
       </div> 

       <div id='col2' className="column">
       <div className="row">
       <img src={syria} alt="" />
       <img src={jordan} alt="" />
       </div>
       <p>
        We are currently operating in all major cities in <span>Syria</span> and <span>Jordan.</span><br></br>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et perferendis quidem, magni aliquam provident, modi asperiores dolorum, reiciendis aut in illo incidunt. Eveniet modi numquam dolores dolorem totam maiores voluptas?</p>
       </div>

       
    </div>
  )
}
export default Location