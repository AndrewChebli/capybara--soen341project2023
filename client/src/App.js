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
import JobPostingPage from "./pages/JobPostingPage"
import EditProfilePageEmployer from "./pages/EditProfilePageEmployer";
import ProfilePageEmployer from "./pages/ProfilePageEmployer";
import EditJobPosting from "./pages/EditJobPostingPage";

 

function App() {

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
          <Route path = "/CreateJobPostingPage" element={<CreateJobPostingPage />} />
          <Route path = "/CompanyJobApplicantsPage" element={<CompanyJobApplicants />} />
          <Route path = "/JobPostingPage/:id" element={<JobPostingPage /> } />
          <Route path = "/EditProfilePageEmployerPage" element={<EditProfilePageEmployer />} />
          <Route path = "/ProfilePageEmployerPage" element={<ProfilePageEmployer />} />
          <Route path = "/EditJobPostingPage" element = { <EditJobPosting /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;