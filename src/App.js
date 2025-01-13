import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import "./App.css"
import Home from "./pages/Home"
import AQIData from "./pages/AQIData"

function App() {

  return (
    <Router>
    <nav>
      <NavLink to="/">Home</NavLink> |{" "}
      <NavLink to="/viewAQI">AQI Data</NavLink> |{" "}
    </nav>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/viewAQI" element={<AQIData />} />
    </Routes>
  </Router>
  );
}

export default App;