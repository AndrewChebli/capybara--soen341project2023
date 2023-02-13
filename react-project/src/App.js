import "./App.css";
import HeaderBar from "./components/HeaderBar";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import  Dashboard  from "./pages/Dashboard";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";

function App() {
  return (
    <div className="App">
      <HeaderBar></HeaderBar>
      <BrowserRouter>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/SignIn" element={<SignInPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/EditProfile" element={<EditProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
