import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import React, {useState} from "react";
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import {Route,Routes,Redirect} from 'react-router-dom';


function App() {
  return (
    

    <div className="App">
      <Routes>
          <Route path = '/' element = {<Login/>}/>
          <Route path = '/Register' element = {<Register/>}/>
  
      </Routes>
    </div>
    
  );
}

export default App;
