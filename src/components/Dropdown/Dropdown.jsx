// import React from "react";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useTheme } from "@mui/material/styles";
// import { useNavigate } from "react-router-dom";
// import "./Dropdown.css";

// const Dropdown = () => {
//   const [stateList, setStateList] = useState([]);
//   const [cityList, setCityList] = useState([]);
//   const [state, setState] = useState("");
//   const [city, setCity] = useState("");

//   const theme = useTheme();
//   const navigate = useNavigate();

//   // Fetch states
//   useEffect(() => {
//     const getState = async () => {
//       try {
//         const response = await axios.get(
//           "https://meddata-backend.onrender.com/states"
//         );
//         const formattedData = response.data.map((state) => ({
//           value: state,
//           label: state,
//         }));
//         setStateList(formattedData);
//       } catch (error) {
//         console.error("Error fetching states:", error);
//       }
//     };

//     getState();
//   }, []);

//   // Fetch cities when state changes
//   useEffect(() => {
//     if (!state) {
//       setCityList([]); // Clear cities when no state is selected
//       return;
//     }

//     const fetchCities = async () => {
//       try {
//         const response = await axios.get(
//           `https://meddata-backend.onrender.com/cities/${state}`
//         );
//         const formattedData = response.data.map((city) => ({
//           value: city,
//           label: city,
//         }));
//         setCityList(formattedData);
//       } catch (error) {
//         console.error("Error fetching cities:", error);
//       }
//     };

//     fetchCities(); // Remove the setTimeout
//   }, [state]);

//   // Fetch hospitals when both state and city are selected
//   useEffect(() => {
//     if (state && city) {
//       getHospitals();
//     }
//   }, [state, city]);

//   const handleStateChange = (event) => {
//     const selectedState = event.value;
//     setState(selectedState);
//     setCity(""); // Reset city when state changes
//   };

//   const handleCityChange = (event) => {
//     const selectedCity = event.value;
//     setCity(selectedCity);
//   };

//   const getHospitals = async () => {
//     try {
//       const response = await axios.get(
//         `https://meddata-backend.onrender.com/data?state=${state}&city=${city}`
//       );
//       console.log(`Hospital data fetched:`, response.data);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching hospitals:", error);
//       return [];
//     }
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     if (!state || !city) return; // Prevent navigation with empty values
    
//     navigate({
//       pathname: '/search',
//       search: `?state=${state}&city=${city}`,
//     });
//   };

//   return (
//     <div className="dropdown">
//       <div className="dropdown-container">
//         <form onSubmit={handleFormSubmit} className="form">
//           <div id="state">
//             <select
//               className="select"
//               value={state}
//               onChange={(e) => {
//                 setState(e.target.value);
//                 setCity(""); // Reset city when state changes
//               }}
//             >
//               <option value="" disabled>
//                 State
//               </option>
//               {stateList.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div id="city">
//             <select
//               className="select"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               disabled={!state}
//             >
//               <option value="" disabled>
//                 City
//               </option>
//               {cityList.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <button
//             type="submit"
//             className="dropdown-button"
//             style={{ backgroundColor: theme.palette.primary.main }}
//             disabled={!state || !city}
//           >
//             Search
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Dropdown;
import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import "./Dropdown.css";

const Dropdown = () => {
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  
  const stateDropdownRef = useRef(null);
  const cityDropdownRef = useRef(null);
  
  const theme = useTheme();
  const navigate = useNavigate();

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target)) {
        setStateDropdownOpen(false);
      }
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target)) {
        setCityDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        console.error("Error fetching states:", error);
      }
    };

    getState();
  }, []);

  // Fetch cities when state changes
  useEffect(() => {
    if (!state) {
      setCityList([]);
      return;
    }

    const fetchCities = async () => {
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
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [state]);

  // Fetch hospitals when both state and city are selected
  useEffect(() => {
    if (state && city) {
      getHospitals();
    }
  }, [state, city]);

  const handleStateSelect = (selectedState) => {
    setState(selectedState);
    setCity("");
    setStateDropdownOpen(false);
  };

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
    setCityDropdownOpen(false);
  };

  const getHospitals = async () => {
    try {
      const response = await axios.get(
        `https://meddata-backend.onrender.com/data?state=${state}&city=${city}`
      );
      console.log(`Hospital data fetched:`, response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      return [];
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!state || !city) return;
    
    navigate({
      pathname: '/search',
      search: `?state=${state}&city=${city}`,
    });
  };

  return (
    <div className="dropdown">
      <div className="dropdown-container">
        <form onSubmit={handleFormSubmit} className="form">
          <div id="state" ref={stateDropdownRef} className="custom-dropdown">
            <div 
              className="dropdown-header" 
              onClick={() => setStateDropdownOpen(!stateDropdownOpen)}
            >
              {state || "State"}
            </div>
            {stateDropdownOpen && (
              <ul className="dropdown-list">
                {stateList.map((option) => (
                  <li 
                    key={option.value} 
                    onClick={() => handleStateSelect(option.value)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div id="city" ref={cityDropdownRef} className="custom-dropdown">
            <div 
              className="dropdown-header" 
              onClick={() => state && setCityDropdownOpen(!cityDropdownOpen)}
              style={{ opacity: state ? 1 : 0.5 }}
            >
              {city || "City"}
            </div>
            {cityDropdownOpen && state && (
              <ul className="dropdown-list">
                {cityList.map((option) => (
                  <li 
                    key={option.value} 
                    onClick={() => handleCitySelect(option.value)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="submit"
            className="dropdown-button"
            style={{ backgroundColor: theme.palette.primary.main }}
            disabled={!state || !city}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dropdown;