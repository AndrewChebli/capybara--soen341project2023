import "./App.css";
import HeaderBar from "./components/HeaderBar";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import  Dashboard  from "./pages/Dashboard";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <div className="App">
      <HeaderBar></HeaderBar>
      <BrowserRouter>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/SignIn" element={<SignInPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
