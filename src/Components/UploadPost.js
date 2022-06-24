/*
NOTE: try to use App.Context provider to send user data between pages instead of callin the database every time
*/

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import  storage  from "../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { faSignalPerfect } from '@fortawesome/free-solid-svg-icons';

import { db,auth } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { async } from '@firebase/util';



function UploadPost() {

    //for storing image in the database (not firestore)
    const [percent,setPercent] = useState(0);
    const [file, setFile] = useState("");

    //for firestore
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");
    const [imgPath, setImgPath] = useState("");
    const postsCollectionRef = collection(db,"posts");

    const createPost = async () =>{
        await addDoc(postsCollectionRef, {
        title,
        postText,
        author: {name: auth.currentUser.displayName, id: auth.currentUser.uid},
        
    });
    };

    

    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    function handleUpload(){
        
        if(!file){
            alert("Please choose a file first!")
        }
        // the path is stored in storage, unsed the user uid forlder and each have the name of the filename
        const storageRef = ref(storage, auth.currentUser.uid + "/" + file.name)
        
       

        const uploadTask = uploadBytesResumable(storageRef,file);
        /*
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
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        ); 
        */

        // path will be used to identify wich image you posted that is store in the storage with folder name the uid of the user
        //setImgPath(auth.currentUser.uid + "/" + file.name);
        createPost();
    }

  
    return(
        <>
        
            <form>
            <div className='form-group'>
                
            <input type='text' name = "Title" placeholder='Title' className='form-control' onChange={(event) => {setTitle(event.target.value)}}/>
            <hr/>
            <textarea className='form-control' name = "PostArea" placeholder='Write your post here...' rows={'3'} style={{height:'90px'}} onChange={(event) => {setPostText(event.target.value)}}></textarea>
            <hr/>
            <input type='file' onChange={handleChange} accept=''/>
            </div>

            <button onClick={handleUpload} type='button' className='btn btn-primary'>SUBMIT</button>
            <p>{percent}"% done" could be put as a modular</p>

            
            </form>
        </>
    );
}
export default UploadPost;