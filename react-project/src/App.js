import "./App.css";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import  Dashboard  from "./pages/Dashboard";
import SignInPage from "./pages/SignInPageEmployee";
import SignUpPage from "./pages/SignUpPageEmployee";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import ProfilePageEmployer from "./pages/ProfilePageEmployer";
import EditProfilePageEmployer from "./pages/EditProfilePageEmployer";
import Homepage from "./pages/Homepage";
import LogoutPage from "./pages/LogoutPage";


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
        <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/SignIn" element={<SignInPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/EditProfile" element={<EditProfilePage />} />
          <Route path="/ProfilePageEmployer" element={<ProfilePageEmployer />} />
          <Route path="/EditProfileEmployer" element={<EditProfilePageEmployer />} />
          <Route path="/Home" element={<Homepage />} />
          <Route path = "/Logout" element = {<LogoutPage></LogoutPage>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
