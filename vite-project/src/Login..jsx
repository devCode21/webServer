import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHouse, faUser,faMagnifyingGlass,faPlus} from '@fortawesome/free-solid-svg-icons' 
import img from '../src/assets/login.svg'
function Login() {

    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const [confirmPassword,setconfirmPassword]=useState('')
    const[checkPass,setCheckpass]=useState(0)
    const[clickbtn,setClickbtn]=useState(1)
    const [showmsg,setmsg]=useState(false)
    const navigate=useNavigate()
   const [user,setUser]=useState('')
    const Logindata={
        email,
        password
    }
    
    const Login=async()=> {


      try {
        const res=await axios.post('https://webserver-ant9.onrender.com/user/Login',Logindata )
         
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
      } catch (error) {
          console.log("error",error)
          setUser(error.response.data.message)
      }




}
    

  useEffect(()=>{
        clickbtn!=1?Login():''
      //   setTimeout(() => {
      //     navigate('/')
      // }, 7000);
       
  },[clickbtn])
  

  const redircet=()=>{
    setTimeout(() => {
      navigate('/')
  }, 7000);
  }
    
  

  console.log(user)
  return (
    <div className="LoginBox">
       <div className='Login' >

<div className="Profile" >
    <FontAwesomeIcon icon={faUser} size='7x' color='Blue'/>
</div>
 
 <div className="email" >
      {/* <label htmlFor="email"></label> */}
      <input type="text" id='email' required={true} onChange={(e)=>(setemail(e.target.value),setUser(''))}  placeholder='enter your email'/>
 </div>

  <div className="password">
      {/* <label htmlFor="password"></label> */}
       <input type='text' id='password' required={true} onChange={(e)=>(setpassword(e.target.value),setUser(''))}  placeholder='enter you password'/>
  </div>

  <button onClick={(e)=>(e.preventDefault,setClickbtn((prev)=>(prev+1)))}>Login</button>

  {checkPass==1?<div>password should be matched </div>:'' }

  {console.log(checkPass)}

  {
   showmsg===true?<div style={{color:'green'}}>
         "Login Successfully"
       
   </div>:''

  }

  {
    user && user.length>0 ?<div>{user} </div>:" "
  }



</div>
   <div className="login_img">
     <img src={img}      />
   </div>
    </div>
   
  )
}

export default Login
