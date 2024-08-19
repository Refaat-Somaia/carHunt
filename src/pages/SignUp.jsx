import React, { useEffect, useState } from 'react'
import '../styles/SignUp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faEye } from '@fortawesome/free-solid-svg-icons'
import { app } from "../firebase";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword  } from "firebase/auth";
import { getFirestore,doc, setDoc,getDoc } from "firebase/firestore";



const SignUp = (props) => {

  const [records,setRecords]=useState("")
  const [email,setEmail]=useState("")
  const [firstName,setFirstName]=useState("")
  const [lastName,setLastName]=useState("")
  const [password,setPassword]=useState("")
  const [passwordConfirm,setPasswordConfirm]=useState("")
  const [address,setAddress]=useState("")
  const [phone,setPhone]=useState("")
  const [showPassword,setShowPassord]=useState(false)
  const [anim,setAnim]=useState("")
  const [alertText,setalertText]=useState("")
  const auth = getAuth();
  const [logInDisplay,setLogInDisplay]= useState("none")
  const db = getFirestore(app);


  useEffect(()=>{
  if(props.logIn){
    swapForms()
  }
},[])
  


  function isEmailValid() {

    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email)) {
      
    return false;
 }
 return true
}
  
  function showAlert(){
    document.getElementById("alert").style.display="block"

    setAnim("alert-in 1s forwards")
    setTimeout(function(){
    setAnim("alert-out 1s forwards")
    },4000)
  }

  function validateForm(){
    if(firstName.length===0||password.length===0||email.length===0||address.length===0){
      setalertText("please fill all fields")
      showAlert()
    return false
  }
  else if(!isEmailValid()){
    setalertText("Please provide a valid email")
    showAlert()
    return false
  }
  else if(password!==passwordConfirm){
    document.getElementById("alert").style.display="block"
      setalertText("Incorrect password confirm")
   showAlert()
    return false
  }
  return true
  }

  function submitSignUpForm(e){
    if(validateForm())
createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
   
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid),{
      firstName: firstName,
      lastName:lastName,
      phoneNumber:phone,
      address:address
    });
    localStorage.setItem("userName",firstName)
    localStorage.setItem("userAddress",address)
    window.location.href='/Home'
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if(errorMessage==="Firebase: Error (auth/email-already-in-use)."){
    setalertText("This email is already used")
  showAlert()
  }
  });
    e.preventDefault()
    
  }

  function swapForms(){
    
    if(logInDisplay==="none"){
      setLogInDisplay('block')
    document.getElementById("logInForm").style.animation='slide-in 1.1s forwards'
    document.getElementById("signUpForm").style.animation='slide-out 1.1s forwards'
  }
  else{
    setTimeout(function(){
    setLogInDisplay('none')
    },1100)
    document.getElementById("signUpForm").style.animation='slide-in 1.1s forwards'
    document.getElementById("logInForm").style.animation='slide-out 1.1s forwards'
  }
}

function submitLogInForm(e){
  e.preventDefault()
  if(email.length===0||password.length===0)
  {setalertText("Please fill all fields")
  document.getElementById("alert").style.display="block"

  showAlert()
  }
  else if(!isEmailValid()){
    setalertText("Please provide a valid email")
    showAlert()
  }
  else{
  document.getElementById('blurBg').style.display='block'

    signInWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {

    const user = userCredential.user;
    const docRef = doc(db, "users", user.uid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  document.getElementById('blurBg').style.display='none'

  localStorage.setItem("userName",docSnap.data().firstName)
  localStorage.setItem("userAddress",docSnap.data().address)
  window.location.href='/Home'
}
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    if(errorMessage==="Firebase: Error (auth/invalid-credential).")
    {
  document.getElementById('blurBg').style.display='none'

      setalertText("invalid credentials")
      showAlert()
    }
  });
  }

}
function resetPassword(){
  document.getElementById('blurBg').style.display='block'
  document.getElementById('resetEmail').style.display='block'
  

}
function closeResetPassword(){
  document.getElementById('blurBg').style.display='none'
  document.getElementById('resetEmail').style.display='none'
  

}

function sendResetLink(){


}
function showPasswordSwap(){
  setShowPassord(!showPassword)
}
      
   
  return (
    <>
    <div id="blurBg" onClick={closeResetPassword}>
    <span className="loader"></span>
      </div>
      <div id='resetEmail' className="reset-email">
        <p>We will send a link to your email so you can reset your password</p>
      <input onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' className='signUp-input' type='text'></input>
      <button onClick={sendResetLink} className='signUp-input' >Send link</button>


    </div>
    <div style={{animation:anim}} id="alert">
    <FontAwesomeIcon className='icon' icon={faCircleExclamation} />
    <p>{alertText}</p>
    </div>
    <form id='signUpForm' className='container-signUp' onSubmit={submitSignUpForm}> 
      <h2 >Sign up</h2>
      <input onChange={(e)=>{setFirstName(e.target.value)}} placeholder='First name' className='signUp-input' type='text'></input>
      <input onChange={(e)=>{setLastName(e.target.value)}}  placeholder='Last name' className='signUp-input' type='text'></input>
      <input onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' className='signUp-input' type='text'></input>
      <input onChange={(e)=>{setPhone(e.target.value)}}  placeholder='Phone number' className='signUp-input' type='number'></input>

      <input onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' className='signUp-input' type= {showPassword ? "text" : "password"}></input>
      <FontAwesomeIcon onClick={showPasswordSwap} style={{position:'absolute',marginTop:"1.7rem",marginLeft:"-3.5rem"}} 
    className='icon' icon={faEye} />

      <input onChange={(e)=>{setPasswordConfirm(e.target.value)}} placeholder='Confirm password' className='signUp-input' type='password'></input>
      <input id='city' placeholder='City' className='signUp-input' type=''></input>
      <input onChange={(e)=>{setAddress(e.target.value)}} id='adress' placeholder='Address' className='signUp-input' type='text'></input>
      <button type='submit' className='signUp-input' >Sign up</button>
      <p className='ref2' style={{opacity:0.5}}>Already have an account?</p>
      <a onClick={swapForms} className='ref'>Log in</a>
      
    </form>

    <form style={{display:logInDisplay}} id='logInForm' className='container-signUp' onSubmit={submitLogInForm}> 
      <h2 >Log in</h2>
      <input onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' className='signUp-input' type='text'></input>
      <input onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' className='signUp-input' type={showPassword?"text":"password"}></input>
      <FontAwesomeIcon onClick={showPasswordSwap} style={{position:'absolute',marginTop:"1.7rem",marginLeft:"-3.5rem"}} 
    className='icon' icon={faEye} />
      <button type='submit' className='signUp-input' >Log in</button>
      <p className='ref2' style={{opacity:0.5}}>Don't have an account?</p>
      <a onClick={swapForms} className='ref'>Sign up</a>
      <p onClick={resetPassword} className='ref'>Reset password</p>
      
    </form>
    
    </>
  )
}

export default SignUp
