import React from 'react'
import Nav from './components/Nav'
import Footer from './components/footer'
import { useState } from 'react'
import { useEffect } from 'react'

import { Link, useNavigate } from 'react-router'
import {useParams} from 'react-router'
import axios from 'axios'
import Writereview from './components/Writereview'
import Showreview from './components/Showreview'



function LisDetail() {

   const Navigate=useNavigate()

   
   const[Owner,setOwner]=useState('')
   const Owner1=(localStorage.getItem("AccessToken"))
   const user=localStorage.getItem("Name")

 
  

   const {id}=useParams()
   let[list,setLis]=useState({})
   
   const [res,setres]=useState({})
   
   useEffect(()=>{
      const data=async()=>{
          try {
  //populatre backend me karna hai fir data bhejna haia 
            const res1=await axios.get(`http://localhost:3000/listings/${id}/lis`,{headers:{
               'Authorization':`Bearer ${Owner1}`
            }})
          
             const lisdata=await res1.data.data.getLis
             setres(lisdata)
            let ownerData=await res1.data.data.Owner.Owner.name
            console.log(ownerData)
            setOwner(ownerData)
           
          } catch (error) {
             console.log(error)
          }
      }

      data()
   },[id])
   console.log(Owner)
   console.log(res)

   const del=(e)=>{
      e.preventDefault()
      const deleCall=async()=>{
         const res=await axios.post(`http://localhost:3000/listings/${id}/deleteLis`)
         const res1=await res.data
         console.log(res1)
      }
      deleCall()
      setTimeout(()=>{
         Navigate('/') 
   },1000)
   }
   console.log(Owner,user)

  return (
    <>
     <Nav/>
     <div className="lists" id='LisDetail' >
     <div className="lis_img">
         <img src={res.image?.url||'abc'} alt="" />
      </div>
      <div className="lisdetail">
         
         <h1>{res.title}</h1>
         <p style={{fontFamily:'monospace'}}> {<b style={{color:'black',marginBottom:'2rem'}}> Description</b>} {<br/>} {<br/>} {res.description ||'good place to visit'} </p>
         <h2><b><span>Price </span>{}= {} {}{res.price }</b></h2>
         <div style={{display:'flex', fontSize:'1rem',justifyContent:'space-between'}}>
         <h2 > <span>Location/State </span>: {res.location}</h2>
         <h2 style={{marginRight:'5rem'}}> <span> Country </span>: {} {res.country}</h2>
         </div>
         <div className='btn'>
       {
         Owner==user? <><button ><Link to={`/${id}/updateLis`}>Update</Link></button>
         <button onClick={del }>Delete</button>
 </>: ' '
       }

     </div>
      </div>
     </div>
    
      
      <Writereview id={id}/>
      <Showreview id={id}/>
     <Footer/>
    </>
  )
}

export default LisDetail
