import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from "react";
import {useLocation} from 'react-router-dom';
function UserPage(){
    const location = useLocation();
    const data = location.state;
    console.log(data)
    return(

        <div>
            <h1>UserAccount:</h1>
            <h1>{data.accountName}</h1>
            <h1>{data.email}</h1>
            <h1>{data.password}</h1>
            <h1>{data.passwordCheck}</h1>

        </div>
    );
}

export default UserPage;