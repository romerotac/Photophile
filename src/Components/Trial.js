import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs, snapshotEqual, doc, getDoc, updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore';
import { db,auth } from '../firebase';
import {setPost,setLiked,addWhoLiked, removeWhoLiked,latestPost, recentPost,mostLikedPost} from '../reduxFiles/actions';
import { Card } from 'react-bootstrap';
import {FaRegComment,FaRegHeart, FaHeart} from 'react-icons/fa';
import {HiDotsHorizontal} from 'react-icons/hi';
import {getEditPost,getEditLike} from "../reduxFiles/selectors";
import InfiniteScroll from 'react-infinite-scroll-component';
import Roll from '../Images/roll.svg';

function Trial(){
    const [i,setI] = useState(3);
    const [more,setMore] = useState(true);

    const postData = useSelector(getEditPost)
    const likesList = useSelector(getEditLike)
    const dispatch = useDispatch();

    const [id, setID] = useState('');

    const postsCollectionRef = collection(db,'posts');

    const loadMore = () => {
        setTimeout(() => {
        if (i+3 > postData.posts.length){
            setI(i + (postData.posts.length - i))
            setMore(false)
        }else if (i === postData.posts.length - 1){
            setMore(false)
        }else{
            setI(i+3)
        }
        },1500)
    }

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
        })
        .catch(error => console.log(error.message))

    }

    function getLiked() {
        const likedCollectionRef = collection(db,'likes')
        getDocs(likedCollectionRef)
        .then(response => {
            const prf = response.docs.map(doc => ({
                data:doc.data(),
                id:doc.id
            }))
           dispatch(setLiked(prf)) 
        })
        .catch(error => console.log(error.message))

    }

    const addLike = (likeID) => {
        console.log("I'm liked")
        const docLike = doc(db,"likes", likeID)
        dispatch(addWhoLiked(likeID,id))
        updateDoc(docLike,{whoLiked : arrayUnion(id)})
    }

    const removeLike = (likeID) => {
        console.log("I'm not liked")
        const docLike = doc(db,"likes", likeID)
        dispatch(removeWhoLiked(likeID,id))
        updateDoc(docLike,{whoLiked : arrayRemove(id)})
    }

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
            var likeID = usage.likeID;

            return({title,postText,imgPath,user,profileImgPath,date,likeID})

        }))
        dispatch(setPost(data))
        
    }
    
    useEffect(() => {
        getUser();
        getName();
        getLiked();

    }, [])

    function checkLike(idLike){
        var isEqual = likesList.liked.filter((data) => data.id == idLike).some((likeData) => {
            return likeData.data.whoLiked == id
        })
        return isEqual
    }

    const renderAllPost = postData.posts.map((post,index) =>{
        
        
        return(
          <>
          <Card key = {index} style = {{background: "white", boxShadow:"0 2px 15px -3px rgba(0,0,0,.07), 0 10px 20px -2px rgba(0,0,0,.04)", borderRadius:"0.5rem", marginTop:"15px"} }>
                            <Card.Title style={{marginBottom:"2px", marginTop:"2px", }}>
                                <div className='row justify-content-start' style = {{margin:"auto"}}>
                                    <div className='col-2'>                                    
                                    {post.profileImgPath == undefined
                                    ?
                                    <img src= {'../images/no-profile.jpg'} alt = {"profile"} style={{width:"100%", height:"auto", borderRadius:'100%', height:'30px',width:'30px', border:"3px solid rgba(255,255,255,1)"}} ></img>  
                                    :
                                    <img src= {post.profileImgPath} alt = {"profile"} style={{width:"100%", height:"auto", borderRadius:'100%', height:'30px',width:'30px', border:"3px solid rgba(255,255,255,1)"}} ></img> 
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
                                { checkLike(post.likeID)
                                    ?
                                    <FaHeart onClick={() => {removeLike(post.likeID)}} style={{cursor:"pointer"}}/>
                                    :
                                    <FaRegHeart onClick={() => {addLike(post.likeID)}} style={{cursor:"pointer"}}/>
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

    return (
        <>
        <h1> Welcome to Trial </h1>
        <button onClick={()=>{dispatch(latestPost())}}>Latest</button>
        <button onClick={()=>{dispatch(recentPost())}}>Recent</button>
        <button onClick={()=>{dispatch(mostLikedPost(likesList.liked))}}>Most Liked</button>
        
        <div id = "scrollDiv" style={{overflowY:"scroll", height:"700px", maxWidth:"400px"}}>
            <InfiniteScroll
            dataLength = {i}
            hasMore={more}
            next = {loadMore}
            loader= {<img src = {Roll} alt= "svg"/>}
            scrollableTarget  = "scrollDiv"
            endMessage={
                <p>You have reached the end of all posts</p>
            }
            >
                {renderAllPost} 
            </InfiniteScroll>
        </div>
        
        
        
        </>
    )
}
export default Trial;