import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from "react";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import {Link} from "react-router-dom";
import FormGroup from 'react-bootstrap/esm/FormGroup';

import {signOut} from "firebase/auth";

import { auth} from '../firebase';

function Navigation(){
    const [isAuth,setIsAuth] = useState(false);


    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            setIsAuth(false);
            window.location.pathname = "/";
        });
    };
    return(
        <>
        <Navbar bg="dark" variant="dark" expand="lg">
                        <Container fluid>
                        <Navbar.Brand href="/home">Home</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll"/>
                        <Navbar.Collapse id = 'navbarScroll' expand ='lg'>
                        
                        
                        <Nav className="me-auto">
                            <Nav.Link href = "/userpage">Profile</Nav.Link>
                            <Nav.Link href = "/events">Events</Nav.Link>
                            <Nav.Link href = "/friends">Friends</Nav.Link>
                            <Nav.Link href = "/marketplace">Marketplace</Nav.Link>
                        </Nav>


                        <Navbar.Collapse className="justify-content-center">

                        <Form className='d-flex'>
                            
                            <FormControl
                            type='search'
                            placeholder='Search'
                            className='me-2'
                            aria-label='Search'
                            />
                            <Button variant='outline-info'>Search</Button>
                           
                        </Form>

                        </Navbar.Collapse>

                        
                        
                        <Navbar.Collapse className="justify-content-end">
                        <Button onClick={signUserOut}>Logout</Button>
                        </Navbar.Collapse>
                       
                        
                        </Navbar.Collapse>
                        </Container>
         </Navbar>
        </>         
    );
}

export default Navigation;