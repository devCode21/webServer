import { useState, useEffect } from 'react';
import './App.css';
import Home from './Home';

function App() {
  // const [count, setCount] = useState([]); // State to store data from the backend
  
  // useEffect(() => {
    // This effect runs once when the component mounts
    // const fetchData = async () => {
      // try {
      //   const response = await axios.get('http://localhost:3000/listings/');
      //   setCount(response.data.data); // Update state with data from the response
      // } catch (error) {
      //   console.error('Error fetching data:', error); // Handle any errors
      // }
    // };

    // fetchData(); // Call the function to fetch data
  // }, []); // Empty array ensures this effect runs only once when the component mounts
  // console.log(count)
  return (
    // <div>
    //   <h1>Listings</h1>
    //   {/* Map over the listings data and display each listing */}
    //   {count.map((lis) => (
    //     <div key={lis._id}>
    //       <h2>{lis.title}</h2>
          
    //       <img src={lis.image?.url } alt={lis.title} />
    //     </div>
    //   ))}
    // </div>
    <>
      
      <Home/>
     
    </>
    
  );
}

export default App;
