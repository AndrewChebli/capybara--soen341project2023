import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/DashboardPage";
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
import JobPostingPage from "./pages/JobPostingPage";
import EditProfilePageEmployer from "./pages/EditProfilePageEmployer";
import ProfilePageEmployer from "./pages/ProfilePageEmployer";
import EditJobPosting from "./pages/EditJobPostingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Reports from "./pages/ReportsPage";
import BookmarksPage from "./pages/BookmarksPage";
import TournamentPage from "./pages/TournamentPage";

import { useCallback } from "react";
import { AuthContext } from "./context/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [_id, set_id] = React.useState(null);
  const [token, setToken] = React.useState(null);

  const login = useCallback((token, _id) => {
    setIsLoggedIn(true);
    set_id(_id);
    setToken(token);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    set_id(null);
    setToken(null);
  }, []);

  if (sessionStorage.getItem("loginStatus") === null) {
    localStorage.clear();
  }
  if (sessionStorage.getItem("loginStatus") === "out") {
    localStorage.clear();
  }
  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          _id: _id,
          token: token,
          login: login,
          logout: logout,
        }}
      />

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
          <Route path="/EditProfilePage" element={<EditProfilePage />} />
          <Route path="/OffersPage" element={<OffersPage />} />
          <Route path="/LogoutPage" element={<LogoutPage></LogoutPage>} />
          <Route path = "/JobPostingPage/:id" element = {<JobPostingPage />} />
          <Route path = "ViewCandidate/:id" element = {< ProfilePage />} />
          <Route path = "ProfilePage/:id" element = {< ProfilePage />} />
          <Route path = "/BookmarksPage" element = {<BookmarksPage/>}/>
          <Route path = "TournamentPage" element = {<TournamentPage/>}/>

          <Route
            path="/CreateJobPostingPage"
            element={<CreateJobPostingPage />}
          />
          <Route
            path="/CompanyJobApplicantsPage"
            element={<CompanyJobApplicants />}
          />
          <Route path="/JobPostingPage/:id" element={<JobPostingPage />} />
          <Route
            path="/EditProfileEmployerPage"
            element={<EditProfilePageEmployer />}
          />
          <Route
            path="/ProfilePageEmployerPage/:id"
            element={<ProfilePageEmployer />}
          />
          <Route
            path="/ProfilePageEmployerPage"
            element={<ProfilePageEmployer />}
          />
          <Route path="/EditJobPostingPage/:id" element={<EditJobPosting />} />
          <Route path="/ReportsPage" element={<Reports />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
