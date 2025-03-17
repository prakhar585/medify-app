import React from "react";
import { useTheme } from "@mui/material/styles";
import "./NavBar.css";
import logo from "./../../images/Group 7.png";

const Navbar = () => {
  const theme = useTheme();

  return (
    <div>
      <div
        className="info-bar"
        style={{ backgroundColor: theme.palette.primary.main }}
      >
        <p>
          The health and well being of our patients and their health care teams
          will always be our priority, so we follow the best practices for
          cleanliness
        </p>
      </div>
      <div className="navbar">
        <div className="logo-container">
          <img src={logo} alt="logo" />
        </div>
        <div className="tab-container">
            <div className="tab-item">Find doctors</div>
            <div className="tab-item"> Hospitals</div>
            <div className="tab-item"> medicine</div>
            <div className="tab-item">Surgeries</div>
            < div className="tab-item">software for provider</div>
            <div className="tab-item">Facilities</div>
        </div>
        <button
          className="my-booking-button"
          style={{
            backgroundColor: theme.palette.primary.main,
            color: "white",
          }}
        >
          My Bookings
        </button>
      </div>
    </div>
  );
};

export default Navbar;
