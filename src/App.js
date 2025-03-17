import "./App.css";
import Select from "react-select";
import axios from "axios";
import Navbar from "./components/Navbar/NavBar";
import Hero from "./components/Hero/Hero";
import { useEffect, useState } from "react";

function App() {
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  //fetch, state

  useEffect(() => {
    const getState = async () => {
      try {
        const response = await axios.get(`
https://meddata-backend.onrender.com/states`);
        const data = response.data;

        const formattedData = data.map((state) => ({
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

  useEffect(() => {
    const getCity = async () => {
      try {
        const response = await axios.get(
          `https://meddata-backend.onrender.com/cities/${state} `
        );
        const data = response.data;
        console.log(data);
        const formattedData = data.map((city) => ({
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

  const handleChange = (selectedOption) => {
    setState(selectedOption.value);
  };

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <div className="dropdown">
        <div className="dropdown-container">
          <div id="state">
            <Select className="select" onChange={handleChange} options={stateList} />
          </div>
          <div id="city">
            <Select className="select" options={cityList} />
          </div>
          <button>Search</button>
        </div>
        <div>You may be looking for</div>
        <div></div>
      </div>
    </div>
  );
}

export default App;
