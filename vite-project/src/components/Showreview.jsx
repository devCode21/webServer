import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

function Showreview({id}) {
  const [rev,setRev]=useState([])
  const[rev_id,setId]=useState('')
  const[del,setdel]=useState(false)
  const navigate=useNavigate()
  const Owner=localStorage.getItem("AccessToken")
  console.log(Owner)
  const OwnerName=localStorage.getItem("Name")

    useEffect(()=>{
             console.log(id)
             const data=async()=>{
             const res=await axios.post(`http://localhost:3000/revs/${id}/Showrev`,{
              headers:{
                 'Authorization':`Bearer ${Owner}`
              }})
             const  reviews=await res.data.data
             setRev(reviews)
             console.log(reviews)
   
         }
         data()
    },[])
    
    
 
  
    useEffect(()=>{
      console.log('rev',rev_id)
      if(del===true){
        const data=async()=>{
          const res=await axios.post(`http://localhost:3000/revs/${id}/${rev_id}/delRev`,data,{headers:{
              'Authorization':`Bearer ${Owner}`
          }})
          const  del_data=await res.data.data
          console.log(del_data)
        
          
 
      }
      data()
      setdel(false)
      }
     
     
},[del,rev_id])

  return (
        <>
        <div className="revBox">
            
        {rev.map((e)=>(
          <div key={e._id} className='showRev'>
            
            <p>{e.owner.name}</p>
            <p>{e.review}</p>
            
            {
              OwnerName==e.owner.name ? <div>
              <button onClick={()=>(setId(e._id),setdel(true),navigate('/') ,setTimeout(() => {
                  navigate(`/${id}/LisDetail`)
              }, 10))}>delete</button>
              <button>update</button>
              </div>:''
            }
             
           
            </div>
          
          
          ))}
          <br />

        </div>
   
        </>
          
  )
}

export default Showreview
