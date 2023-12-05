import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import DashboardSA from "./components/DashboardSA";
import DashboardA from "./components/DashboardA";
import DashboardC from "./components/DashboardC";
import DashboardTO from "./components/DashboardTO";
import DashboardEC from "./components/DashboardEC";
import DashboardS from "./components/DashboardS";

export default function App() {
  const loginSA = window.localStorage.getItem("loggedInSA");
  const loginA = window.localStorage.getItem("loggedInA");
  const loginC = window.localStorage.getItem("loggedInC");
  const loginTO = window.localStorage.getItem("loggedInTO");
  const loginEC = window.localStorage.getItem("loggedInEC");
  const loginS = window.localStorage.getItem("loggedInS");
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={ loginSA ? <DashboardSA /> :
                                  loginA ? <DashboardA /> :
                                  loginC ? <DashboardC /> :
                                  loginTO ? <DashboardTO /> :
                                  loginEC ? <DashboardEC /> :
                                  loginS ? <DashboardS /> :
                                  <Home />
                                } />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/DashboardSA" element={<DashboardSA />} />
          <Route path="/DashboardA" element={<DashboardA />} />
          <Route path="/DashboardC" element={<DashboardC />} />
          <Route path="/DashboardTO" element={<DashboardTO />} />
          <Route path="/DashboardEC" element={<DashboardEC />} />
          <Route path="/DashboardS" element={<DashboardS />} />
        </Routes>
      </Router>
    </div>
  );
}
