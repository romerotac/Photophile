import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import React, {useState} from "react";
import './App.css';
import Login from './Login';
import {Route,Routes} from 'react-router-dom';


function App() {
  return (
    

    <div className="App">
      <Routes>
      <Route path = '/' element = {<Login/>}/>
      </Routes>
    </div>
    
  );
}

export default App;
