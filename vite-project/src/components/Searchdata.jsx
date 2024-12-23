import { useNavigate } from "react-router"
import { useLocation } from "react-router"

function searchListings() {
   
    const location = useLocation();
    const { data1} = location.state || {}; // Access the state passed
    
    console.log("state", data1); // Should log 'abc
  
    const Owner=localStorage.getItem('AccessToken')
    const data=[]  
    const navigate=useNavigate()
  
   
  
    if(data.length==0){
      return(
        <>
         <div className="loader"></div>
        </>
      )
    }
   
  
    return (
      <> 
  
            
    hello
  
     
      </>
    )
  }



 
  
  export default searchListings
  