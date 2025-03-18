import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Custom Tab Panel component
function CustomTabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function SlotBooking() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [slots, setSlots] = useState({ morning: [], afternoon: [], evening: [] });

  // Generate dynamic date labels (Today, Tomorrow, Day After)
  const getFormattedDate = (daysToAdd) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "short" });
  };

  const tabLabels = [getFormattedDate(0), getFormattedDate(1), getFormattedDate(2)];

  // Function to generate slots
  const generateSlots = () => ({
    morning: ["11:30 AM"],
    afternoon: ["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM"],
    evening: ["6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM"],
  });

  useEffect(() => {
    setSlots(generateSlots());
  }, [selectedTab]);

  return (
    <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", mt: 3, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Available Slots
      </Typography>

      {/* Tabs */}
      <Tabs value={selectedTab} onChange={(event, newValue) => setSelectedTab(newValue)} aria-label="availability tabs">
        {tabLabels.map((label, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>

      {/* Tab Panels */}
      {tabLabels.map((label, index) => (
        <CustomTabPanel key={index} value={selectedTab} index={index}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Available Slots for {label}
          </Typography>

          {/* Morning Slots */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
              Morning
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              {slots.morning.map((slot, idx) => (
                <Typography key={idx} sx={{ p: 1, border: "1px solid gray", borderRadius: 1 }}>
                  {slot}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Afternoon Slots */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
              Afternoon
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {slots.afternoon.map((slot, idx) => (
                <Typography key={idx} sx={{ p: 1, border: "1px solid gray", borderRadius: 1 }}>
                  {slot}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Evening Slots */}
          <Box>
            <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
              Evening
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              {slots.evening.map((slot, idx) => (
                <Typography key={idx} sx={{ p: 1, border: "1px solid gray", borderRadius: 1 }}>
                  {slot}
                </Typography>
              ))}
            </Box>
          </Box>
        </CustomTabPanel>
      ))}
    </Box>
  );
}
