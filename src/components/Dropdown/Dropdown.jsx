// import React from "react";
// import { useEffect, useState } from "react";
// import Select from "react-select";
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
//         console.error(error);
//       }
//     };

//     getState();
//   }, []);

//   useEffect(() => {
//     if (!state) {
//         setCityList([]); // Clear cities when no state is selected
//         return;
//     }

//     const fetchCities = async () => {
//         try {
//             const response = await axios.get(
//                 `https://meddata-backend.onrender.com/cities/${state}`
//             );
//             const formattedData = response.data.map((city) => ({
//                 value: city,
//                 label: city,
//             }));
//             setCityList(formattedData);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     setTimeout(fetchCities, 100); // Small delay to allow state update

// }, [state]);


//   const handleStateChange = (event) => {
//     const selectedState = event.target.value;
//     setState(selectedState);
//     console.log(`stats is ${state}`);
//     setCity(""); // Reset city when state changes
//     setCity([]);


//   };


//   const getHospitals =async ()=>{

//     try {
//       const response = await axios.get(
//         `https://meddata-backend.onrender.com/data?state=${state}&city=${city}`
//       );
//       console.log(`hospital data fetched `,response.data)
      
//     } catch (error) {
//       console.error(error);
//     }

//   }

//   useEffect(() => {
//     if (state && city) {
//         getHospitals();
//     }
// }, [state, city]);


//   const handleCityChange = (event) => {
//     setCity(event.target.value);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     if (!state || !city) return; // Prevent API call with empty values
//     getHospitals();
//     navigate({
//       pathname:'/search',
//       search:`?state=${state}&city=${city}`,
//     });
//   };

//   return (
//     <div className="dropdown">
//       <div className="dropdown-container">
//         <form onSubmit={handleFormSubmit} className="form">
//           <div id="state">
//             <select
//               className="select"
//               onChange={e=>handleStateChange(e)}
//             >
//               <option value="" disabled selected>State</option>
//               {stateList.map((option) => (
//                 <option key={option.value} value={option.label}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div id="city">
//             <select
//               className="select"
//               onChange={e=>handleCityChange(e)}
//             >
//               <option value="" disabled selected>city</option>
//             {cityList.map((option) => (
//               <option key={option.value} value={option.label}>
//                 {option.label}
//               </option>
//             ))}
//             </select>
//           </div>


//           <button
//             type="submit"
//             className="dropdown-button"
//             style={{ backgroundColor: theme.palette.primary.main }}
//           >
//             Search
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Dropdown;

// /* <div className="dropdown">
// <div className="dropdown-container">
// <form onSubmit={handleFormSubmit} className="form">
//   <div id="state">
//     <Select
//       className="select"
//       onChange={handleStateChange}
//       options={stateList}
//       value={state ? { value: state, label: state } : null}
//     />
//   </div>
//   <div id="city">
//     <Select
//       className="select"
//       onChange={handleCityChange}
//       options={cityList}
//       value={city ? { value: city, label: city } : null}
//       isDisabled={!state}
//     />
//   </div>
//   <button
//     type="submit"
//     className="dropdown-button"
//     style={{ backgroundColor: theme.palette.primary.main }}
//   >
//     Search
//   </button>
// </form>
// </div>

// </div>*/
import { MenuItem, Select, Button, InputAdornment, Box } from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SearchHospital() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({ state: "", city: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(
          "https://meddata-backend.onrender.com/states"
        );
        setStates(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    if (!formData.state) {
      setCities([]); // Clear cities when state changes
      return;
    }

    const fetchCities = async () => {
      try {
        const data = await axios.get(
          `https://meddata-backend.onrender.com/cities/${formData.state}`
        );
        setCities(data.data);
      } catch (error) {
        console.log("Error in fetching city:", error);
      }
    };

    fetchCities();
  }, [formData.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.state && formData.city) {
      navigate(`/search?state=${formData.state}&city=${formData.city}`);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        gap: 4,
        justifyContent: "space-between",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* State Dropdown */}
      <Select
        displayEmpty
        id="state"
        name="state"
        value={formData.state}
        onChange={handleChange}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        required
        sx={{ minWidth: 200, width: "100%" }}
      >
        <MenuItem disabled value="">
          State
        </MenuItem>
        {states.map((state) => (
          <MenuItem key={state} value={state}>
            {state}
          </MenuItem>
        ))}
      </Select>

      {/* City Dropdown */}
      <Select
        displayEmpty
        id="city"
        name="city"
        value={formData.city}
        onChange={handleChange}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        required
        sx={{ minWidth: 200, width: "100%" }}
      >
        <MenuItem disabled value="">
          City
        </MenuItem>
        {cities.map((city) => (
          <MenuItem key={city} value={city}>
            {city}
          </MenuItem>
        ))}
      </Select>

      {/* Search Button */}
      <Button
        type="submit"
        variant="contained"
        size="large"
        startIcon={<SearchIcon />}
        sx={{ py: "15px", px: 8, flexShrink: 0 }}
        disableElevation
      >
        Search
      </Button>
    </Box>
  );
}

