import logo from './logo.svg';
import React, {useState} from "react";
import './App.css';

function App() {
  //change state or value inside the reactjs component
  
  //first parameter is valuename second function name
  const [result,setValue] = useState("");

  const [number1,setNumber1] = useState("");
  const [number2,setNumber2] = useState("");

  function Calculate(){

    setValue(number1 + number2);
  }
  return (
    <div className="App">
      <h1>Calculator</h1>
      <input type = "Number" onChange={(event)=>{
        setNumber1(Number(event.target.value));
      }}/>
      <input type = "Number" onChange={(event)=>{
        setNumber2(Number(event.target.value));
      }}/>
      <button onClick = {Calculate}> Calculate</button>
      <p>{result}</p>
    </div>
  );
}

export default App;
