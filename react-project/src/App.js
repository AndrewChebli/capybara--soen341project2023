import "./App.css";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import  Dashboard  from "./pages/DashboardPage";
import SignInPage from "./pages/SignInPageEmployee";
import SignUpPage from "./pages/SignUpPageEmployee";
import LogoutPage from "./pages/LogoutPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import OffersPage from "./pages/OffersPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";  



function App() {

  function setDefaultState() {
    localStorage.setItem("firstName", JSON.stringify());
    localStorage.setItem("lastName", JSON.stringify());
    localStorage.setItem("email", JSON.stringify());
    localStorage.setItem("response", JSON.stringify());
    localStorage.setItem("loginStatus", "false");
    localStorage.setItem("loginType", JSON.stringify());
  }
  if(localStorage.getItem("loginStatus") === null){
    setDefaultState();
  }if(localStorage.getItem("loginStatus") === "out"){
    setDefaultState();
  }
  return (
    <div className="App" >
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/DashboardPage" element={<Dashboard />} />
          <Route path="/SignInPage" element={<SignInPage />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/AboutPage" element={<AboutPage />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/EditProfilePage" element={<EditProfilePage  />} />
          <Route path="/OffersPage" element={<OffersPage />} />
          <Route path = "/LogoutPage" element = {<LogoutPage></LogoutPage>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
