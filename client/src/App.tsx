import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminSection from "./components/Admin/AdminSection";
import Creator from "./components/Creator/Creator";
import Home from "./components/Home/Home";
import Dashboard from "./components/Layout/Dashboard/Dashboard";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import Signin from "./components/SignIn/Signin";
import Signup from "./components/SignUp/Signup";
import useAuthentication from "./hook/useAuthentication";

function App() {
  const { role } = useAuthentication();
  const ADMIN = "Admin";
  const CREATOR = ["Creator", "Admin"];
  return (
    <Routes>
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
      <Route path="/" element={<RequireAuth />}>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Home />} />
          {CREATOR.includes(role) && (
            <Route path="creator" element={<Creator />} />
          )}
          {role === ADMIN && <Route path="admin" element={<AdminSection />} />}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
