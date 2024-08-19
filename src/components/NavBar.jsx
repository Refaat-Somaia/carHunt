import '../styles/NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import logo from "../assets/images/logo.png"
import { getAuth, signOut } from "firebase/auth";


function NavBar() {

  const [navBarDisplay,setnavBarDisplay]=useState("");
  const [userName,setuserName]=useState(localStorage.getItem("userName"));
  const [navBarAnimatioen,setNavBarAnimatioen]=useState("");
  

  const goToSignUp =() =>{
    window.location.href='/signUp'

  }
  const goToLogIn =() =>{
    window.location.href='/logIn'

  }
  const goToBrowse =() =>{
    window.location.href='/Browse'
  }
  const goToHome =() =>{
    window.location.href='/Home'
  }
  const logOut=()=>{

  localStorage.removeItem("userName")
  setuserName(null)

window.location.href='/Home'


  }
  function goToAccount(){
window.location.href='/Account'
    
  }

  function openNavBar(){
    if(navBarDisplay!='flex'){
      setNavBarAnimatioen('slide-in-nav')
    setnavBarDisplay('flex')
    
  }
    else{
      setNavBarAnimatioen('slide-out-nav')
setTimeout(function(){
    setnavBarDisplay('none')
  },200)


}
  }


  


  return (
    <><button onClick={openNavBar} className='openNav'><FontAwesomeIcon icon={faBars} style={{fontSize:'2rem',color:'#F99417'}}/></button>
    <div className="navBar">
        <img src={logo} alt="" />
        <button onClick={goToHome} className='navBtn'>Home</button>
        <button onClick={goToBrowse} className='navBtn'>Browse</button>
        <button className='navBtn'>Contact us</button>
        <button className='navBtn'>About</button>
        <button onClick={userName ?goToAccount:goToLogIn} style={{ backgroundColor: "#F99417", color: 'white' }} className='navBtn'>{userName ? userName : 'Log in'}</button>
        <button onClick={userName ?logOut :goToSignUp } className='navBtn'>{userName ? 'Log out' : 'Sign up'}
        </button>
      </div>

      <div className="navBarSide" style={{animationName:navBarAnimatioen,display:navBarDisplay}}>
        <button onClick={goToHome} className='navBtn'>Home</button>
        <button onClick={goToBrowse} className='navBtn'>Browse</button>
        <button className='navBtn'>Contact us</button>
        <button className='navBtn'>About</button>
        <button onClick={userName ?goToAccount:goToLogIn} style={{ backgroundColor: "#F99417", color: 'white' }} className='navBtn'>{userName ? userName : 'Log in'}</button>
        <button onClick={userName ?logOut :goToSignUp } className='navBtn'>{userName ? 'Log out' : 'Sign up'}
        </button>
      </div>
      
      
      </>


  );
}
export default NavBar;
