import axios, { Axios } from 'axios'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router'
    
  



function Listing() {
  


  
  const Owner=localStorage.getItem('AccessToken')

   const [data , setData]=useState([])
    useEffect( ()=>{
      const dataCall=async()=>{
      const res=await axios.get('https://webserver-ant9.onrender.com/listings/',Owner)
      let setDatadata=await res.data.data
      setData(setDatadata)
     }
     dataCall()
  },[])

  console.log(data)
 
  if(data.length==0){
    return(
      <>
       <div className="loader"></div>
      </>
    )
  }



  return (
    <> 
        {
          
            data && data.map((ele)=>(
             
               <div key={ele._id} className='Lis'>
                <Link to={`${ele._id}/LisDetail`}  style={{color:'white'}}>
                {ele.image?.url? <img src={ele.image.url} />:''}
                <p>{ele.title}</p>
                <p>${ele.price}/night</p>
                </Link>
                 {/* <button >View details</button> */}
              </div>
               
           ))
           

          

        }
    </>

  )
}

export default Listing
