import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import './MyBookings.css';
import NavBar from './../components/Navbar/NavBar';
import Dropdown from "../components/Dropdown/Dropdown";
import HospitalCard from "../components/HospitalCard/HospitalCard";

const MyBookings = () => {
  






  return <div className="body">
    <NavBar/>
    <h1>My Bookings </h1>
    <Dropdown/>
   
    
  
  </div>;
};

export default MyBookings;
