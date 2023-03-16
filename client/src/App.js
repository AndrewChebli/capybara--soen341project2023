import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import  Dashboard  from "./pages/DashboardPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import LogoutPage from "./pages/LogoutPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import OffersPage from "./pages/OffersPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import CreateJobPostingPage from "./pages/CreateJobPostingPage";
import HeaderBar from "./components/HeaderBar";
import CompanyJobApplicants from "./pages/CompanyJobApplicants";
import JobPosting from "./components/JobPosting";
import JobPostingPage from "./pages/JobPostingPage"

 

function App() {
  function setDefaultState() {
    localStorage.setItem("loginStatus", "false");
    localStorage.setItem("loginType", JSON.stringify());
  }
  if(localStorage.getItem("loginStatus") === null){
    localStorage.clear();
  }if(localStorage.getItem("loginStatus") === "out"){
    localStorage.clear();
  }
  return (
    <div className="App" >
    <HeaderBar></HeaderBar>
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/DashboardPage" element={<Dashboard />} />
          <Route path="/SignInPage" element={<SignInPage />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/AboutPage" element={<AboutPage />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/EditProfilePage" element={<EditProfilePage  />} />
          <Route path="/OffersPage" element={<OffersPage />} />
          <Route path = "/LogoutPage" element = {<LogoutPage></LogoutPage>} />
          <Route path = "/CreateJobPostingPage" element={<CreateJobPostingPage />} />
          <Route path = "/CompanyJobApplicantsPage" element={<CompanyJobApplicants />} />
          <Route path = "/JobPostingPage/:id" element={<JobPostingPage /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;