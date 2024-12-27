import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router' 
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHouse, faUser,faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'



export default function Nav() {
 

const [search, setSearch]=useState('')


const handleSearch=async()=>{
      if(search!=""){
         console.log(search)
      }

      

    
}

const[src,setSrc]=useState(false)

useEffect(()=>{
    if(src===true){
      const serachdata=async()=>{
         const data= await axios.post('https://webserver-ant9.onrender.com/listings/search',{Location:search})
        
         console.log(data)
  
      }
      serachdata()
     
    }
    setSrc(false)
},[handleSearch])
  
const[btn, setbtn]=useState(1)
 
let data=localStorage.getItem('AccessToken')



useEffect(()=>{
   
},[data,btn])

console.log(data)

 

  
const Owner=(localStorage.getItem("AccessToken"))

  
 
 const handleLogout=async(e)=>{
    e.preventDefault()
   setTimeout(async() => {
    setbtn((prev)=>(prev+1))
    localStorage.clear()
    const LoggedOut=await axios.post('https://webserver-ant9.onrender.com/user/logout',Owner,
     {headers:{
        'Authorization':`Bearer ${Owner}`
      }})

     console.log(LoggedOut)

   }, 100);

 }

 
  
  return (
    <>
      <nav>
        <div className="navLinks">
           <FontAwesomeIcon className='homeicon' color='black' icon={faHouse} size='2x' /> 
           Home
           </div>
        <div className="navLinks" id="search">
            <input type="text" placeholder='Enter the Location/Country/Name' value={search} onChange={(e)=>(setSearch(e.target.value))}/>

            <button  style={{border:'none'}} onClick={(e)=>(e.preventDefault(),handleSearch(),setSrc(true))}><FontAwesomeIcon className='searchIcon' icon={faMagnifyingGlass} size='2x'  /></button>
           
            
        </div>
        {
          data? <div className="navLinks " onClick={handleLogout}> <FontAwesomeIcon className='profileIcon' icon={faUser}  size='2x ' />LogOut </div>: <div className="navLinks logSignbox" 
           >
            <span className='LogSignup'>
           <Link to={'/Login'} style={{  color:'black'}}>Login {data}</Link>
            </span>
            <span className='LogSignup' >
            <Link to={'/signup'} style={{color:'black'}}>Signup</Link>
            </span>
            
         </div>
       
        }
       
      </nav>
    
    </>
  )
}


