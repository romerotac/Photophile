import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useReducer, useState} from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { db } from '../firebase';
import Col from 'react-bootstrap/Col'
import { doc, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import {getEditProfileOfClicks} from "../reduxFiles/selectors";
import {editEmail, editName, editState, editfavoriteCamera} from '../reduxFiles/actions'
function EditModal({id,profile}) {
    const dispatch = useDispatch();
    const [show,setShow] = useState(false);
    const [values, setValues] = useState(profile);
  

    function handleSubmit(e) {
        e.preventDefault()
        const docRef = doc(db, 'accounts', id)
        if (values.name != profile.name  && values.name != undefined){
            updateDoc(docRef, {name:values.name}).then(response => {
                console.log(response)
                dispatch(editName(values.name))
            })}
        if (values.state != profile.state  && values.state != undefined){
            updateDoc(docRef, {state:values.state}).then(response => {
                console.log(response)
                dispatch(editState(values.state))
            })}
        if (values.email != profile.email  && values.email != undefined){
            updateDoc(docRef, {email:values.email}).then(response => {
                console.log(response)
                dispatch(editEmail(values.email))
            })}
        if (values.favoriteCamera != profile.favoriteCamera  && values.favoriteCamera != undefined){
            updateDoc(docRef, {favoriteCamera:values.favoriteCamera}).then(response => {
                console.log(response)
                dispatch(editfavoriteCamera(values.favoriteCamera))
            })}
        handleClose()
        
    }

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true)

    const updateField = event => {
        setValues({
            ...values,
            [event.target.name]:event.target.value
        })
    };

    return(
        <>
        <div className="col-sm-12"> 
            <a className="btn btn-info" target="__blank" onClick={handleOpen}>Edit</a>
        </div>
        <Modal size= 'lg' centered show={show} onHide = {handleClose} >  
        <Modal.Header closeButton style={{border:"none"}}>
        </Modal.Header>
        <Modal.Body className="card-body p-5">
          <Form onSubmit={handleSubmit}>

          <Row className="mb-4">
            <Form.Group>
              <Form.Label>Full Name:</Form.Label>
              <Form.Control type="text" placeholder={profile.name} name = "name"  onChange={updateField}></Form.Control>
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group>
              <Form.Label>State:</Form.Label>
              <Form.Control type="text" placeholder={profile.state} name = "state" onChange={updateField}></Form.Control>
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" placeholder={profile.email} name = "email" onChange={updateField}></Form.Control>
            </Form.Group>
          </Row>
          <Row className="mb-5">
            <Form.Group>
              <Form.Label>Favorite Camera:</Form.Label>
              <Form.Control type="text" placeholder={profile.favoriteCamera} name = "favoriteCamera" onChange={updateField}></Form.Control>
            </Form.Group>
          </Row >
          <Row className="d-flex justify-content-center">
            
            <Button variant="primary" className="btn btn-info btn-lg " style={{color:'white'}} type = "submit" >
            Change
          </Button>
          </Row>
          </Form>
          
          
        </Modal.Body>
        <Modal.Footer style={{border:"none"}}>
          
        </Modal.Footer>
        
        
      </Modal>
      </>
    );
}
export default EditModal;