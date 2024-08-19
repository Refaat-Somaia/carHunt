import React from 'react'
import Home from '../pages/Home'
import Browse from '../pages/Browse'
import NavBar from './NavBar';
import {Route,Routes, BrowserRouter as Router} from 'react-router-dom'
import SignUp from '../pages/SignUp';
import CarDetails from '../pages/CarDetails';
import Account from '../pages/Account';
function App() {
  return (
    <><NavBar />
         <Router>
    <Routes>
    <Route  path="/signUp" element={<SignUp />} />
    <Route  path="/logIn" element={<SignUp logIn={true} />} />
    <Route  path="/home" element={<Home/>}/>
    <Route  path="/Account" element={<Account/>}/>
    <Route  path="/browse" element={<Browse/>}/>
    <Route path='/CarDetails' element={<CarDetails/>}/>
    <Route path="*" element={<Home/>}/> 
      </Routes>
      </Router></>
  )
}

export default App