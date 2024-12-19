import React, { useEffect } from 'react'
import { useState } from 'react'
import Nav from './components/Nav'
import Footer from './components/footer'
import axios from 'axios'
import { useParams } from 'react-router'
function UpdateLis(){
 
  const Owner=(localStorage.getItem("AccessToken"))
  const {id}=useParams()
  const [oldData, setoldData]=useState({})
  const[button,setbutton]=useState(0)

  useEffect(()=>{
    const newdata=async()=>{
        try {

          const res1=await axios.get(`http://localhost:3000/listings/${id}/lis`)
        
           const lisdata=await res1.data.data
            setoldData(lisdata)
            setTitle(lisdata.title)
            setCountry(lisdata.country)
            setLocation(lisdata.location)
            setPrice(lisdata.price)
            setdes(lisdata.description)
        } catch (error) {
           console.log(error)
        }
    }

    newdata()
 },[id])


 useEffect(()=>{
  

  const dataCall=async()=>{
   if(data==undefined){
     return console.log('no data')
   }
  
   const res=await axios.post(`http://localhost:3000/listings/${id}/updateLis`, data ,
    {headers:{
       'Authorization':`Bearer ${Owner}`
    }}
   )
   const newdata=await res.data
   console.log(res.data)


}
dataCall()

},[button])


 const onSubmit=()=>{
       
  const data1={
   title:title,
   location:location,
   country:country,
   price:price,
   description:des
  }
  setdata(data1)

  
}



 console.log(oldData.title)

 const[title,setTitle]=useState('' )
 const[location,setLocation]=useState('')
 const[country,setCountry]=useState('')
 const[price,setPrice]=useState(0)
 const[des,setdes]=useState('')
 const[data,setdata]=useState({})






  return (

    
    <>
    <Nav/>
      <div className='addLis'>
      <form  >
          
          <div className="add-detail">
            <label htmlFor="title">
              title
            </label>
            <input type="text" value={title} onChange={(e)=>(setTitle(e.target.value))} id="title" required={true} />
          </div>
           
           <div className='add-detail'>
             <label htmlFor="des">
                    description  
             </label>
             <input type="text" value={des} onChange={(e)=>(setdes(e.target.value))} id="des"   required={true}/>
           </div>

           <div className='add-detail'>
             <label htmlFor="location">location</label>
             <input type="text" value={location} onChange={(e)=>(setLocation(e.target.value))} id="location"  required={true} />
           </div>
           
           <div className='add-detail'>
             <label htmlFor="price"> price</label>
             <input type="Number" value={price} onChange={(e)=>(setPrice(e.target.value))} id="price"  required={true} />
           </div>

           <div className='add-detail'>
             <label htmlFor="country">country</label>
            <input type="text" value={country} onChange={(e)=>(setCountry(e.target.value))} id="country"  required={true} />
           </div>
          <button type='submit' onClick={(e)=>(e.preventDefault(),onSubmit(),setbutton((prev)=>(prev+1)))}>Submit</button>
       </form >
      <div>
       
        </div>
      
      </div>
    
  
     
      
     
      <Footer/>
    </>
  )
}

export default UpdateLis
