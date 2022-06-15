
import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import UserPage from "../pages/UserPage";
import { Link } from "react-router-dom";

function Register(onOpen){

  const [show,setShowModal] = useState(onOpen);
  
  const [values,setValues] = useState({
    accountName:'',
    email:'',
    password:'',
    passwordCheck:''
  });


  console.log(show)
 
  const handleClose = () => setShowModal(false);
  
  const updateField = event =>{
    setValues({
      ...values,
      [event.target.name]: event.target.value
    
    });
  };
  return(
    
    <Modal size= 'lg' centered show = {show} onHide = {handleClose}>
        
        <Modal.Header closeButton style={{border:"none"}}>
        </Modal.Header>
        <Modal.Body className="card-body p-5">
          <Col>
          <Row className="mb-4 ">
            <h1 className="text-center mb-5">Register Now!!</h1>
            
          </Row>
          </Col>
          <Form>

          <Row className="mb-4">
            <Form.Group>
              <Form.Label>Account Name:</Form.Label>
              <Form.Control type="text" placeholder="Account" name = "accountName"  onChange={updateField}></Form.Control>
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" placeholder="Email" name = "email" onChange={updateField}></Form.Control>
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="Password" name = "password" onChange={updateField}></Form.Control>
            </Form.Group>
          </Row>
          <Row className="mb-5">
            <Form.Group>
              <Form.Label>Repeat your Password:</Form.Label>
              <Form.Control type="password" placeholder="Repeat Password" name = "passwordCheck" onChange={updateField}></Form.Control>
            </Form.Group>
          </Row >
          <Row className="d-flex justify-content-center">
            
            <Button variant="primary" className="btn btn-info btn-lg " style={{color:'white'}}>
            Register
          </Button>
          <Link to={'/userpage'} state={values}> hello</Link>
          </Row>
  
          </Form>
          
          
        </Modal.Body>
        <Modal.Footer style={{border:"none"}}>
          
        </Modal.Footer>
        
        
      </Modal>
      
  );

   
}

export default Register;