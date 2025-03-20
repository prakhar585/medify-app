import React from "react";
import NavBar from "./../components/Navbar/NavBar";
import Dropdown from "./../components/Dropdown/Dropdown";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import HospitalCard from "../components/HospitalCard/HospitalCard";
import HospitalAd from './../images/hospitalAd.png'
import './Search.css';


const Search = () => {
  const [hospitalList, setHospitalList] = useState([]);
  const [searchParams] = useSearchParams();

  // Retrieve values from URL query parameters
  const city = searchParams.get("city");
  const state = searchParams.get("state");

  console.log("City:", city);
  console.log("State:", state);

  useEffect(() => {
    const getHospitals = async () => {
      try {
        const response = await axios.get(`
            https://meddata-backend.onrender.com/data?state=${state}&city=${city}`);
        console.log(response.data);
        setHospitalList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getHospitals();
  }, [state, city]);

  return (
    <div>
      <NavBar />
      <Dropdown />
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center",
          marginTop: "50px",
         }}
      >
        <Grid sx={{  }} container spacing={2}>
          <Grid sx={{ overflow:'hidden' }} size={{ xs: 12, md: 9 }}>
          {hospitalList.map((hospital)=>(<HospitalCard hospital={hospital}/>))}
          </Grid>
          <Grid className="ad-grid" size={{ xs: 12, md: 3 }}>
            <img  className="hospitalAd" src={HospitalAd} alt="hospital advertisment"/>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Search;
