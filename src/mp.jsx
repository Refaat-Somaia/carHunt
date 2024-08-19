import React from 'react';
import NavBar from './components/NavBar';
import MainPage from './components/Cars';
import {Route,Routes,BrowserRouter} from 'react-router-dom'
function Mp() {
  return (
    <>

    <NavBar />
    <MainPage />
    </> 
  )
}

export default Mp