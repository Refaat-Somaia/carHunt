import {useState,useEffect,useRef,react} from 'react'
import '../styles/Cards.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faDollarSign, faTruck } from '@fortawesome/free-solid-svg-icons'



function Cards() {

 const cardsRef=useRef(null)
 const [anim,setAnim]=useState("")

 const checkVisibility = () => {
  if (cardsRef.current) {
    const rect = cardsRef.current.getBoundingClientRect();
    const isElementVisible = (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
    if(isElementVisible)
    {
      var e=document.getElementsByClassName("cards-container")[0].children

      for(let i=0;i<e.length;i++){
        e[i].style.animation=`cards-in ${"0."+(i+6)}s forwards`
      }
    }
  }
};



useEffect(() => {
  if(window.innerWidth>1240){
  window.addEventListener('scroll', checkVisibility);
  window.addEventListener('resize', checkVisibility);
  
  // Initial check
  checkVisibility();

  return () => {
    window.removeEventListener('scroll', checkVisibility);
    window.removeEventListener('resize', checkVisibility);
  };}
  else{
    var e=document.getElementsByClassName("cards-container")[0].children

    for(let i=0;i<e.length;i++){
      e[i].style.opacity=1
    }
  }
}, []);

  return (
    <>
    
    <div ref={cardsRef} className='cards-container'>
    <div className='card'>
    <FontAwesomeIcon className='card-icon' icon={faCircleCheck} />
    <span className='card-span'>Top condition cars</span>
    <p className='card-p'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui iusto dicta sapiente ex ducimus quos debitis fugit sit. Voluptatem repudiandae suscipit quis eum, commodi voluptas deleniti iste obcaecati doloremque recusandae!</p>
    </div>
    <div className='card'>
    <FontAwesomeIcon className='card-icon' icon={faTruck} />
    <span className='card-span'>The car comes to you</span>
    <p className='card-p'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui iusto dicta sapiente ex ducimus quos debitis fugit sit. Voluptatem repudiandae suscipit quis eum, commodi voluptas deleniti iste obcaecati doloremque recusandae!</p>
    </div>
    <div className='card'>
    <FontAwesomeIcon className='card-icon' icon={faDollarSign} />
    <span className='card-span'>Competitve prices</span>
    <p className='card-p'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui iusto dicta sapiente ex ducimus quos debitis fugit sit. Voluptatem repudiandae suscipit quis eum, commodi voluptas deleniti iste obcaecati doloremque recusandae!</p>
    </div>
    
    </div>
    
    </>
  )
}

export default Cards