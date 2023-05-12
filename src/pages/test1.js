
import React, {useState, useEffect} from "react";
import axios from 'axios';

function Test1() {
    const [data, setData] = useState([]);
    const [dataSearched,setDataSearched] = useState([]);
    

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'https://youtube-v31.p.rapidapi.com/search',
            params: {
              q: 'music',
              part: 'snippet,id',
              regionCode: 'US',
              maxResults: '50',
              order: 'date'
            },
            headers: {
              'content-type': 'application/octet-stream',
              'X-RapidAPI-Key': '4b7b329e47msh3b23f1a1384fd74p1497d6jsnf8ac011be5ee',
              'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
            }
          }).then(response => {
            setData(...data, response.data.items)
            
        })
          .catch(error => console.error(error) )
    },[])

    function getArray(word){
        const array = 
        data.filter((data) => data.snippet.title.toLowerCase().includes(word.toLowerCase())).map(function(data){
            return data.snippet.title})
        setDataSearched(array)        
    }
        

    const handleClick = (event) => {
        event.preventDefault();
        getArray(event.target.searchedWord.value)
    }

    return(
        <>
        <h1>This test is used for timeout creations</h1>
        <form onSubmit={handleClick}>
            <input type={"text"} placeholder='search' name = "searchedWord"></input>
            <input type={"submit"}></input>
        </form>

        {   React.Children.toArray(
            dataSearched.map((data) => (
            <>
            <h1>{data}</h1>
            </>
        )))
        }
        
        </>
    );
}
export default Test1;