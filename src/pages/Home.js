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
import InfiniteScroll from 'react-infinite-scroll-component';
import Categories from '../Components/Categories';
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
        <section class="min-vh-100 d-flex align-items-center justify-content-center py-3" style={{background: "#61D0FF"}}>
            <div className='fixed-top'>
                <div className= "main-body">
                <Navigation/> 
                </div>
            </div>       
            <div class="container" style={{background:"white", height: "80vh", margin:"0"}}> 
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
                    <ShowP sort = {category} id = {id}/>   
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
        {/*
        <div className='container-fluid px-0'>
        <Navigation/>

        <div className='row' style={{ background:'', margin:'auto', justifyContent:'space-around', backgroundColor:'#bac9aa'}}>
            <div className='col'style={{padding:'0px'}} >
                <div className='card profile-card-4' >
                <div className='card-img-block' style={{position:'realtive', padding:'2em', backgroundImage:'url(../images/background-test.jpg)', backgroundRepeat:'no-repeat'}}>
                  { profilePic == undefined ?
                    <img src='..\images\no-profile.jpg' style={{width:"100%", height:"auto", borderRadius:'100%', maxHeight:'200px',maxWidth:'200px', border:"3px solid rgba(255,255,255,1)"}}/>
                    :
                    <img src= {profilePic} style={{width:"100%", height:"auto", borderRadius:'100%', maxHeight:'200px',maxWidth:'200px', border:"3px solid rgba(255,255,255,1)"}}/>
                  }
                </div>

            
            <div className='card-body'>
           
            <div className='row '>
            <div className='col'style={{padding:'2px'}}>
            <h3>{name}</h3>
            </div>
            </div>
               
            <div className='row' >
            <div className='col'>
            <button style={{border:'none', background:'none' }}><BsInstagram style={{height:'30px',width:"30px"}}/></button>
            </div>
            <div className='col'>
           
            <BsFacebook style={{height:'30px',width:"30px"}}/>
            </div>
            <div className='col'>
            <BsPinterest style={{height:'30px',width:"30px"}}/>
            </div>
            <div className='col'>
            <BsTwitter style={{height:'30px',width:"30px"}}/>
            </div>
            </div>
            </div>
            </div>
            </div>
                  
        </div>
            
        
        <div className='row' style={{background:"#bac9aa", margin:'auto', paddingLeft:'20%', paddingRight:'20%'}}>
                <div className='col'>
                    
                </div>
                <h1>Create new Post:</h1>    
                <div className='bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden' style={{borderRadius:'3%', paddingBottom:'48px'}}>
                    <button onClick={showModalHandler} style={{height:'350px', width:'350px', border:'none' , background:'white',  maxWidth: '100%'} }> <GrAddCircle style={{height:'30px',width:"30px", objectFit:'fill'}}/> </button>
                </div>
                
                <ShowPost/>   

            
                <div className='bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden' style={{borderRadius:'3%', paddingBottom:'48px'}}>
                    <div className='image postion'>
                    <img src='..\images\no-image.jpg' className='img-fluid mx-auto card-img-top' style={{height:'300px',width:"300px", objectFit:'fil'}} ></img>   
                    </div>
                    <div className='postHeader'>
                        <div className='title'>
                            <h3>Title</h3>
                        </div>
                    </div>
                    <div className='post-container'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Metus dictum at tempor commodo ullamcorper a lacus</p>
                        <h5>@James Bond</h5>
                    </div>
                </div>
                

        </div>

         
           
        <div className='row'style={{background:"yellow", margin: 'auto'}}>
                <div className='col'>
                <h1>section see events</h1>
                </div>
                <div className='col'>
                <h1>section see calendar</h1>
                </div>

        </div>
            
        </div>
        */}        
        {
        showModal === true && <UploadPost showModal = {showModal} setShowModal = {setShowModal} id = {id}/>}
                
        </div>
                
        
    );
}
export default Home;