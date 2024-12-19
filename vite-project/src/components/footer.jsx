import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHouse, faUser,faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const MyComponent = () => (
  <FontAwesomeIcon icon={faFacebook} />
);

function Footer() {
  return (
    <div className='contact' style={{color:'black' }}>
      
      <div className='contact-info'>
     
        {/* <div className='conatact_msg' style={{fontSize:'20px',fontFamily:'monospace'}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div> */}
        <div className='contact_email' style={{fontSize:'30px',fontFamily:'monospace'}}> contact us on &nbsp;<b><u>abc@gmail.com</u></b></div>
        <div className='social-media '>
             <div className='media'> <i className='bx bxl-facebook-circle' style={{fontSize:'50px',color:'blue'}}></i></div>
             <div className='media'><i className='bx bxl-instagram' style={{fontSize:'50px',color:'blue'}} ></i></div>
             <div className='media'><i className='bx bxl-linkedin' style={{fontSize:'50px',color:'blue'}} ></i></div>
             <div className='media'><i className='bx bxl-twitter' style={{fontSize:'50px',color:'blue'}}></i></div>
        </div>
       
      </div>
      <div className="contact_img">
        <h1><b></b></h1>
      </div>
      
    </div>
  )
}

export default Footer
