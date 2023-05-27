import React, { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import {FaUserFriends} from 'react-icons/fa';
import {AiOutlineStock} from 'react-icons/ai';
import {ImNewspaper} from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import {setPost,setLiked,addWhoLiked, removeWhoLiked,latestPost, recentPost,mostLikedPost,setComments} from '../reduxFiles/actions';
import {getEditPost,getEditLike} from "../reduxFiles/selectors";

function Categories({updateCategory}){
    const dispatch = useDispatch();
    const likesList = useSelector(getEditLike)

    return(
        <>
        <Dropdown.Menu show style = {{position:"inherit", border:'none', boxShadow: 'rgba(0, 0, 0, 0.07) 0px 2px 15px -3px, rgba(0, 0, 0, 0.04) 0px 10px 20px -2px', borderRadius:'0.5rem'}}>
            <Dropdown.Item eventKey={1} onClick={() => updateCategory(1)}>
               <FaUserFriends/>  Friends
            </Dropdown.Item>
            <Dropdown.Item eventKey={2} onClick={() => {dispatch(mostLikedPost(likesList.liked))}}>
               <AiOutlineStock/>  Popular
            </Dropdown.Item>
            <Dropdown.Item eventKey={3} onClick={()=>{dispatch(recentPost())}}>
                <ImNewspaper/>  Recent
            </Dropdown.Item>
            <Dropdown.Item eventKey={3} onClick={()=>{dispatch(latestPost())}}>
                <ImNewspaper/>  Latest
            </Dropdown.Item>
        </Dropdown.Menu>
        </>
    )
}
export default Categories;