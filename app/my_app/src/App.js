// import "./App.css";
import ResponsiveHeader from "./Components/header";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import  Dashboard  from "./pages/Dashboard";
// import SignInPage from "./pages/SignInPage";
// import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <div className="App">
      <ResponsiveHeader></ResponsiveHeader>
      {/* <BrowserRouter>
        <Routes>
          { <Route path="/Dashboard" element={<Dashboard />} /> }
          { <Route path="/SignIn" element={<SignInPage />} /> }
          { <Route path="/SignUp" element={<SignUpPage />} /> }
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;