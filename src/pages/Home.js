import { db,auth } from '../firebase';
import { collection, getDocs, snapshotEqual } from 'firebase/firestore';

import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from "react";
import Navigation from '../Components/Navigation';
import UploadPost from '../Components/UploadPost';
import ShowPost from '../Components/ShowPost';
import EventCarousel from '../Components/EventCarousel';

import {BsInstagram, BsFacebook, BsTwitter, BsPinterest} from 'react-icons/bs'
import {FiEdit} from 'react-icons/fi';
import {GrAddCircle} from 'react-icons/gr';


function Home() {

    const [showModal, setShowModal] = useState(false);

    function showModalHandler(){
        setShowModal(true);
    }

    function closeModalHandler(){
        setShowModal(false);
    }


    return(
        <div>
        <div className='container-fluid px-0'>
        <Navigation/>
        <div className='row' style={{ background:'', margin:'auto', justifyContent:'space-around', backgroundColor:'#bac9aa'}}>
            <div className='col-md-4 mb rounded-3'style={{padding:'0px'}} >
                <div className='card profile-card-4' >
                <div className='card-img-block' style={{position:'realtive', padding:'2em', backgroundImage:'url(../images/background-test.jpg)', backgroundRepeat:'no-repeat'}}>
                  <img src='..\images\no-profile.jpg' style={{width:"100%", height:"auto", borderRadius:'100%', maxHeight:'200px',maxWidth:'200px', border:"3px solid rgba(255,255,255,1)"}}/>
                    
                </div>

            
            <div className='card-body'>
           
            <div className='row '>
            <div className='col'style={{padding:'24px'}}>
            <h3>james bond</h3>
            </div>
            </div>
               
            <div className='row' >
            <div className='col'>
            <button style={{border:'none', background:'none'}}><BsInstagram style={{height:'30px',width:"30px"}}/></button>
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

            <div className='col col-md-8 rounded-3'style={{background: ""}}>
            <h1>Calendar:</h1>
            <div style={{padding:'inherit'}}>
                <EventCarousel/>
            </div>
            </div>   
        </div>

        
        <div className='row' style={{background:"#bac9aa", margin:'auto', paddingLeft:'20%', paddingRight:'20%'}}>

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

        {showModal === true && <UploadPost showModal = {showModal} setShowModal = {setShowModal}/>}

        </div>
        
    );
}
export default Home;