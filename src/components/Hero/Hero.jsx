import React from "react";
import doctors from "./../../images/NicePng_doctor-png_336282 1.png";
import "./../Hero/Hero.css";
import { useTheme } from "@mui/material/styles";

const Hero = () => {
    const theme = useTheme();
    
  return (
    <div className="section">
      <div className="heading">
        <h3> skip the travel! Find Online</h3>
        <br />
        <h1>
          <span>Medical</span>
          <span> Centers</span>
        </h1>
        <br />
        <p>
          connect instantly with a 24x7 specialist to choose to video visit a
          particular doctor
        </p>
        <button style={{backgroundColor: theme.palette.primary.main,color:'white', border:'0', height:'30px', borderRadius:'4px'}}>Find Centers</button>
      </div>
      <div className="hero-image">
        <img src={doctors} alt="hero image" />
      </div>
    </div>
  );
};

export default Hero;
