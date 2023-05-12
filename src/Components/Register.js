
import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import UserPage from "../pages/UserPage";
import { useNavigate } from 'react-router-dom';
import { addDoc,collection, Firestore, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Register(){
  
  const auth = getAuth();

  //passing value from one page to another using state
  const [show,setShowModal] = useState(false);

  // Creating collection for account user
  const postsCollectionRef = collection(db, 'accounts');

  const addUser = async () =>{
    await addDoc(postsCollectionRef, {id:auth.currentUser.uid,name: values.accountName,email:auth.currentUser.email});
}

  const [error, setError] = useState("");
  const [values,setValues] = useState({
    name:'',
    email:'',
    password:'',
    passwordCheck:''
  });
  
  const validatePassword = () => {
    let isValid = true
    if (values.password !== '' && values.passwordCheck !== ''){
      if (values.password !== values.passwordCheck) {
        isValid = false
        setError('Passwords does not match')
      }
    }
    return isValid
  }
  
  let navigate = useNavigate();
  const register = e =>{
    e.preventDefault()
    setError('')
    if(validatePassword()){
      createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((res) => {
        addUser();
        navigate('/userpage')
      })
      .catch(err => setError(err.message))
    } 
  }


  const handleClose = () => setShowModal(false);
  
  const handleOpen = () => setShowModal(true);

  const updateField = event =>{
    setValues({
      ...values,
      [event.target.name]: event.target.value
    
    });
  


  };
  return(
    <>
    <button typeof = "button" className = "btn btn-info btn-lg btn-block"  onClick= {handleOpen}> Register here!</button>
    <Modal size= 'lg' centered show={show} onHide = {handleClose}>
        
        <Modal.Header closeButton style={{border:"none"}}>
        </Modal.Header>
        <Modal.Body className="card-body p-5">
          <Col>
          <Row className="mb-4 ">
            <h1 className="text-center mb-5">Register Now!!</h1>
            
          </Row>
          </Col>
          <Form onSubmit={register}>

          <Row className="mb-4">
            <Form.Group>
              <Form.Label>Account Name:</Form.Label>
              <Form.Control type="text" placeholder="Account" name = "name"  onChange={updateField}></Form.Control>
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
            
            <Button variant="primary" className="btn btn-info btn-lg " style={{color:'white'}} type = "submit" >
            Register
          </Button>
          <Link to={'/userpage'} state={values}> Demo Button</Link>
          </Row>
  
          </Form>
          
          
        </Modal.Body>
        <Modal.Footer style={{border:"none"}}>
          
        </Modal.Footer>
        
        
      </Modal>
      </>
  );

   
}

export default Register;