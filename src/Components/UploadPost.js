/*
NOTE: try to use App.Context provider to send user data between pages instead of callin the database every time
*/

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useRef, useEffect } from "react";
import  storage  from "../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { faSignalPerfect } from '@fortawesome/free-solid-svg-icons';

import { db,auth } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { async } from '@firebase/util';
import {BsImages} from 'react-icons/bs';
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/esm/ModalHeader.js';


// props store the value from the previous page
const UploadPost = (props) =>  {

    //for modal
    const handleClose = () => props.setShowModal(false);

    //for storing image in the database (not firestore)
    const [percent,setPercent] = useState(0);
    const [file, setFile] = useState("");

    //for firestore
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");
    const postsCollectionRef = collection(db,"posts");

// showing picture 
    const [image,setImage] = useState();
    const [preview, setPreview] = useState("");
    const handleChange = event => {

        const fileUploaded = event.target.files[0];
        console.log(fileUploaded);
        setFile(fileUploaded);
    }

    useEffect(() => {
        if(image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result.toString);
            }
            reader.readAsDataUrl(image);
        }else { 
            setPreview(null)
        }
    },[image]);

    
    function handleUpload(){
        
        if(!file){
            alert("Please choose a file first!")
        }
        // the path is stored in storage, unsed the user uid forlder and each have the name of the filename
        const storageRef = ref(storage, auth.currentUser.uid + "/" + file.name)
        
        const uploadTask = uploadBytesResumable(storageRef,file);
        
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
     
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            async () => {
                const urlLoad = await getDownloadURL(storageRef);
                //creating document in firebase with the url image
                await addDoc(postsCollectionRef, {
                    title,
                    postText,
                    author: {name: auth.currentUser.displayName, id: auth.currentUser.uid},
                    imgPath:urlLoad,
                });
                }
            
        ); 
        
    }

  
    return(
        <>
        
            <Modal show = {props.showModal} onHide={handleClose}>
            
            <Modal.Header closeButton style={{border:"none"}}>
                <h1 className="text-center">POST HERE</h1>
            </Modal.Header>
            <Modal.Body>
            <form>
            <div className='form-group'>
            
            <input type='text' name = "Title" placeholder='Title' className='form-control' onChange={(event) => {setTitle(event.target.value)}}/>
            <hr/>
            <textarea className='form-control' name = "PostArea" placeholder='Write your post here...' rows={'3'} style={{height:'90px'}} onChange={(event) => {setPostText(event.target.value)}}></textarea>
            <h1> {preview} cc </h1>
            <hr/>

            <input type='file' onChange={handleChange}/>
            
            
            <div className='container'>
                {preview ? (
                 <img src= {preview} className='img-fluid mx-auto' style={{width: '400px', height:'400px' }}/>
                ):
                (<img src= "..\images\no-image.jpg" className='img-fluid mx-auto' style={{width: '400px', height:'400px' }}/>
                )}
            </div>
            
            
            
            </div>
            <div className='row' >
            <button onClick={handleUpload} type='button' className='btn btn-primary'>SUBMIT</button>
            </div>
            
            <p>{percent}"% done" could be put as a modular</p>
            </form>    
            </Modal.Body>
            </Modal>
        </>
    );
}
export default UploadPost;