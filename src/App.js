import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import React, {Component, useState} from "react";
import './App.css';
import Login from './pages/Login';
import {Route,Routes,Redirect} from 'react-router-dom';
import Register from './Components/Register';
import UserPage from './pages/UserPage';
import Events from './pages/Event';
import Friends from './pages/Friends';
import Marketplace from './pages/Marketplace';
import Home from './pages/Home';

function App() {
    const[isAuth,setIsAuth] = useState(false);
  return (
    

    <div className="App">
      <Routes>
          <Route path = '/' element = {<Login setIsAuth={setIsAuth}/>}/>
          <Route path = '/register' element = {<Register/>}/>
          <Route path = '/userpage' element = {<UserPage/>}/>
          <Route path = '/events' element = {<Events/>}/>
          <Route path = '/friends' element = {<Friends/>}/>
          <Route path = '/marketplace' element = {<Marketplace/>}/>
          <Route path = '/home' element = {<Home/>}/>
      </Routes>        
    </div>
    
  );
}

export default App;
