import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import DashboardSA from "./components/DashboardSA";
import CreateSport from "./components/CreateSport";
import ManageSports from "./components/ManageSports";
import UpdateSports from "./components/UpdateSports";
import ManageNewsArticles from "./components/ManageNewsArticles";
import ManageUsers from "./components/ManageUsers";
import UpdateUsers from "./components/UpdateUsers";
import VerifyUsers from "./components/verifyUsers";
import DashboardA from "./components/DashboardA";
import DashboardTO from "./components/DashboardTO";
import DashboardS from "./components/DashboardS";
import DashboardTOPendingCollaboration from "./components/DashboardTOPendingCollaboration";
import UpdateProfile from "./components/Applicant/UpdateProfile";
import DisplaySchedule from "./components/Applicant/DisplaySchedule";
import NewsDetails from "./components/Applicant/NewsDetails";
import MatchResult from "./components/Applicant/MatchResult";
import NewsForm from "./components/Applicant/NewsForm";
import RatingAndReview from "./components/Applicant/RatingAndReview";

export default function App() {
  const loginSA = window.localStorage.getItem("loggedInSA");
  const loginA = window.localStorage.getItem("loggedInA");
  const loginTO = window.localStorage.getItem("loggedInTO");
  const loginS = window.localStorage.getItem("loggedInS");
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              loginSA ? (
                <DashboardSA />
              ) : loginA ? (
                <DashboardA />
              ) : loginTO ? (
                <DashboardTO />
              ) : loginS ? (
                <DashboardS />
              ) : (
                <Home />
              )
            }
          />
          <Route path="/home/news/:newsId" element={<NewsDetails />} />
          <Route path="/UploadNews" element={<NewsForm />} />
          <Route path="/RatingAndReview" element={<RatingAndReview />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/ResetPassword/:id/:token" element={<ResetPassword />} />
          <Route path="/DashboardSA" element={<DashboardSA />} />
          <Route path="/CreateSport" element={<CreateSport />} />
          <Route path="/ManageSports" element={<ManageSports />} />
          <Route path="/UpdateSports/:id" element={<UpdateSports />} />
          <Route path="/ManageNewsArticles" element={<ManageNewsArticles />} />
          <Route path="/ManageUsers" element={<ManageUsers />} />
          <Route path="/verifyUsers" element={<VerifyUsers />} />
          <Route path="/UpdateUsers/:id" element={<UpdateUsers />} />
          <Route path="/home" element={<DashboardA />} />
          <Route path="/UpdateProfile" element={<UpdateProfile />} />
          <Route path="/TournamentSchedule" element={<DisplaySchedule />} />
          <Route path="/MatchResult" element={<MatchResult />} />
          <Route path="/DashboardTO" element={<DashboardTO />} />
          <Route path="/DashboardS" element={<DashboardS />} />

          <Route
            path="/DashboardTOPendingCollaboration"
            element={<DashboardTOPendingCollaboration />}
          />
        </Routes>
      </Router>
    </div>
  );
}
