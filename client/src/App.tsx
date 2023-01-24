import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Dashboard from "./components/Layout/Dashboard/Dashboard";
import Signin from "./components/SignIn/Signin";

function App() {
  return (
    <Routes>
      <Route path="signin" element={<Signin />} />
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
