import React, {useState,useEffect} from "react";
import axios from "axios";

function Test2() {
    const  [word,setWord] = useState("")

    const wordChange = (e) => {
        setWord(e.target.value)
    }

    return(
        <>
        <h1>This is to test out Debouncing</h1>
        
        <input type="text" placeholder="search" onChange={wordChange}></input>
        
        
        </>
    )

}
export default Test2;