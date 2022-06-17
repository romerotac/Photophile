import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from "react";
import {useLocation} from 'react-router-dom';
import Navigation from '../Components/Navigation';

function UserPage(){
    //const location = useLocation();
    //const data = location.state;
    //console.log(data)
    return(
        <>
        <Navigation/>        
        <div>
            <h1>UserAccount:</h1>
            

        </div>
        </>
    );
}

export default UserPage;