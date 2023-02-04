import "./App.css";
import HeaderBar from "./components/HeaderBar";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import  Dashboard  from "./pages/Dashboard";
function App() {
  return (
    <div className="App">
      <HeaderBar></HeaderBar>
      <BrowserRouter>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
