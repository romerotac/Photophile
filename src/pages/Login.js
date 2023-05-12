import { Button } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import Register from '../Components/Register';

import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth,provider } from '../firebase';
import { addDoc,collection, Firestore, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { FirebaseError } from 'firebase/app';
import { async } from '@firebase/util';
import { useDispatch } from 'react-redux';
import {editProfile} from '../reduxFiles/actions'

const styleForm = {
    width: '23rem',
    margin:"auto"
    
};

function Login({setIsAuth}){

    //use to activate the sotrage of data in changeProfileOnClick
    const dispatch = useDispatch();
    
    const [values,setValues] = useState({
        email:'',
        password:''
    });

    // creating state to contain the user data
    const [account,setAccount] = useState([]);
    
    //tryOne
    const [profile,setProfile] = useState([]);

    // Creating collection for account user
    const accountsCollectionRef = collection(db, 'accounts');
    
    //getting the data on collection to the account
    useEffect(() => {
        const getAccount = async () => {
             
            const data = await getDocs(accountsCollectionRef)
            .then(response => {
                const prf = response.docs.map(doc => ({
                    data:doc.data(),
                    id:doc.id
                }))
                setAccount(prf)
            })
            
        };
        getAccount();
    },[]);
    
    

    //function that check if the user it's already in the database
    function checkUserinDatabase(data){
        var isEqual = account.some((ref) => {
            return ref.data.id == data
        })
        console.log(isEqual)
        if (isEqual != true){
            addUser()
        }
    }

    

    //sign in with google
    let navigate = useNavigate();
    const signInWithGoogle = () =>{
        signInWithPopup(auth,provider).then((result) => {
            localStorage.setItem("isAuth",true);
            setIsAuth(true);
            checkUserinDatabase(auth.currentUser.uid);
            localStorage.setItem('userID', auth.currentUser.uid)
            navigate('/userpage');
        })
    }

    const signInEmailPassw = (e) =>{
        e.preventDefault()
        signInWithEmailAndPassword(auth, values.email, values.password)
        .then(() => {
            checkUserinDatabase(auth.currentUser.uid);
            console.log(values.email)
            localStorage.setItem('userID', JSON.stringify(auth.currentUser.uid))
            navigate('/userpage')
            
        })
    }
    
        
    const addUser = async () =>{
        await addDoc(accountsCollectionRef, {id:auth.currentUser.uid,name: auth.currentUser.displayName,email:auth.currentUser.email,favoriteCamera:'',state:'', profileImgPath:'',social:{website:'',twitter:'',instagram:'',facebook:'',pinterest:''}});
    }
    const updateField = event =>{
        setValues({
          ...values,
          [event.target.name]: event.target.value
        
        });
    }

    return(

        <section className = "vh-100">
            <div className="container-fluid">
                <div className = "row">
                    <div className="col-sm 6 text-black">
                        
                            <div className='px-5 ms-xl-4'>
                                
                                    <img src='/images/logo.png' style={{height:'200px', width:"200px"}}></img>
                                
                            </div>
                            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5" style={{flexFlow:'column'}}>

                                <form style={styleForm} onSubmit={signInEmailPassw}>
                                    <h3 className="fw-normal mb-3 pb-3">Log in</h3>
                                    
                                    <div className="form-outline mb-4">
                                        <label className="form-label float-start" htmlFor='emailInput'>Email address:</label>
                                        <input type={'email'} className = "form-control form-control-lg" name='email' onChange={updateField}></input>
                                        
                                    </div>
                                    
                                    <div className="form-outline mb-4">
                                        <label className="form-label float-start" htmlFor='passwordInput'>Password:</label>
                                        <input type={'password'} className = "form-control form-control-lg" name = "password" onChange={updateField}></input>
                                    </div>

                                    <div className='pt-1 mb-4'>
                                        <button className='btn btn-info btn-lg btn-block' typeof='button' style={{color:"white"}} type = "submit">Login</button>
                                    </div>
                                </form>
                                
                                    <p className="small mb-5 pb-lg-2"><a className='text-muted'>Forgot password?</a></p>
                                    <p>Don't have an account?
                                        <Register/>
                                    </p>
                                    <button type='button' className='btn-google' onClick={signInWithGoogle}>Sign in with Google</button>

                                
                            </div>
                            
                            </div>
                            <div className='col-sm-6 px-0 d-none d-sm-block'>
                                <img src="/images/photographer.jpg" alt = "Login image" className='w-100 vh-100' style={{objectFit:"cover", objectPosition:"right"}}></img>
                            
                            </div>
                </div>
                 
                
            </div>
             
            
        </section>
        
    );
        
}

export default Login;
