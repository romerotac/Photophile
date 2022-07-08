import { Button } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import Register from '../Components/Register';

import { signInWithPopup } from 'firebase/auth';
import { auth,provider } from '../firebase';
import { addDoc,collection, Firestore, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { FirebaseError } from 'firebase/app';
import { async } from '@firebase/util';


import { useDispatch } from 'react-redux';
import {editProfile} from '../reduxFiles/actions'
//import {Link} from "react-router-dom";
//import fontawesome from '@fortawesome/fontawesome-common-types'
//import FontAwesomeIcon from '@fortawesome/react-fontawesome';
//import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid'

//fontawesome.library.add(faCheckSquare, faCoffee);

const styleForm = {
    width: '23rem',
    margin:"auto"
    
};


function Login({setIsAuth}){

    //use to activate the sotrage of data in changeProfileOnClick
    const dispatch = useDispatch();
    
    const [showModal, setShowModal] = useState(false);
    
    // creating state to contain the user data
    const [account,setAccount] = useState([]);
    
    //tryOne
    const [profile,setProfile] = useState([]);

    // Creating collection for account user
    const postsCollectionRef = collection(db, 'accounts');
    const profileCollectionRef = collection(db, 'profile');
    //getting the data on collection to the account
    useEffect(() => {
        const getAccount = async () => {
            /** 
            const data = await getDocs(postsCollectionRef)
            setAccount(data.docs.map((doc) => ({ ...doc.data(), })));
            */
            const  data2 = await getDocs(profileCollectionRef)
            setProfile(data2.docs.map((doc) => ({...doc.data(), })));
        };
        getAccount();
    },[]);
    
    //function that check if the user it's already in the database
    function checkUserinDatabase(data){
    for (let i = 0; i < account.length; i++){

        if (data === account[i].id){
            return;
        } else {
            addUser();
        }
    }
    }
    

    //sign in with google
    let navigate = useNavigate();
    const signInWithGoogle = () =>{
        signInWithPopup(auth,provider).then((result) => {
            localStorage.setItem("isAuth",true);
            setIsAuth(true);
            checkUserinDatabase(auth.currentUser.uid);
            console.log(profile[0].name);
            dispatch(editProfile(profile[0].name));
            navigate('/userpage');
        })
    }
    
        
    const addUser = async () =>{
        await addDoc(postsCollectionRef, {id:auth.currentUser.uid,name: auth.currentUser.displayName,email:auth.currentUser.email});
        await addDoc(profileCollectionRef, {id:auth.currentUser.uid,name:auth.currentUser.displayName,state:'',email:auth.currentUser.email,favoriteCamera:'', profileImgPath:'',social:{website:'',twitter:'',instagram:'',facebook:'',pinterest:''}});
    }


    
    function showModalHandler(){
        setShowModal(true);
    }

    function closeModalHandler(){
        setShowModal(false);
    }

    //console.log(showModal)
    

    /*
     onClick= {showModalHandler}
     {<Register onOpen = {showModal}/>} 

    */
    return(

        <section className = "vh-100">
            <div className="container-fluid">
                <div className = "row">
                    <div className="col-sm 6 text-black">
                        
                            <div className='px-5 ms-xl-4'>
                                
                                    <img src='/images/logo.png' style={{height:'200px', width:"200px"}}></img>
                                
                            </div>
                            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

                                <form style={styleForm}>
                                    <h3 className="fw-normal mb-3 pb-3">Log in</h3>
                                    
                                    <div className="form-outline mb-4">
                                        <label className="form-label float-start" htmlFor='emailInput'>Email address:</label>
                                        <input type={'email'} className = "form-control form-control-lg" id='emailInput'></input>
                                        
                                    </div>
                                    
                                    <div className="form-outline mb-4">
                                        <label className="form-label float-start" htmlFor='passwordInput'>Password:</label>
                                        <input type={'password'} className = "form-control form-control-lg" id = "passwordInput"></input>
                                    </div>

                                    <div className='pt-1 mb-4'>
                                        <button className='btn btn-info btn-lg btn-block' typeof='button' style={{color:"white"}}>Login</button>
                                    </div>

                                    <p className="small mb-5 pb-lg-2"><a className='text-muted'>Forgot password?</a></p>
                                    <p>Don't have an account?<button typeof = "button" className = "btn btn-info btn-lg btn-block"  onClick= {showModalHandler}> Register here!</button></p>
                                    
                                    <button type='button' className='btn-google' onClick={signInWithGoogle}>Sign in with Google</button>

                                </form>
                            </div>
                            
                            </div>
                            <div className='col-sm-6 px-0 d-none d-sm-block'>
                                <img src="/images/photographer.jpg" alt = "Login image" className='w-100 vh-100' style={{objectFit:"cover", objectPosition:"right"}}></img>
                            
                            </div>
                </div>
                 
                
            </div>
            {<Register onOpen = {showModal}/>} 
            
        </section>
        
    );
        
}

export default Login;
