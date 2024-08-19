import {React,useEffect,useRef,useState} from 'react';
import '../styles/Steps.css'


function Steps() {
    const stepsRef=useRef(null)
    const [anim,setAnim]=useState("")
   
    const checkVisibility = () => {
     if (stepsRef.current) {
       const rect = stepsRef.current.getBoundingClientRect();
       const isElementVisible = (
         rect.top >= 0 &&
         rect.left >= 0 &&
         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
         rect.right <= (window.innerWidth || document.documentElement.clientWidth)
       );
       if(isElementVisible)
       {
         var e=document.getElementsByClassName("container-steps")[0].children
   
            e[0].style.animation=`steps-in 0.4s forwards`
            e[1].style.animation=`steps-in 0.7s forwards`
            e[2].style.animation=`steps-in 1.1s forwards`
            e[3].style.animation=`steps-in 1.5s forwards`
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
    return(
    <div ref={stepsRef} className="container-steps">
        <h1>Renting a car is as easy as</h1>
        <div className="step">
            <div className="number">
                1
            </div>

            <div className="text">
                Log in or create an account
            </div>
        </div>

        <div className="step">
            <div className="number">
                2
            </div>

            <div className="text">
            Selecting a car

                
            </div>
        </div>

        <div className="step">
            <div className="number">
        3
            </div>

            <div className="text">
            Selecting the booking date and address

            </div>
        </div>
    </div>
    
    )

}
export default Steps