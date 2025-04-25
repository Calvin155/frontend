import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ParticulateMatter from "./pages/AQIData";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ParticulateMatter />} />
      </Routes>
    </Router>
  );
}

export default App;