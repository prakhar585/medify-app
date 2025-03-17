import React from 'react'
import { useSearchParams } from "react-router-dom";

const MyBookings = () => {
  const [searchParams] = useSearchParams();

  // Retrieve values from URL query parameters
  const city = searchParams.get("city");
  const state = searchParams.get("state");

  console.log("City:", city);
  console.log("State:", state);
  return <div>Displaying results for {city}, {state}</div>;
};

export default MyBookings
