import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useRef, useEffect } from "react";
import  storage  from "../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { db,auth } from '../firebase';
import Modal from 'react-bootstrap/Modal'
import logo from '../Images/AvGf.gif'
import "../css/Userpage.css"
import {useDispatch, useSelector} from 'react-redux';
import { editPhoto } from '../reduxFiles/actions.js';
import {MdUpload} from 'react-icons/md';
import { doc, updateDoc } from 'firebase/firestore';
import {getEditProfileOfClicks} from "../reduxFiles/selectors";

// props store the value from the previous page
const EditPhotoProfile = ({id, profile}) =>  {

    //for modal
    const [show,setShow] = useState(false)

    //for storing image in the database (not firestore)
    const [percent,setPercent] = useState(0);
    const [file, setFile] = useState("");

    //for firestore
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");

    const dispatch = useDispatch();
    const profileData = useSelector(getEditProfileOfClicks);
// showing picture 

    const [preview, setPreview] = useState("");
    

    const handleChange = event => {
        
        const fileUploaded = event.target.files[0];
        
        setFile(fileUploaded);
        
        const reader = new FileReader();

        reader.onload = (event) => {
            setPreview(event.target.result);
            console.log(preview);
        }   

        reader.readAsDataURL(fileUploaded);

    }
    
    function handleUpload(){
        
        if(!file){
            alert("Please choose a file first!")
        }
        // the path is stored in storage, unsed the user uid forlder and each have the name of the filename
        const storageRef = ref(storage, auth.currentUser.uid + "/profile/" + file.name)
        
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
                //updating profile image
                const docRef = doc(db, 'accounts', id)
                updateDoc(docRef, {profileImgPath:urlLoad}).then(response => {
                dispatch(editPhoto(urlLoad))
                })
            }
        ); 
        
    }

  
    return(
        <>
            <div className='profile-pic'> 
                <label className = "-label" onClick ={() => setShow(true)}>
                    <MdUpload/>
                    <span>Change Image</span>
                </label>
                {   profileData.photo === ""  ?
                    <img src="/images/no-profile.jpg" alt="Admin" width="150" id = "changePhoto" />
                    :
                    <img src={profileData.photo} alt="Admin" width="150" id = "changePhoto"/>
                }
            </div>
            
            {percent == 0 ? 

            <Modal show = {show} onHide={() => setShow(false)}>
            
            <Modal.Header closeButton style={{border:"none"}}>
                <h1 className="text-center">Change your profile Picture</h1>
            </Modal.Header>
            <Modal.Body>
            <form>
            <div className='form-group'>

            <input type='file' onChange={handleChange}/>
            
            
            <div className='container' style={{textAlign:'center', paddingTop:'2%'}}>
                {preview ? (
                 <img src= {preview} className='img-fluid mx-auto' style={{width: '400px', height:'400px', maxWidth:'400px'}}/>
                ):
                (<img src= "..\images\no-image.jpg" className='img-fluid mx-auto' style={{width: '400px', height:'400px', maxWidth:'400px'}}/>
                )}
            </div>
            
            
            
            </div>
            <div className='row'>
            <button onClick={handleUpload} type='button' className='btn btn-primary'>SUBMIT</button>
            </div>
            
            <p>{percent}"% done" could be put as a modular</p>
            </form>    
            </Modal.Body>
            </Modal>
            
            :  percent == 100 ?

            

            <Modal size= 'lg' centered show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton style={{border:"none"} }>
            </Modal.Header>
            <Modal.Body className="card-body p-5">
            <Col>
                <Row className="mb-4 ">
                <h1 className="text-center mb-5">You changed your profile picture !!!!</h1>
                </Row>
            </Col>
            </Modal.Body>
            <Modal.Footer style={{border:"none"}}>  
            </Modal.Footer>
            </Modal>
            
            : 
            
            <img src={logo} alt = "loading" />    
            
            }
        </>
    );
}
export default EditPhotoProfile;