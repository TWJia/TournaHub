import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import DashboardSA from "./components/DashboardSA";
import CreateSport from "./components/CreateSport";
import ManageSports from "./components/ManageSports";
import UpdateSports from "./components/UpdateSports";
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
<<<<<<< Updated upstream
=======
import NewsForm from "./components/Applicant/NewsForm";
import RatingAndReview from "./components/Applicant/RatingAndReview";
import CreateTournament from './components/CreateTournament';
import Tournament from './components/Tournament';
import ViewTournamentDetails from './components/ViewTournamentDetails';
import UpdateTournament from './components/UpdateTournament';
import AddMatches from './components/AddMatches';
import UpdateMatches from './components/UpdateMatches';
import CreateRankingTable from './components/CreateRankingTable';
import ViewApplicants from './components/ViewApplicants';

>>>>>>> Stashed changes

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
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/DashboardSA" element={<DashboardSA />} />
          <Route path="/CreateSport" element={<CreateSport />} />
          <Route path="/ManageSports" element={<ManageSports />} />
          <Route path="/UpdateSports/:id" element={<UpdateSports />} />
          <Route path="/ManageUsers" element={<ManageUsers />} />
          <Route path="/verifyUsers" element={<VerifyUsers />} />
          <Route path="/UpdateUsers/:id" element={<UpdateUsers />} />
          <Route path="/home" element={<DashboardA />} />
          <Route path="/home/news/:newsId" component={<NewsDetails />} />
          <Route path="/UpdateProfile" element={<UpdateProfile />} />
          <Route path="/TournamentSchedule" element={<DisplaySchedule />} />
          <Route path="/MatchResult" element={<MatchResult />} />
          <Route path="/DashboardTO" element={<DashboardTO />} />
          <Route path="/DashboardS" element={<DashboardS />} />
<<<<<<< Updated upstream
=======
          <Route path="/CreateTournament" element={<CreateTournament />} />
          <Route path="/Tournament" element={<Tournament />} />
          <Route path="/ViewTournamentDetails/:id" element={<ViewTournamentDetails />} />
          <Route path="/ViewTournamentDetails" element={<ViewTournamentDetails />} />
          <Route path="/UpdateTournament/:id" element={<UpdateTournament />} />
          <Route path="/UpdateTournament" element={<UpdateTournament />} />
          <Route path="/AddMatches" element={<AddMatches />} />
          <Route path="/AddMatches/:tournamentId" element={<AddMatches />} />
          <Route path="/UpdateMatches" element={<UpdateMatches />} />
          <Route path="/UpdateMatches/:id" element={<UpdateMatches />} />
          <Route path="/CreateRankingTable" element={<CreateRankingTable />} />
          <Route path="/CreateRankingTable/:tournamentId" element={<CreateRankingTable />} />
          <Route path="/ViewApplicants" element={<ViewApplicants />} />
          <Route path="/ViewApplicants/:tournamentId" element={<ViewApplicants />} />
>>>>>>> Stashed changes

          <Route
            path="/DashboardTOPendingCollaboration"
            element={<DashboardTOPendingCollaboration />}
          />
        </Routes>
      </Router>
    </div>
  );
}
