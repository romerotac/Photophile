import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect, useReducer, useId} from "react";
import {useLocation} from 'react-router-dom';
import Navigation from '../Components/Navigation';
import Image from 'react-bootstrap/Image';
import {useDispatch, useSelector} from 'react-redux';
import {getEditProfileOfClicks} from "../reduxFiles/selectors";
import { db } from '../firebase';
import { addDoc,collection, Firestore, getDocs } from 'firebase/firestore';
import { FirestoreService } from 'firebase/firestore';
import EditModal from '../Components/EditModal';
import "../css/Userpage.css"
import {MdOutlinePersonOff, MdUpload} from 'react-icons/md';
import {editName,editState,editEmail,editfavoriteCamera, editPhoto} from '../reduxFiles/actions'
import EditPhotoProfile from '../Components/EditPhotoProfile';
import { Placeholder } from 'react-bootstrap';
import {BsInstagram, BsFacebook, BsTwitter, BsPinterest} from 'react-icons/bs'
import {GrFacebook} from 'react-icons/gr'
function UserPage(){
    const dispatch = useDispatch();
    
    const profileData = useSelector(getEditProfileOfClicks);
    const [profile, setProfile] = useState([]);
    const [id, setID] = useState("");
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    getAccount()
    return () => clearTimeout(timer);
    }, []);

    function getAccount() {
        const accountCollectionRef = collection(db, 'accounts');
        getDocs(accountCollectionRef)
        .then(response => {
            const prf = response.docs.map(doc => ({
                data:doc.data(),
                id:doc.id
            }))
            let user = prf.filter((user) => (user.data.id === localStorage.getItem('userID')))
            
            
            setProfile(user[0].data)
            setID(user[0].id)
            dispatch(editName(user[0].data.name))
            dispatch(editState(user[0].data.state))
            dispatch(editEmail(user[0].data.email))
            dispatch(editfavoriteCamera(user[0].data.favoriteCamera))
            dispatch(editPhoto(user[0].data.profileImgPath))
            
        })
        .catch(error => console.log(error.message))
    }
    
    return(
        <>    
        <div className='container-fluid px-0 '>
            <section class="min-vh-100 d-flex align-items-center justify-content-center py-3" style={{background: "#61D0FF"}}>
            <div className='fixed-top'>
                <div className= "main-body">
                <Navigation/> 
                </div>
            </div>
            
            <div class="container" style={{borderRadius: '15px', background:"white", padding: "2%" }}> 
            
                <div class="row justify-content-between align-items-center">
                <div className='col-md-4 mb-3 h-100'>
                    <div className='card'>
                        <div className='card-body'>
                        <div className="d-flex flex-column align-items-center text-center"> 
                        <EditPhotoProfile id = {id} profile = {profile}/>
                            <div className="mt-3">
                                {   loading == true ?
                                    <h4><Placeholder xs = {10}/></h4> 
                                    :
                                    <h4>{profileData.fullName}</h4>
                                }
                                <p className="text-muted font-size-sm">Bay Area, San Francisco, {profileData.state}</p>
                                 <div className='row'>
                                    <div className='col-3'><BsInstagram style={{height:'25px',width:"25px"}}/></div>
                                    <div className='col-3'><BsFacebook style={{height:'25px',width:"25px"}}/></div>
                                    <div className='col-3'><BsTwitter style={{height:'25px',width:"25px"}}/></div>
                                    <div className='col-3'><BsPinterest style={{height:'25px',width:"25px"}}/></div>
                                 </div>
                                 </div>
                                 </div>
                        </div>
                    </div>
                </div>

                <div className='col-md-8 align-self-center' >
                    <div className='card mb-3'>
                        <div className='card-body'>
                            <div className='row'>
                            <div class="col-sm-3">
                                <h6 class="mb-0">Full Name</h6>
                            </div>
                            {loading == true ? 
                            <div class="col-sm-9 text-secondary"><Placeholder xs = {10}/></div>
                            :
                            <div class="col-sm-9 text-secondary">{profileData.fullName}</div>
                            }
                            </div>
                            
                            <hr/>
                            <div className='row'>
                                <div class="col-sm-3">
                                    <h6 class="mb-0">State</h6>
                                </div>
                            {loading == true ?
                            <div class="col-sm-9 text-secondary"><Placeholder xs = {10}/></div>
                            :
                            <div class="col-sm-9 text-secondary">{profileData.state}</div>
                            }
                            
                            </div>
                            <hr/>
                            <div className='row'>
                            <div class="col-sm-3">
                                <h6 class="mb-0">Email</h6>
                            </div>
                            {loading == true ?
                            <div class="col-sm-9 text-secondary"><Placeholder xs = {10}/></div>
                            :
                            <div class="col-sm-9 text-secondary">{profileData.email}</div>
                            }
                            
                            </div>
                            <hr/>
                            <div className='row'>
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Favorite Camera</h6>
                                </div>
                            {loading == true ?
                            <div class="col-sm-9 text-secondary"><Placeholder xs = {10}/></div>
                            :
                            <div class="col-sm-9 text-secondary">{profileData.favoriteCamera}</div>
                            }
                            
                            </div>
                            <hr/>
                            <div className='row'>
                                <EditModal id = {id} profile = {profile}/>
                            </div>
                            
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
            
            </div>
        </>
    );
}

export default UserPage;