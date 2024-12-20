import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import img from '../src/assets/login.svg'



function Signup() {
  

    const [email,setemail]=useState('')
    const [msg,setmsg]=useState(false)
    const navigate=useNavigate()
    const [password,setpassword]=useState('')
    const [confirmPassword,setconfirmPassword]=useState('')
    const[checkPass,setCheckpass]=useState(0)
    const[clickbtn,setClickbtn]=useState(0)
    const [name,setName]=useState('')
    const [BusinessName,setBusiness]=useState('')
    const CheckPassword=()=>{

        if(confirmPassword!==password){
            console.log("password matched wrong")
            setCheckpass(1)
            return
        }
        setCheckpass(0)
    }



    const Signupdata={
        email,
        password,
        BusinessName,
        name
    }
    
    const Login2=async()=> {
      const res=await axios.post('http://localhost:3000/user/Login',Signupdata )
      const res1=await res.data.data
    
      localStorage.clear()
      const data = localStorage.setItem('AccessToken',res1.AccessToken )
      const name=localStorage.setItem('Name',res1.LogUser.name)
    
     
      setmsg(true)
      console.log("res",res1.AccessToken)
    
      if(res1){
        setTimeout(() => {
          navigate('/')
      }, 3000)
      }
    
    
    
    
    }

    const Login=async()=> {
      const res=await axios.post('http://localhost:3000/user/reg',Signupdata )

      const res1=await res.data
      if(res.data.statuscode==200){
        setmsg(true)
      }
      if(res1){
        Login2()
      }
      console.log(res1)
     console.log(Signupdata)

}




    useEffect(()=>{
      if(clickbtn==1){
        Login()
       
        
      }
      setClickbtn(0)
      
    },[clickbtn])


  return (
    <div className="signupBox">
      <div className='signup '>
           
           <div className="Name">
                 <input type="text" id='name' required={true} value={name} onChange={(e)=>(setName(e.target.value))}  placeholder='enter your name'/>
            </div>

            <div className="business" >
                 
                 <input type="text" id='business' required={true} value={BusinessName} onChange={(e)=>(setBusiness(e.target.value))}  placeholder='enter your Business'/>
            </div>
            
            <div className="email" >
                 <input type="text" id='email' required={true} value={email} onChange={(e)=>(setemail(e.target.value))}  placeholder='enter your email'/>
            </div>

             <div className="password">
        
                  <input type='text' id='password' required={true} value={password} onChange={(e)=>(setpassword(e.target.value))}  placeholder='enter you password'/>
             </div>

             <div className="confirmPassword">
                   
                  <input type='text' id='confirmPassword' required={true} value={confirmPassword} onChange={(e)=>(setconfirmPassword(e.target.value))}  placeholder='enter confirm password'/>     
             </div>
             
             <button onClick={(e)=>(e.preventDefault,setClickbtn((prev)=>(prev+1)),setTimeout(()=>{
                     navigate('/')
             },(1000)))}>Signup</button>

            
             {checkPass==1?<div>password should be matched </div>:'' }
            {msg==true?<div style={{color:'green', fontSize:".5rem"}}> signuped Successfully </div>:''}
             {console.log(checkPass)}
      
        

     
    </div>
 
                <div className="login_img">
                  <img src={img}      />
                </div>
                


    </div>
  )
}
  

export default Signup
