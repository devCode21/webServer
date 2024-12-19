import React from 'react'
import Nav from './components/Nav'
import ListingBox from './components/ListingBox'
import Operators from './components/Operators'
import Footer from './components/footer'


function Home() {
   const data=localStorage.getItem('AccessToken')
   console.log(data)


  return (
    <>
      <div className='Home' id='home'>
          <Nav/>
          
          <ListingBox/>
          <Operators/>
     </div> 
     <Footer/>
    </>
  )
}

export default Home
