import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHouse, faUser,faMagnifyingGlass,faPlus} from '@fortawesome/free-solid-svg-icons' 
function Operators() {
  
  const Owner=localStorage.getItem('AccessToken')

  return (
    <>
        {Owner && <div className='operator'>
            <button><Link to='/yourLis'>your Listings</Link></button>
            <button><Link to='/createLis' style={{color:'Black'}}><FontAwesomeIcon icon={faPlus} size='3x'/> <br /></Link></button>
            <button>your Profile</button>
      </div>}
    </>
  )
}

export default Operators
