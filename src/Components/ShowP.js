import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useRef, useState } from "react";
import  storage  from "../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { faSignalPerfect } from '@fortawesome/free-solid-svg-icons';
import {HiDotsHorizontal} from 'react-icons/hi';
import {FaRegComment,FaRegHeart, FaHeart} from 'react-icons/fa';
import { db,auth } from '../firebase';
import { collection, getDocs, snapshotEqual, doc, getDoc, updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore';
import { async } from '@firebase/util';
import { Card } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import Roll from '../Images/roll.svg';
function ShowP({sort,id}){

    const postsCollectionRef = collection(db,'posts');
    const [i,setI] = useState(3);
    const [more,setMore] = useState(true);
    const [hearted, setHearted] = useState(false)
    const [profilePost, setProfilePost] = useState([])
    
    
    
    useEffect(() => {
        sortingArray()
    },[sort])

    console.log(profilePost)
    function sortingArray(){
        if (sort === 1) { 
            //sorting based on friends
            console.log("no change")
            setProfilePost(profilePost.sort((a,b) => Date.parse(b.date) - Date.parse(a.date)))
        } else if (sort === 2){
            //sorting based on popularity
            console.log("no change")
            setProfilePost(profilePost.sort((a,b) => Date.parse(b.date) - Date.parse(a.date)))
        } else if (sort === 3){
            //sorting based on recenty
            console.log("no change")
            setProfilePost(profilePost.sort((a,b) => Date.parse(b.date) - Date.parse(a.date)))

        } else if (sort === 4){
            //sorted based on oldest post
            console.log("change")
            setProfilePost(profilePost.sort((a,b) => Date.parse(a.date) - Date.parse(b.date)))
        }
        
    }

    const style = {
        height: 30,
        border: "1px solid green",
        margin: 6,
        padding: 8,
    }

    const addLike = (likeID) => {
        
        const docLike = doc(db,"likes", likeID)
        updateDoc(docLike,{whoLiked : arrayUnion(id)})
    }

    const removeLike = (likeID) => {
      
        const docLike = doc(db,"likes", likeID)
        updateDoc(docLike,{whoLiked : arrayRemove(id)})
    }


    useEffect(() => {
        const getUser = async() => {
            
            //first await is used to retrive data from the post collection
            const list = await getDocs(postsCollectionRef);

            var profiles = list.docs.map((doc) => ({...doc.data(),id:doc.id}))
            //second await is used to retrive all the profile information based on the post id document retrived in the previous await
            let data = await Promise.all(profiles.map(async (usage) =>{
                const docRef = doc(db, "accounts", String(usage.idUser))
                const docSnap = await getDoc(docRef)
                var title = usage.title;
                var postText = usage.postText;
                var imgPath = usage.imgPath;
                var user = String(docSnap.data().name);
                var profileImgPath = docSnap.data().profileImgPath;
                var date = (usage.createdAt).toDate();
                var likeID = usage.likeID
                var likeType = isLiked(likeID)
                console.log(date)
                return({title,postText,imgPath,user,profileImgPath,date,likeID,likeType})
                //setProfilePost(...profilePost,[user,image])

            }))
            setProfilePost(data)
        }
        getUser();

    },[]);

    const loadMore = () => {
        setTimeout(() => {
        if (i+3 > profilePost.length){
            setI(i + (profilePost.length - i))
            setMore(false)
        }else if (i === profilePost.length-1){
            setMore(false)
        }else{
            setI(i+3)
        }
        },1500)
    }
    
    function isLiked(likeID){
        var flag = false;
        const getUser = async() => {
            const docLike = doc(db,"likes",likeID)
            const docSnap = await getDoc(docLike)
            docSnap.data().whoLiked.map( (data) => {
                if (data == id){
                    flag = true
                }
            })
        }
        getUser();
        return flag
    }
    
    
    return(
        <>
        <div id = "ScrollableDiv" style={{overflowY:"scroll", height: "inherit"}}>
        <InfiniteScroll
        dataLength = {i}
        hasMore={more}
        next = {loadMore}
        loader= {<img src = {Roll} alt= "svg"/>}
        scrollableTarget  = "ScrollableDiv"
        endMessage={
            <p>You have reached the end of all posts</p>
        }
        >
        {profilePost.filter((data,index) => index <= i).map((post,index) => {

            return (
                <>  
                <Card key={index} style = {{background: "white", boxShadow:"0 2px 15px -3px rgba(0,0,0,.07), 0 10px 20px -2px rgba(0,0,0,.04)", borderRadius:"0.5rem", marginTop:"15px"}}>
                            <Card.Title style={{marginBottom:"2px", marginTop:"2px", }}>
                                <div className='row justify-content-start' style = {{margin:"auto"}}>
                                    <div className='col-2'>
                                    { profilePost === undefined
                                    ?
                                    <img src= {'../images/no-profile.jpg'} alt = {"profile"} style={{width:"100%", height:"auto", borderRadius:'100%', height:'30px',width:'30px', border:"3px solid rgba(255,255,255,1)"}} ></img>  
                                    :
                                    <img src= {post.profileImgPath} style={{width:"100%", height:"auto", borderRadius:'100%', height:'30px',width:'30px', border:"3px solid rgba(255,255,255,1)"}} ></img>
                                    }
                                    
                                    </div>
                                    <div className='col-8' style={{fontSize:"14px", alignSelf:"center", textAlign:"initial", paddingLeft:"5px", paddingRight:"0px"}}>
                                    {post.user}
                                    </div>
                                    <div className='col-2'style={{fontSize:"10px", padding:"0px", color:"#858585", marginTop:"10px"}}>
                                        <p>365 days</p>
                                    </div>
                                </div>
                                    
                            </Card.Title>
                            <div stlye = {{boxShadow:"2px 3px 10px -7px"}}>
                                <div style= {{fontFamily:"serif", fontSize:"x-large"}}>
                                    {post.title}
                                </div>
                                <Card.Img variant= "top" src={[post.imgPath]}  style = {{maxHeight:"25vh"}}/>
                            </div>
                            <Card.Body>
                                <div className='row'>
                                <div className="col-2">
                                { post.likeType === false
                                ?
                                <FaRegHeart onClick={addLike(post.likeID)} style={{cursor:"pointer"}}/>
                                :
                                <FaHeart onClick={removeLike(post.likeID)} style={{cursor:"pointer"}}/>
                                }
                                
                                
                                </div>
                                <div className="col-2">
                                <FaRegComment onClick = {() => {console.log("start comment")}} style={{cursor:"pointer"}} />
                                </div>
                                <div className="col" style={{textAlign:"right"}}>
                                <HiDotsHorizontal onClick={() => {console.log("start options")}} style={{cursor:"pointer"}}/>
                                </div>
                                </div>
                            </Card.Body>
                </Card>
                </>
            )
        })

        }
        
        </InfiniteScroll>
        
        </div>
        </>
    )
}

export default ShowP;