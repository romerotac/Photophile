import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from "react";
import Navigation from '../Components/Navigation';
import Card from 'react-bootstrap/Card';
import Testchild from '../Components/testchild';
import axios from 'axios';

const id_video = `wi8RwDOCxhQ`;

function Test() {

    /*
    const [product, setProduct] = useState([]);

    const [name, setName] = useState("this");

    const changeName = (value) =>{
        setName(value)
    }

    useEffect(() => {
        fetch('https://dummyjson.com/products')
        .then((response) => response.json())
        .then((json) => {
            setProduct(json.products);
        })
    }, [])

    const mapData = () => {
        let filterData = product.filter((product) => {
            return product.price < 500;
        })
        setProduct(filterData)
    }
    */

    const [users, setUsers] = useState([])
    const [id, setId] = useState(0);
    const [current, setCurrent] = useState([])
    const fecthData = () =>{
        axios.get('https://randomuser.me/api/')
        .then((res) => {
        const {data} = res;
        const {results} = data
        const {
            name: {first,last},
            picture:{thumbnail},
        } = results[0]
        setUsers([...users,{name: `${first} ${last}`, picture: thumbnail}]);
        setId(users.length)
        console.log(users)
        })
        .catch((err) => {
           console.err() 
        });
        
    }

    const [dataYouTube, setDataYouTube] = useState([]);
    const [i,setI] = useState(0);
    
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
            setDataYouTube(...dataYouTube, response.data.items)
            
        })
          .catch(error => console.error(error) )
    },[])
    
      
    useEffect(()=>{
        fecthData();
    },[])

    const previousData = () => {
        if (id === 0){
            setId(id)
        }else{
           setId(id-1) 
        }
    }

    const nextData = () => {
        if (id === users.length-1) {
            fecthData()
        } else {
            setId(id+1)
        }
    }
    const [dataSearch, setDataSearch] = useState("")    
    const [applyFilter, setApplyFilter] = useState(false)
    const handleChange = (event) => {
        setDataSearch(event.target.value)
        setApplyFilter(false)
    }
    const searchData = (event) => {
        event.preventDefault();
        setApplyFilter(true)
    }

    return(
        <div>
        <h1>Test page</h1>
        <h2> click the button to fecth data</h2>
        <div style={{alignItems:"center"}}>
        <button onClick={previousData}>back</button>
        <button onClick={nextData}>next</button>
        
        </div>
        
        { id <= 0
        ? 
        <div>
        <h1>No user</h1>
        </div> 
        : 
        <div>
            <h1>{users[id].name}</h1>
            <img src={users[id].picture}></img>
        </div>
        
        }

        <div>
            <h1>Video trail</h1>

            <form onSubmit={searchData}>   
            <input type="text" placeholder='search' onChange={handleChange}></input>
            <input type='submit'></input>
            </form>
            
            {applyFilter === false 
            ?
            <h1></h1>
            :
            dataYouTube.filter(data => 
                    data.snippet.title.toLowerCase().includes(dataSearch.toLowerCase())
                ).map((data,index) => (
                    <h1 key = {index}> {data.snippet.title}</h1>
                ))
            }
            <hr/>
            <button onClick={() => {setI(i-1)}}>previous</button>
            <button onClick={() => {setI(i+1)}}> next </button>
            

            {
            dataYouTube.filter((data,index) => index === i).map((data,index) => (
            <>
            <div key = {index}>
                <div className='row'>
                 <h1>{data.snippet.title}</h1>  
                    <iframe width={420} height={315}
                        src={"https://www.youtube.com/embed/" + data.id.videoId}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full">
                    </iframe>   
                </div>
            </div>
            

            </>
            
            )
            )}
            

            {
            /*
            <h1>{dataYouTube.snippet.title}</h1>
            
                <iframe width="420" height="315"
                src={"https://www.youtube.com/embed/" + dataYouTube[0].id.videoId}>
                </iframe>  
            */
            }
            
                
                
                
        </div>
        </div>
    );
}
export default Test;