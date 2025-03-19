import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import "./Dropdown.css";

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
        console.error("Error fetching states:", error);
      }
    };

    getState();
  }, []);

  // Fetch cities when state changes
  useEffect(() => {
    if (!state) {
      setCityList([]); // Clear cities when no state is selected
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

    fetchCities(); // Remove the setTimeout
  }, [state]);

  // Fetch hospitals when both state and city are selected
  useEffect(() => {
    if (state && city) {
      getHospitals();
    }
  }, [state, city]);

  const handleStateChange = (event) => {
    const selectedState = event.value;
    setState(selectedState);
    setCity(""); // Reset city when state changes
  };

  const handleCityChange = (event) => {
    const selectedCity = event.value;
    setCity(selectedCity);
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
    if (!state || !city) return; // Prevent navigation with empty values
    
    navigate({
      pathname: '/search',
      search: `?state=${state}&city=${city}`,
    });
  };

  return (
    <div className="dropdown">
      <div className="dropdown-container">
        <form onSubmit={handleFormSubmit} className="form">
          <div id="state">
            <select
              className="select"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setCity(""); // Reset city when state changes
              }}
            >
              <option value="" disabled>
                State
              </option>
              {stateList.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div id="city">
            <select
              className="select"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={!state}
            >
              <option value="" disabled>
                City
              </option>
              {cityList.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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

/* <div className="dropdown">
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

</div>*/
