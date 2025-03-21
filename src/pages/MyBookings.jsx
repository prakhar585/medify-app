import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import './MyBookings.css';
import NavBar from './../components/Navbar/NavBar';
import Dropdown from "../components/Dropdown/Dropdown";
import HospitalCard from "../components/HospitalCard/HospitalCard";

const MyBookings = () => {

  const [bookings, setBookings] = useState([]);

  useEffect(()=>{
    const getDataFromLocalStorage=()=>{
      const data = localStorage.getItem('bookings');
      const MyBookings = JSON.parse(data);
      setBookings(MyBookings);
    }
  
    getDataFromLocalStorage();
  },[])
   
  
  return <div className="body">
    <NavBar/>
    <h1>My Bookings </h1>
    <Dropdown/>
    {bookings.map((hospital)=><HospitalCard hospital={hospital} bookingPage = {true}/>)}
   
    
  
  </div>;
};

export default MyBookings;
