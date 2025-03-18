import React from 'react'
import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import './Dropdown.css';

const Dropdown = () => {
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
  
    const theme = useTheme();
    const navigate = useNavigate();
  
    // Fetch states
    useEffect(() => {
      const getState = async () => {
        try {
          const response = await axios.get(
            "https://meddata-backend.onrender.com/states"
          );
          const formattedData = response.data.map((state) => ({
            value: state,
            label: state,
          }));
          setStateList(formattedData);
        } catch (error) {
          console.error(error);
        }
      };
  
      getState();
    }, []);
  
    // Fetch cities based on selected state
    useEffect(() => {
      if (!state) return;
  
      const getCity = async () => {
        try {
          const response = await axios.get(
            `https://meddata-backend.onrender.com/cities/${state}`
          );
          const formattedData = response.data.map((city) => ({
            value: city,
            label: city,
          }));
          setCityList(formattedData);
        } catch (error) {
          console.error(error);
        }
      };
  
      getCity();
    }, [state]);
  
    const handleStateChange = (selectedOption) => {
      setState(selectedOption.value);
      setCity(""); // Reset city when state changes
    };
  
    const handleCityChange = (selectedOption) => {
      setCity(selectedOption.value);
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      if (!city || !state) {
        alert("Please select both state and city!");
        return;
      }
  
      navigate(`/my-bookings?state=${state}&city=${city}`);
    };
  
    return (
      <div className="dropdown">
        <div className="dropdown-container">
          <form onSubmit={handleFormSubmit} className="form">
            <div id="state">
              <Select
                className="select"
                onChange={handleStateChange}
                options={stateList}
                value={state ? { value: state, label: state } : null}
              />
            </div>
            <div id="city">
              <Select
                className="select"
                onChange={handleCityChange}
                options={cityList}
                value={city ? { value: city, label: city } : null}
                isDisabled={!state}
              />
            </div>
            <button
              type="submit"
              className="dropdown-button"
              style={{ backgroundColor: theme.palette.primary.main }}
            >
              Search
            </button>
          </form>
        </div>
       
      </div>
    );
}

export default Dropdown
