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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/SignIn" element={<SignInPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/EditProfile" element={<EditProfilePage />} />
          <Route path="/ProfilePageEmployer" element={<ProfilePageEmployer />} />
          <Route path="/EditProfileEmployer" element={<EditProfilePageEmployer />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
