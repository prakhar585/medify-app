// import React, { useState, useEffect } from "react";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";

// // Custom Tab Panel component
// function CustomTabPanel({ children, value, index }) {
//   return (
//     <div role="tabpanel" hidden={value !== index}>
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// export default function SlotBooking() {
//   const [selectedTab, setSelectedTab] = useState(0);
//   const [slots, setSlots] = useState({ morning: [], afternoon: [], evening: [] });

//   // Generate dynamic date labels (Today, Tomorrow, Day After)
//   const getFormattedDate = (daysToAdd) => {
//     const date = new Date();
//     date.setDate(date.getDate() + daysToAdd);
//     return date.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "short" });
//   };

//   const tabLabels = [getFormattedDate(0), getFormattedDate(1), getFormattedDate(2)];

//   // Function to generate slots
//   const generateSlots = () => ({
//     morning: ["11:30 AM"],
//     afternoon: ["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM"],
//     evening: ["6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM"],
//   });

//   useEffect(() => {
//     setSlots(generateSlots());
//   }, [selectedTab]);

//   return (
//     <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", mt: 3, p: 3, boxShadow: 3, borderRadius: 2 }}>
//       <Typography variant="h5" align="center" gutterBottom>
//         Available Slots
//       </Typography>

//       {/* Tabs */}
//       <Tabs value={selectedTab} onChange={(event, newValue) => setSelectedTab(newValue)} aria-label="availability tabs">
//         {tabLabels.map((label, index) => (
//           <Tab key={index} label={label} />
//         ))}
//       </Tabs>

//       {/* Tab Panels */}
//       {tabLabels.map((label, index) => (
//         <CustomTabPanel key={index} value={selectedTab} index={index}>
//           <Typography variant="h6" sx={{ mb: 2 }}>
//             Available Slots for {label}
//           </Typography>

//           {/* Morning Slots */}
//           <Box sx={{ mb: 2 }}>
//             <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
//               Morning
//             </Typography>
//             <Box sx={{ display: "flex", gap: 2 }}>
//               {slots.morning.map((slot, idx) => (
//                 <Typography key={idx} sx={{ p: 1, border: "1px solid gray", borderRadius: 1 }}>
//                   {slot}
//                 </Typography>
//               ))}
//             </Box>
//           </Box>

//           {/* Afternoon Slots */}
//           <Box sx={{ mb: 2 }}>
//             <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
//               Afternoon
//             </Typography>
//             <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
//               {slots.afternoon.map((slot, idx) => (
//                 <Typography key={idx} sx={{ p: 1, border: "1px solid gray", borderRadius: 1 }}>
//                   {slot}
//                 </Typography>
//               ))}
//             </Box>
//           </Box>

//           {/* Evening Slots */}
//           <Box>
//             <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
//               Evening
//             </Typography>
//             <Box sx={{ display: "flex", gap: 2 }}>
//               {slots.evening.map((slot, idx) => (
//                 <Typography key={idx} sx={{ p: 1, border: "1px solid gray", borderRadius: 1 }}>
//                   {slot}
//                 </Typography>
//               ))}
//             </Box>
//           </Box>
//         </CustomTabPanel>
//       ))}
//     </Box>
//   );
// }
import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import './Slotbooking.css'

const SlotBooking = ({ hospital }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const theme = useTheme();

  // Handle booking confirmation and save to localStorage
  const confirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time");
      return;
    }

    const booking = {
      ...hospital,
      bookingDate: selectedDate === "Today" ? new Date().toISOString().split('T')[0] : "2024-12-15",
      bookingTime: selectedTime === "Morning" ? "10:00 AM" : 
                   selectedTime === "Afternoon" ? "2:00 PM" : 
                   selectedTime === "Evening" ? "6:00 PM" : selectedTime
    };

    // Get existing bookings from localStorage
    const existingBookings = localStorage.getItem("bookings") 
      ? JSON.parse(localStorage.getItem("bookings")) 
      : [];
    
    // Add new booking
    const updatedBookings = [...existingBookings, booking];
    
    // Save to localStorage
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    
    setIsBooked(true);
  };

  return (
    <div className="slot-booking">
      {!isBooked ? (
        <>
          <div className="date-selection">
            <h3>Select Date</h3>
            <div className="date-options">
              <p 
                className={selectedDate === "Today" ? "selected" : ""} 
                onClick={() => setSelectedDate("Today")}
              >
                Today
              </p>
              <p 
                className={selectedDate === "Tomorrow" ? "selected" : ""} 
                onClick={() => setSelectedDate("Tomorrow")}
              >
                Tomorrow
              </p>
              <p 
                className={selectedDate === "2024-12-15" ? "selected" : ""} 
                onClick={() => setSelectedDate("2024-12-15")}
              >
                Dec 15, 2024
              </p>
            </div>
          </div>
          
          <div className="time-selection">
            <h3>Select Time</h3>
            <div className="time-options">
              <p 
                className={selectedTime === "Morning" ? "selected" : ""} 
                onClick={() => setSelectedTime("Morning")}
              >
                Morning
              </p>
              <p 
                className={selectedTime === "Afternoon" ? "selected" : ""} 
                onClick={() => setSelectedTime("Afternoon")}
              >
                Afternoon
              </p>
              <p 
                className={selectedTime === "Evening" ? "selected" : ""} 
                onClick={() => setSelectedTime("Evening")}
              >
                Evening
              </p>
            </div>
          </div>
          
          <button 
            className="confirm-button" 
            style={{backgroundColor: theme.palette.primary.main, color: "white"}}
            onClick={confirmBooking}
          >
            Confirm Booking
          </button>
        </>
      ) : (
        <div className="booking-confirmation">
          <h3>Booking Confirmed!</h3>
          <p>Your appointment has been booked for {selectedDate} at {selectedTime}.</p>
          <p>Check your bookings on the My Bookings page.</p>
        </div>
      )}
    </div>
  );
};

export default SlotBooking;