import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect, useReducer, useId} from "react";
import Navigation from '../Components/Navigation';
import {useDispatch, useSelector} from 'react-redux';
import {getEditProfileOfClicks} from "../reduxFiles/selectors";
import { db } from '../firebase';
import { addDoc,collection, Firestore, getDocs } from 'firebase/firestore';
import EditModal from '../Components/EditModal';
import "../css/Userpage.css"
import {setSocial, editName,editState,editEmail,editfavoriteCamera, editPhoto} from '../reduxFiles/actions'
import EditPhotoProfile from '../Components/EditPhotoProfile';
import { Placeholder } from 'react-bootstrap';
import {BsInstagram, BsFacebook, BsTwitter, BsPinterest} from 'react-icons/bs'
import UploadSocial from '../Components/UploadSocial';

function UserPage(){
    const dispatch = useDispatch();
    
    const profileData = useSelector(getEditProfileOfClicks);
    const [profile, setProfile] = useState([]);
    const [id, setID] = useState("");
    const [loading, setLoading] = useState(true);
    const [isHovering1,setIsHovering1] = useState(false);
    const [isHovering2,setIsHovering2] = useState(false);
    const [isHovering3,setIsHovering3] = useState(false);
    const [isHovering4,setIsHovering4] = useState(false)

    useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    getAccount()
    return () => clearTimeout(timer);
    }, []);

    const handleMouseEnter1 = () => {
        setIsHovering1(true);
    }

    const handleMouseLeave1 = () => {
        setIsHovering1(false);
    }

    const handleMouseEnter2 = () => {
        setIsHovering2(true);
    }

    const handleMouseLeave2 = () => {
        setIsHovering2(false);
    }

    const handleMouseEnter3 = () => {
        setIsHovering3(true);
    }

    const handleMouseLeave3 = () => {
        setIsHovering3(false);
    }

    const handleMouseEnter4 = () => {
        setIsHovering4(true);
    }

    const handleMouseLeave4 = () => {
        setIsHovering4(false);
    }

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
            dispatch(setSocial(user[0].data.social))
        })
        .catch(error => console.log(error.message))
    }
    
    return(
        <>    
        <div className='container-fluid px-0 '>
            <section className="min-vh-100 d-flex align-items-center justify-content-center py-3" style={{background: "#61D0FF"}}>
            <div className='fixed-top'>
                <div className= "main-body">
                <Navigation/> 
                </div>
            </div>
            
            <div className="container" style={{borderRadius: '15px', background:"white", padding: "2%" }}> 
            
                <div className="row justify-content-between align-items-center">
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
                                        <div className='col-3'>
                                        {
                                            profileData.social === undefined
                                            ?
                                            <BsInstagram style={{height:'25px',width:"25px", display:"block"}}/>
                                            :
                                                profileData.social.instagram === ""
                                                    ?
                                                    <BsInstagram style={{height:'25px',width:"25px" ,display:"block", color:"grey"}}/>
                                                    :
                                                    <a href = {profileData.social.instagram} target={"_blank"} onMouseEnter = {handleMouseEnter1} onMouseLeave = {handleMouseLeave1} style={{color: isHovering1 ? '#833AB4': '#C13584'}}><BsInstagram style={{height:'25px',width:"25px" ,display:"block"}}/></a>
                                        }
                                        </div>
                                        <div className='col-3'>
                                        {
                                            profileData.social === undefined
                                            ?
                                            <BsFacebook style={{height:'25px',width:"25px", display:"block"}}/>
                                            :
                                                profileData.social.facebook === ""
                                                    ?
                                                    <BsFacebook style={{height:'25px',width:"25px" ,display:"block", color:"grey"}}/>
                                                    :
                                                    <a href = {profileData.social.facebook} target={"_blank"} onMouseEnter = {handleMouseEnter2} onMouseLeave = {handleMouseLeave2} style={{color: isHovering2 ? '#203457': '#29487D'}}><BsFacebook style={{height:'25px',width:"25px" ,display:"block"}}/></a>
                                        }
                                        </div>
                                        <div className='col-3'>
                                        {
                                            profileData.social === undefined
                                            ?
                                            <BsTwitter style={{height:'25px',width:"25px", display:"block"}}/>
                                            :
                                                profileData.social.twitter === ""
                                                    ?
                                                    <BsTwitter style={{height:'25px',width:"25px" ,display:"block", color:"grey"}}/>
                                                    :
                                                    <a href = {profileData.social.twitter} target={"_blank"} onMouseEnter = {handleMouseEnter3} onMouseLeave = {handleMouseLeave3} style={{color: isHovering3 ? '#0084b4': '#1dcaff'}}><BsTwitter style={{height:'25px',width:"25px" ,display:"block"}}/></a>
                                        }
                                        </div>
                                        <div className='col-3'>
                                        {
                                            profileData.social === undefined
                                            ?
                                            <BsPinterest style={{height:'25px',width:"25px", display:"block"}}/>
                                            :
                                                profileData.social.pinterest === ""
                                                    ?
                                                    <BsPinterest style={{height:'25px',width:"25px" ,display:"block", color:"grey"}}/>
                                                    :
                                                    <a href = {profileData.social.pinterest} target={"_blank"} onMouseEnter = {handleMouseEnter4} onMouseLeave = {handleMouseLeave4} style={{color: isHovering4 ? '#BD081C': '#e51028'}}><BsPinterest style={{height:'25px',width:"25px" ,display:"block"}}/></a>
                                        }
                                        </div>

                                 </div>
                                 <div className='row' style={{margin:'10px'}}>
                                   <UploadSocial id = {id}/> 
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
                            <div className="col-sm-3">
                                <h6 className="mb-0">Full Name</h6>
                            </div>
                            {loading == true ? 
                            <div className="col-sm-9 text-secondary"><Placeholder xs = {10}/></div>
                            :
                            <div className="col-sm-9 text-secondary">{profileData.fullName}</div>
                            }
                            </div>
                            
                            <hr/>
                            <div className='row'>
                                <div className="col-sm-3">
                                    <h6 className="mb-0">State</h6>
                                </div>
                            {loading == true ?
                            <div className="col-sm-9 text-secondary"><Placeholder xs = {10}/></div>
                            :
                            <div className="col-sm-9 text-secondary">{profileData.state}</div>
                            }
                            
                            </div>
                            <hr/>
                            <div className='row'>
                            <div className="col-sm-3">
                                <h6 className="mb-0">Email</h6>
                            </div>
                            {loading == true ?
                            <div className="col-sm-9 text-secondary"><Placeholder xs = {10}/></div>
                            :
                            <div className="col-sm-9 text-secondary">{profileData.email}</div>
                            }
                            
                            </div>
                            <hr/>
                            <div className='row' style={{marginBottom:"20px"}}>
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Favorite Camera</h6>
                                </div>
                            {loading == true ?
                            <div className="col-sm-9 text-secondary"><Placeholder xs = {10}/></div>
                            :
                            <div className="col-sm-9 text-secondary">{profileData.favoriteCamera}</div>
                            }
                            
                            </div>
                            
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