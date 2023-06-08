import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {FaRegComment} from 'react-icons/fa';
import { Col, Modal,Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {getEditComment} from "../reduxFiles/selectors";
import {setComments,putNewComment, setOtherUserComment} from '../reduxFiles/actions';
import { db } from '../firebase';
import {doc, getDoc, updateDoc, arrayUnion, collection} from 'firebase/firestore';

function CommentModal({commentID, userID}){
    
    
    const commentData = useSelector(getEditComment)
    const [show,setShow] = useState(false)
    const [newComment, setNewComment] = useState("")
    const dispatch = useDispatch();
    const commentDocument = doc(db,'comments',commentID)
    
    function getComments() { 
        getDoc(commentDocument)
        .then(response => {
            dispatch(setComments(response.data()))
                response.data().otherComments.map((data,index) => {
                const accountsdocument = doc(db,'accounts',data.userID)
                getDoc(accountsdocument).then(response => {
                    
                    dispatch(setOtherUserComment(response.data() , data.userID))
                })
            })
            
            

        }).catch(error => console.log(error.message))


    }

    //fuction used to render the info from each user in the comment section
    function otherCom(data){ 
        
        if (data.info != undefined){
            return(
            <p>{data.info.name}: {data.newComment}</p>
        )
        } else {
            return(<></>)
            }
    }
    
    const addComment = () => {

        
        dispatch(putNewComment(userID,newComment))
        const accountsdocument = doc(db,'accounts',userID)
                getDoc(accountsdocument).then(response => {
                    dispatch(setOtherUserComment(response.data(), userID))
                })

        updateDoc(commentDocument, {otherComments:arrayUnion({userID:userID,newComment:newComment})})
        setNewComment("")
        
    }

    const handleClose = () => setShow(false);

    const handleOpen = () => {
        
        getComments()
        //useSetTimeout to slow the pop up process and let smooth state change
        setTimeout(()=>{
           setShow(true)  
        },200)
        
    };
        
    

    return(
        <>
        <FaRegComment onClick = {handleOpen} style={{cursor:"pointer"}} />
        <Modal size = 'lg' centered show = {show} onHide={handleClose}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xs = {12} md = {6}>
                        <h3>{commentData.comments.title}</h3>
                        <img src= {commentData.comments.imgPostPath} style={{height:"300px",width: '-webkit-fill-available'}}></img>
                    </Col>
                    <Col xs = {8} md = {6}>
                        <Row>
                            {commentData.comments.mainComment}
                        </Row>
                        <hr/>
                        {commentData.comments.otherComments != undefined 
                        ?
                        commentData.comments.otherComments.map((data,index)=>
                            otherCom(data)  
                        )
                        :
                        <p>none</p>
                        }
                        
                        
                        <Row style={{position: 'absolute', bottom: '0px'}}>
                            <hr/>
                        <InputGroup className="mb-3" >
                            <Form.Control
                                placeholder="Comment..."
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                onChange = {event => {
                                    setNewComment(event.target.value)
                                }}
                                value={newComment}
                            />
                            <Button onClick = {addComment} variant="outline-secondary" id="button-addon2">
                                Add Comment
                            </Button>
                        </InputGroup>
                        </Row>
                    
                    </Col>                    
                </Row>
            </Modal.Body>
            
        </Modal>
        </>
    )
} export default CommentModal;