import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import  storage  from "../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { faSignalPerfect } from '@fortawesome/free-solid-svg-icons';

import { db,auth } from '../firebase';
import { collection, getDocs, snapshotEqual } from 'firebase/firestore';
import { async } from '@firebase/util';

function ShowPost(){
    const [postList, setPostList] = useState([]);
    const postsCollectionRef = collection(db,'posts');
    //const postRef = db.collection('posts');
   
    
    
    useEffect (() =>{
        const getPost = async () => {
            const data = await getDocs(postsCollectionRef);
            setPostList(data.docs.map((doc) => ({...doc.data(),id:doc.id})));
        };
        getPost();
    });
    
    return(
        <>
        <div>
        <h1>Post is here!!!!!</h1>
        
        {postList.map((post) => {
            return (
                <>
                <div className='post'>
                    <div className='image postion'>
                    <img src='..\images\no-image.jpg' className='rounded' style={{height:'200px',width:"200px"}}></img>   
                    </div>
                    <div className='postHeader'>
                        <div className='title'>
                            <h3>{post.title}</h3>
                        </div>
                    </div>
                    <div className='post-container'>
                        <p>{post.postText}</p>
                        <h5>{post.author.name}</h5>
                    </div>
                </div>
                <hr/>
                </>
            )
        })

        }
        </div>
        </>
    )
}

export default ShowPost;