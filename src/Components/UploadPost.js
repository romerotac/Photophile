
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useRef, useEffect } from "react";
import  storage  from "../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { db,auth } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { async } from '@firebase/util';
import {BsImages} from 'react-icons/bs';
import Modal from 'react-bootstrap/Modal'
import logo from '../Images/AvGf.gif';
import { useDispatch } from 'react-redux';
import {newPost} from '../reduxFiles/actions';

// props store the value from the previous page
const UploadPost = (props) =>  {

    const dispatch = useDispatch();

    //for modal
    const handleClose = () => props.setShowModal(false);
    //for storing image in the database (not firestore)
    const [percent,setPercent] = useState(0);
    const [file, setFile] = useState("");

    //for firestore
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");
    const postsCollectionRef = collection(db,"posts");
    const likeCollectionRef = collection(db,"likes");
    const commentCollectionRef = collection(db,"comments");


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
        const storageRef = ref(storage, auth.currentUser.uid + "/post/" + file.name)
        
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
                const like = await addDoc(likeCollectionRef, {whoLiked:[]})
                const comment = await addDoc(commentCollectionRef,{imgPostPath:urlLoad, title, mainComment:postText, otherComments:[] })
                //creating document in firebase with the url image
             
                await addDoc(postsCollectionRef, {
                    title,
                    idUser: props.id,
                    imgPath:urlLoad,
                    likeID:like.id,
                    commentID:comment.id,
                    createdAt:serverTimestamp()
                    
                });
                dispatch(newPost(title,urlLoad,props.id,props.profileImg,serverTimestamp(),like.id,comment.id))
                }
            
        ); 
        
    }

  
    return(
        <>
            {percent == 0 ? 

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
            <hr/>

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

            

            <Modal size= 'lg' centered show={props.showModal} onHide={handleClose}>
            <Modal.Header closeButton style={{border:"none"} }>
            </Modal.Header>
            <Modal.Body className="card-body p-5">
            <Col>
                <Row className="mb-4 ">
                <h1 className="text-center mb-5">Your post was Uploaded !!!!</h1>
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
export default UploadPost;