import React, { useEffect, useState } from 'react'
// import AddListingName from './AddListing'
import Footer from './components/footer'
import Nav from './components/Nav'
import axios from 'axios'
import { useNavigate } from 'react-router'
import img1 from '../src/assets/Create.svg'



function AddListingPage() {

const[title,setTitle]=useState('')
const[location,setLocation]=useState('')
const[country,setCountry]=useState('')
const[price,setPrice]=useState(0)
const[des,setdes]=useState('')
const[data,setdata]=useState({})
const[button,setbutton]=useState(false)
const Owner=(localStorage.getItem("AccessToken"))
const collection=[title,location,country,price,des]
const [prev,setImgPreview]=useState('')
const[img,setImg]=useState(null)
const formData= new FormData()
const [imgUp,setimgup]=useState(false)
const Navigate=useNavigate()

const onSubmit=()=>{
 
       const data1={
        title:title,
        location:location,
        country:country,
        price:price,
        description:des,
       
       
       }
       setdata(data1)     
}

// chat gpt
Object.keys(data).forEach((key) => {
  formData.append(key, data[key]);
});

const handleImageChange = (e) => {
  console.log(e.target.files)
 
  const file = e.target.files[0];
  console.log(file)
  if (file &&file.name!=='') {
    setImg(file);
    const imageUrl = URL.createObjectURL(file); // Create a URL for the image
    setImgPreview(imageUrl); // Set the image preview URL
    setimgup(false)
  }
};
// 


useEffect(()=>{
    
    const dataCall=async()=>{
     if(button==true){
         console.log(img)
         formData.append("file",img)
         console.log(img)
       if(data==undefined){
          return console.log('no data')
        }
     
    const res=await axios.post('https://webserver-ant9.onrender.com/listings/CreateLis',formData,{headers:{
        'Authorization':`Bearer ${Owner}`,
        "Content-Type": "multipart/form-data"
      }})
      const newdata=await res.data
      console.log(res.data)
     }
     }
     dataCall()
     setbutton(false)
  
},[button])





console.log(data)
console.log(img)


if(!Owner){
  return(
    <>
      <div className="ErrorHandle">
          Login required
          { 
            setTimeout(() => {
               <>redirceting to Home page</>
               setTimeout(() => {
            
                Navigate('/')
             }, 5000)
            }, 1000)  
           
          }
      </div>
    </>
  )
}








  return (
    <> 
     <Nav/>
      <div className='addLis' style={{display:'flex'}}>

      
      <form  >
          
          <div className="add-detail">
            <label htmlFor="title">
              title
            </label>
            <input type="text" value={title} onChange={(e)=>(setTitle(e.target.value))} id="title" required={true} />
          </div>
          <div className="add-detail">
             <label htmlFor="input">UploadImg</label> 
             <input type='file' placeholder='upload image' onChange={handleImageChange}/>
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



         
         
          <button  type='submit' onClick={(e)=>(e.preventDefault(),onSubmit(),setbutton(true),Navigate('/'))}>Submit</button>


        </form >
      <div className='img'>
             <img className='addlisImage'   src={prev?prev:img1} alt="" />
        </div>
      
      </div>
      <Footer/>
    </>
  )
}

export default AddListingPage
