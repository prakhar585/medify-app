import "./App.css";
import Navbar from "./components/Navbar/NavBar";
import Hero from "./components/Hero/Hero";
import React from 'react'
import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";



function App() {
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
    <div className="App">
      <Navbar />
      <Hero />

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

    </div>
  );
}

export default App;





// import "./App.css";
// import Select from "react-select";
// import axios from "axios";
// import Navbar from "./components/Navbar/NavBar";
// import Hero from "./components/Hero/Hero";
// import { useEffect, useState } from "react";
// import { useTheme } from "@mui/material/styles";
// import { useNavigate } from "react-router-dom";

// function App( { handleData } ) {
//   const [stateList, setStateList] = useState([]);
//   const [cityList, setCityList] = useState([]);
//   const [state, setState] = useState("");
//   const [city, setCity] = useState("");
//   const theme = useTheme();
//   const navigate = useNavigate(); 
  
//   //fetch, state

//   useEffect(() => {
//     const getState = async () => {
//       try {
//         const response = await axios.get(`
// https://meddata-backend.onrender.com/states`);
//         const data = response.data;

//         const formattedData = data.map((state) => ({
//           value: state,
//           label: state,
//         }));
//         setStateList(formattedData);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     getState();
//   }, []);

//   useEffect(() => {
//     if(!state) return;

//     const getCity = async () => {
//       try {
//         const response = await axios.get(
//           `https://meddata-backend.onrender.com/cities/${state} `
//         );
//         const data = response.data;
//         console.log(data);
//         const formattedData = data.map((city) => ({
//           value: city,
//           label: city,
//         }));
//         setCityList(formattedData);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     getCity();
//   }, [state]);

//   const handleState = (selectedOption) => {
//     setState(selectedOption.value);
//   };
//   const handleCity = (selectedOption) => {
//     setCity(selectedOption.value);
//   };
//   const handleformSubmit =(e)=>{
//     e.preventDefault();
//     if (!city || !state) {
//       alert("Please select both state and city!");
//       return;
//     }
//     navigate(`/my-bookings?state=${state}&city=${city}`);
//   }

//   return (
//     <div className="App">
//       <Navbar />
//       <Hero />
      
//       <div className="dropdown">
//         <div className="dropdown-container">
//         <form onSubmit={(e)=>handleformSubmit(e)} className="form">
//           <div id="state">
//             <Select className="select" onChange={handleState} options={stateList} />
//           </div>
//           <div id="city">
//             <Select className="select" onChange={handleCity} options={cityList} />
//           </div>
//           <button type="submit" className="dropdown-button" style={{backgroundColor: theme.palette.primary.main }}>Search</button>
//         </form>
//         </div>
//         <div>You may be looking for</div>
//         <div></div>
//       </div>
//     </div>
//   );
// }

// export default App;
