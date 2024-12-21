import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

function Writereview({id}) {
    const navigate=useNavigate()
    const[review,setreview]=useState('')
    const[btn, setbtn]=useState(false)
    const Owner=(localStorage.getItem("AccessToken"))

    const rev={
       review,
    }
    const onclick=(e)=>{
         e.preventDefault()
         setbtn(true)

         navigate(`/`)

         setTimeout(() => {
          navigate(`/${id}/LisDetail`)
         }, 10);
        
        
         
    }

    useEffect(()=>{
      console.log(id)
      console.log(btn,rev)
       
     

      if(btn==true){
      const data=async()=>{
      const res= await axios.post(`http://localhost:3000/revs/${id}/createRev`,{
        review:review
      },{
        headers:{
           'Authorization':`Bearer ${Owner}`
        }
      })
        const data=await res.data
        setreview('')
        console.log(data)
      }

      data()
      setbtn(false)
      }

    },[btn])


    useEffect(()=>{
      const dele=async()=>{
           const del=await axios.post('http://localhost:3000/revs/${id}/createRev')
      }
    })




    
  return (
    <div className='review'>
      
       {Owner ?<><label htmlFor="rev">Write a review</label>
        <input   name="" id="rev" value={review} onChange={(e)=>(setreview(e.target.value))} required={true} />
           
      
       <div>
       <button onClick={onclick}>Submit</button>
       <button onClick={(e)=>(e.preventDefault(),setreview(''))}>cancel</button>
       </div></>:<div style={{fontFamily:'monospace',fontSize:'2rem', color:'rebeccapurple'}}>'Login Required to write Review'</div>}
        
    </div>)
  
}

export default Writereview
