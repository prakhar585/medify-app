import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import './MyBookings.css';
import NavBar from './../components/Navbar/NavBar';
import Dropdown from "../components/Dropdown/Dropdown";
import HospitalCard from "../components/HospitalCard/HospitalCard";

const MyBookings = () => {
  const [hospitalList, setHospitalList ] = useState([])
  const [searchParams] = useSearchParams();

  // Retrieve values from URL query parameters
  const city = searchParams.get("city");
  const state = searchParams.get("state");

  console.log("City:", city);
  console.log("State:", state);

  useEffect(() => {

    const getHospitals =async ()=>{

      try {
        const response = await axios.get(`
          https://meddata-backend.onrender.com/data?state=${state}&city=${city}`);
          console.log(response.data);
          setHospitalList(response.data);
        } catch (error) {
          console.error(error);
        }
      }

      getHospitals();
  }, [state,city]);

  return <div className="body">
    <NavBar/>
    <Dropdown/>
    {hospitalList.map((hospital)=>(<HospitalCard hospital={hospital}/>))}
    
  
  </div>;
};

export default MyBookings;
