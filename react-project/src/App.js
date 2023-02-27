import "./App.css";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import  Dashboard  from "./pages/DashboardPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import About from "./pages/AboutPage";
import Offers from "./pages/OffersPage";

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/DashboardPage" element={<Dashboard />} />
          <Route path="/SignInPage" element={<SignInPage />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/AboutPage" element={<About />} />
          <Route path="/OffersPage" element={<Offers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
