import { db,auth } from '../firebase';
import { collection, getDocs, snapshotEqual } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, lazy, Suspense} from "react";
import Navigation from '../Components/Navigation';
import UploadPost from '../Components/UploadPost';
import ShowPost from '../Components/ShowPost';
import EventCarousel from '../Components/EventCarousel';
import {useSelector} from 'react-redux';
import {getEditProfileOfClicks} from "../reduxFiles/selectors";
import {BsInstagram, BsFacebook, BsTwitter, BsPinterest} from 'react-icons/bs'
import {FiEdit} from 'react-icons/fi';
import {GrAddCircle} from 'react-icons/gr';
import "../css/Home.css"
import { Card } from 'react-bootstrap';
import {FaRegComment,FaRegHeart} from 'react-icons/fa';
import {HiDotsHorizontal} from 'react-icons/hi';
import ShowP from "../Components/ShowP";
import Trial from "../Components/Trial";
import InfiniteScroll from 'react-infinite-scroll-component';
import Categories from '../Components/Categories';
import { useNavigate } from 'react-router-dom';
import { Button } from 'bootstrap';
//const ShowP = lazy(() => import("../Components/ShowP"))
function Home() {

    const profileData = useSelector(getEditProfileOfClicks);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [loading, setLoading] = useState(false)
    const [id, setID] = useState("")
    //set {0 = none, 1 = Friends, 2 = Popular, 3 = Recent, 4 = Latest}
    const [category,setCategory] = useState(0)
    let navigate  = useNavigate();
    const updateCategory = number => {
        setCategory(number)
    }

    function showModalHandler(){
        setShowModal(true);
    }

    function closeModalHandler(){
        setShowModal(false);

    }

    useEffect(() => {
        getName()
    }, [])
    function getName() {
        const accountsCollectionRef = collection(db,'accounts');
        getDocs(accountsCollectionRef)
        .then(response => {
            const prf = response.docs.map(doc => ({
                data:doc.data(),
                id:doc.id
            }))
            let user = prf.filter((user) => (user.data.id === localStorage.getItem('userID')))
            setID(user[0].id)
            setName(user[0].data.name)
            setProfilePic(user[0].data.profileImgPath)
        })
        .catch(error => console.log(error.message))
    }
    
    return(
        <div>
                 
        <section className="min-vh-100 d-flex align-items-center justify-content-center py-3" style={{background: "#61D0FF"}}>
            <div className='fixed-top'>
                <div className= "main-body">
                <Navigation/> 
                </div>
            </div>       
            <div className="container" style={{background:"white", height: "80vh", margin:"0"}}> 
                <div className='row justify-content-center' style={{height:"inherit"}}>
                    <div className='col-3' >
                        <div className='row'style={{padding:'0px'}} >
                            <div className='card profile-card-4' >
                                <div className='card-img-block' style={{position:'realtive', padding:'2em', background: "blue"}}>
                                    { profilePic === "" ?
                                    <img src='..\images\no-profile.jpg' style={{borderRadius:'100%', height:'125px',width:'125px', border:"3px solid rgba(255,255,255,1)"}}/>
                                    :
                                    <img src= {profilePic} style={{ borderRadius:'100%', height:'125px',width:'125px', border:"3px solid rgba(255,255,255,1)"}}/>
                                    }
                                </div>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col'style={{padding:'2px'}}>
                                        <h5>{name}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                        <div className='row'>
                            <Categories updateCategory = {updateCategory}/>
                        </div> 
                        <div className='row'>
                        <button onClick={showModalHandler} style={{ background:'white',border:'none',  maxWidth: '100%', marginTop:'10px', boxShadow: 'rgba(0, 0, 0, 0.07) 0px 2px 15px -3px, rgba(0, 0, 0, 0.04) 0px 10px 20px -2px', borderRadius:'0.5rem;'} }> <GrAddCircle style={{height:'30px',width:"30px", objectFit:'fill'}}/> </button>
                        </div> 
                    </div>
                    <div className='col-4' style={{marginLeft:"20px", marginRight:"20px", height:"inherit"}}>
                    <Trial/>
                    </div>
                    
                    <div className='col-4' style={{marginLeft:"20px", marginRight:"20px", overflowY:"scroll", height:"inherit"}}>
                    <Card style = {{background: "white", border:"solid"}}>
                            <Card.Title>Post</Card.Title>
                            <Card.Img variant= "top" src='../images/background-test.jpg' style = {{maxHeight:"25vh"}}/>
                            <Card.Body>
                                <Card.Text>
                                    This is the body
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
            
        </section>
        
        {
        showModal === true && <UploadPost showModal = {showModal} setShowModal = {setShowModal} id = {id} profileImg = {profilePic}/>}
                
        </div>
                
        
    );
}
export default Home;