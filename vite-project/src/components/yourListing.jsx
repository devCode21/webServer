import axios, { Axios } from 'axios'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router'
import Footer from './footer'
import Nav from './Nav'
    
  



function YourLis() {
    const Owner=localStorage.getItem("AccessToken")
   const [data , setData]=useState([])
  useEffect( ()=>{
    const dataCall=async()=>{
      const res=await axios.get('https://webserver-ant9.onrender.com/listings/yourLis',{headers:{
        'Authorization':`Bearer ${Owner}`
     }})
      let setDatadata=await res.data.data
      setData(setDatadata)
     }
     dataCall()
  },[])





  return (

    <> 
        <Nav/>
        {
          
            data ? data.map((ele)=>(
             
               <div key={ele._id} className='Lis'>
                <Link to={`/${ele._id}/LisDetail`}  style={{color:'white'}}>
                {ele.image?.url? <img src={ele.image.url} />:''}
                <p>{ele.title}</p>
                <p>${ele.price}/night</p>
                </Link>
              </div>
             
           )):<div>no Lis</div>
          
          
        }
       
        <Footer/>
    </>

  )
}


function ListingBox() {
  return (
   <>
    <div className='ListingBox' style={{backgroundColor:'lavenderblush'}}>
         <YourLis/>
        
    </div>
   </>
  )
}

export default ListingBox

