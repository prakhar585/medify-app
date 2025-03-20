// import React from "react";
// import { useState } from "react";
// import hospitalImage from "./../../images/NicePng_doctor-png_336282 1.png";
// import "./HospitalCard.css";
// import { useTheme } from "@mui/material/styles";
// import SlotBooking from "../SlotBooking/SlotBooking";

// const HospitalCard = ({ hospital }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const theme = useTheme();

//   const handleClick=()=>{
//     setIsVisible(!isVisible);
//   }

//   return (
//     <div className="container">
//       <div className="card">
//         <div className="image-section">
//           <img
//             className="hospital-image"
//             src={hospitalImage}
//             alt="hospital-image"
//           />
//         </div>
//         <div className="hospital-info">
//           <h3>{hospital['Hospital Name']}</h3>
//           <h5>
//             {hospital.City},{hospital['Country Name']}
//           </h5>
//           <p>FREE, consultation Fee at the clinic</p>
//         </div>
//         <div className="button-section">
//           <p>Available today</p>
//           <button
//             style={{
//               backgroundColor: theme.palette.primary.main,
//               color: "white",
//               height: "40px",
//               border: 0,
//               borderRadius: "5px",
//               paddingLeft: "10px",
//               paddingRight: "10px",
//             }}
//             onClick={handleClick}
//           >
//             Book FREE Center Visit
//           </button>
//         </div>
//       </div>
//      { isVisible && <div className="slots">
//         <SlotBooking />
//       </div>}
//     </div>
//   );
// };

// export default HospitalCard;
import React from "react";
import { useState } from "react";
import hospitalImage from "./../../images/hospital.png";
import "./HospitalCard.css";
import { useTheme } from "@mui/material/styles";
import SlotBooking from "../SlotBooking/SlotBooking";

const HospitalCard = ({ hospital }) => {
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();
  
  console.log(hospital);
  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="image-section">
          <img
            className="hospital-image"
            src={hospitalImage}
            alt="hospital-image"
          />
        </div>
        <div className="hospital-info">
          <h3 className="hospital-name">{hospital['Hospital Name']}</h3>
          <h5>
            {hospital.City}, {hospital.State || hospital['Country Name']}
          </h5>
          <p>FREE, consultation Fee at the clinic</p>
        </div>
        <div className="button-section">
          <p>Available today</p>
          <button
            style={{
              backgroundColor: theme.palette.primary.main,
              color: "white",
              height: "40px",
              border: 0,
              borderRadius: "5px",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
            onClick={handleClick}
          >
            Book FREE Center Visit
          </button>
        </div>
      </div>
      {isVisible && (
        <div className="slots">
          <SlotBooking hospital={hospital} />
        </div>
      )}
    </div>
  );
};

export default HospitalCard;