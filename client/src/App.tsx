import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminSection from "./components/Admin/AdminSection";
import Creator from "./components/Creator/Creator";
import Home from "./components/Home/Home";
import Dashboard from "./components/Layout/Dashboard/Dashboard";
import Signin from "./components/SignIn/Signin";
import Signup from "./components/SignUp/Signup";

function App() {
  return (
    <Routes>
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path="creator" element={<Creator />} />
        <Route path="admin" element={<AdminSection />} />
      </Route>
    </Routes>
  );
}

export default App;
