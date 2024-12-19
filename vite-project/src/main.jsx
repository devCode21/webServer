import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHouse, faUser,faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import App from "./App";
import ReactDOM from 'react-dom/client';
import LisDetail from "./LisDetail";
import AddListingPage from "./AddListingPage";
import UpdateLis from "./UpdateLis";
import Login from "./Login.";
import Signup from "./Signup";
import YourLis from './components/yourListing'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App/>} />
      <Route path='createLis' element={<AddListingPage/>} />
      <Route path=':id/updateLis' element={<UpdateLis/>} />
      <Route path=':id/LisDetail' element={<LisDetail/>} />
      <Route path='Login'  element={<Login/>}/>
      <Route path="signup" element={<Signup/>}/>
      <Route path="yourLis" element={<YourLis/>}/>

    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(

    <RouterProvider router={router} />
 
);
