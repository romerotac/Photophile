import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from "react";
import Navigation from '../Components/Navigation';
import UploadPost from '../Components/UploadPost';
import ShowPost from '../Components/ShowPost';

function Home() {
    return(
        <>
        <div className='container-fluid px-0'>
        <Navigation/>
        <div className='row'>
            <div className='col col-sm-6' style={{background: "red"}}>   
            <img src='..\images\no-profile.jpg' className='rounded mx-auto d-block' style={{height:'200px', width:'200px'}}></img>
            
            <hr/>
            <div className='row'>
            <div className='col'>
            <h3>Name:</h3>
            <p>James</p>
            </div>
            <div className='col'>
            <h3>Surname:</h3>
            <p>Bond</p>
            </div>
            </div>
            <hr/>

            <hr/>
            <div className='row'>
            <div className='col'>
            <p>Instagram</p>
            </div>
            <div className='col'>
            <p>facebook</p>
            </div>
            <div className='col'>
            <p>youtube?</p>
            </div>
            <div className='col'>
            <p>twitter</p>
            </div>
            </div>
            <hr/>

            </div>
            <div className='col col-sm-6'style={{background: ""}}>
            <h1>Post something:</h1>
            <UploadPost/>
            </div>
        
        </div>
        
        
        
        <div className='row' style={{background:"green"}}>
            <ShowPost/>
            </div>
            <div className='row'style={{background:"yellow"}}>
                <div className='col'>
                <h1>section see events</h1>
                </div>
                <div className='col'>
                <h1>section see calendar</h1>
                </div>

            </div>
        </div>
        </>
    );
}
export default Home;