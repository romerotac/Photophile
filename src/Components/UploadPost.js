import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import  storage  from "../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { faSignalPerfect } from '@fortawesome/free-solid-svg-icons';


function UploadPost() {

    const [percent,setPercent] = useState(0);
    
    const [file, setFile] = useState("");

    

    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    function handleUpload(){
        if(!file){
            alert("Please choose a file first!")
        }

        const storageRef = ref(storage, '/files/${file.name}')

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
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        ); 
    }

  
    return(
        <>
        
            <input type='file' onChange={handleChange} accept=''/>
            <input type='text' name = "username" placeholder='NAME'/>
            <button onClick={handleUpload}>onSubmit</button>
            <p>{percent}"% done"</p>
        <ul>
            <li>---</li>
        </ul>
        </>
    );
}
export default UploadPost;