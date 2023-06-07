import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import { useDispatch} from "react-redux";
import {updateSocial} from '../reduxFiles/actions';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';


function UploadSocial({id}){
    const dispatch = useDispatch();

    const [show,setShow] = useState(false);
    const [values,setValues] = useState("");
    const [category,setType] = useState("");
    const [isValidURL,setIsValidURL] = useState(true);
    const [isValidCategory, setIsValidCategory] = useState(true);
    const handleUrlChange = (event) => {
        const inputUrl = event.target.value;
        setValues(inputUrl);
        
        // Regular expression for URL validation
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        setIsValidURL(!urlPattern.test(inputUrl));
      };

    const handleCategories = (event) => {
        const input = event.target.value;
        setType(input)
        if (input === ""){
            setIsValidCategory(true)
        }else{
            setIsValidCategory(false)
        }
    }
    function handleSubmit(e) {
        e.preventDefault()
        const docRef = doc(db, 'accounts', id)
    
           dispatch(updateSocial(values, category)) 
           var update = {};
           update["social." + category] = values;
           updateDoc(docRef, update)
           setShow(false)
        
        
    }


    return(
        <>        
        <Button variant="primary" onClick={() => {setShow(true)}}>Change URL</Button>

        <Modal show = {show} onHide={()=>{setShow(false)}}>
            
            <Modal.Header closeButton>
            </Modal.Header>
            
            <Modal.Body>

                <Form onSubmit={handleSubmit}>
                    <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">URL</InputGroup.Text>
                    <Form.Control
                        type="text"
                        isInvalid={isValidURL}
                        placeholder="http://example"
                        aria-label="url"
                        aria-describedby="inputGroup-sizing-default"
                        onChange={handleUrlChange}
                    />
                    </InputGroup>
            
                    <Form.Select aria-label="selectURL" 
                        onChange={handleCategories} 
                        style={{marginBottom:"16px"}}
                        isInvalid={isValidCategory}
                    > 
                        <option value={''}></option>
                        <option value={'instagram'}>Instagram</option>
                        <option value={'facebook'}>Facebook</option>
                        <option value={'twitter'}>Twitter</option>
                        <option value={'pinterest'}>Pinterest</option>
                    </Form.Select>

                <Button variant="primary" type="submit" style={{pointerEvents: (!isValidURL || !isValidCategory) ? "auto" : "none", background: (!isValidURL || !isValidCategory) ? "": "grey"}}>Save changes</Button>
                </Form>

            </Modal.Body>

            
                           
        </Modal>

        </>
    )
} export default UploadSocial