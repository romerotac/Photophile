import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import React, {Component, useState} from "react";
import './App.css';
import Login from './pages/Login';
import {Route,Routes,Redirect} from 'react-router-dom';
import Register from './Components/Register';
//import UserPage from './pages/UserPage';
import Events from './pages/Event';
import Friends from './pages/Friends';
import Marketplace from './pages/Marketplace';
import Home from './pages/Home';
import UploadPost from './Components/UploadPost';
import Test from './pages/test';
import Test1 from './pages/test1';
import Test2 from './pages/test2';
import {Provider} from 'react-redux';
import {store} from './reduxFiles/store';


const Userpage = React.lazy(() => import ('./pages/UserPage'));

function App() {
    const[isAuth,setIsAuth] = useState(false);
  return (
    <Provider store = {store}>

    <div className="App">
      <Routes>
          <Route path = '/' element = {<Login setIsAuth={setIsAuth}/>}/>
          <Route path = '/register' element = {<Register/>}/>
          <Route path = '/userpage' element = {
            <React.Suspense fallback={<><h1>Loading...</h1></>}>
              <Userpage/>
            </React.Suspense>
          
          }/>
          <Route path = '/events' element = {<Events/>}/>
          <Route path = '/friends' element = {<Friends/>}/>
          <Route path = '/marketplace' element = {<Marketplace/>}/>
          <Route path = '/home' element = {<Home/>}/>
          <Route path = '/upload' element = {<UploadPost/>}/>
          <Route path = '/test' element = { <Test/>}></Route>
          <Route path = '/test/1' element = { <Test1/>}></Route>
          <Route path = '/test/2' element = {<Test2/>}/>
      </Routes>         
    </div>
    </Provider>
  );
}

export default App;
