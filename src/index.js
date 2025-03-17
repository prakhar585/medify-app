import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MyBookings from './pages/MyBookings';
import { BrowserRouter, Routes, Route } from "react-router";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2AA8FF",
    },
    secondary: {
      main: "#102851",
    },
  },
});

const handleData=(city, state)=>{
 
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <Routes>
      <Route path='/' element ={<App  handleData={handleData}/>} />
      <Route path='/my-bookings' element={<MyBookings />} />
    </Routes>
    </ThemeProvider>
  </BrowserRouter>
  </React.StrictMode>
);

