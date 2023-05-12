import {useState} from 'react';

function Testchild({name, func}) {

const [childName, setChildName] = useState("");

const [values,setValues] = useState([]);

const [myname, setMyName] = useState("");
const [surname, setSurname] = useState("");
const [city,setCity] = useState("");

const changeName = (event) => {
    setChildName(event.target.value);
}

const changeValue = (event) =>{
    
    setValues({...values,[event.target.name]: event.target.value})
    
}

const submitForm = (event) => {
    event.preventDefault();
    setMyName(values.name);
    setSurname(values.surname);
    setCity(values.city);
}

 return (
    <div>
        <h1>child here</h1>
        <input type= "text" placeholder='name' onChange={changeName}></input>
        <button onClick={() => func(childName)}>click</button>        
        <h1>{name}</h1>
        <hr/>

        <div>
            <h1>Name: {myname}</h1>
            <h1>Surname:{surname}</h1>
            <h1>City:{city}</h1>
        </div>

        <div>
            <form onSubmit={submitForm}>
            <label>name:</label>
            <input type='text' name = "name"  onChange={changeValue}></input>
            <hr/>
            <label>surname:</label>
            <input type='text' name = "surname" onChange={changeValue}></input>
            <hr/>
            <label>city:</label>
            <input type='text' name = "city" onChange={changeValue}></input>
            <hr/>
            <input type='submit'></input>
            </form>
        </div>

        
    </div>
);
}
export default Testchild;
