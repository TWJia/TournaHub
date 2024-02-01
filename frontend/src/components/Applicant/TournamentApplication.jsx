import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarA from "./NavbarA";

const TournamentApplication = () => {
  const [openTournaments, setOpenTournaments] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3001/getCurrentUser"
        );
        setUser(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchOpenTournaments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/applicationstatus/getOpenTournaments"
        );
        setOpenTournaments(response.data);
      } catch (error) {
        console.error("Error fetching open tournaments:", error);
      }
    };

    fetchData();
    fetchOpenTournaments();
  }, []);

  const applyForTournament = async (tournamentId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/applicationstatus/applyForTournament/${tournamentId}`,
        {
          userId: user?._id,
          action: "apply",
        }
      );
      console.log("Application response:", response.data);
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error ===
          "You have already applied for this tournament"
      ) {
        console.log("User has already applied for this tournament");
        // Handle the case where the user has already applied
      } else {
        console.error("Error applying for tournament:", error);
        console.log("Error response:", error.response);
      }
    }
  };

  const renderTournament = (tournament) => {
    const userAlreadyApplied =
      Array.isArray(tournament.applications) &&
      tournament.applications.some((app) => app.user?._id === user?._id);

    return (
      <div key={tournament._id}>
        <p>{tournament.tournamentName}</p>
        <p>{tournament.tournamentDetails}</p>
        <p>{tournament.tournamentSkillLevel}</p>
        <button
          onClick={() => applyForTournament(tournament._id)}
          disabled={userAlreadyApplied}
        >
          {userAlreadyApplied ? "Already Applied" : "Apply"}
        </button>
      </div>
    );
  };

  const renderFilteredTournaments = (filterFn) =>
    filteredTournaments(filterFn).map(renderTournament);

  const filteredTournaments = (filterFn) => openTournaments.filter(filterFn);

  return (
    <div>
      <NavbarA />
      <h2>Open Tournaments</h2>
      <h4>Recommended match for your skill level:</h4>
      {renderFilteredTournaments((tournament) => {
        const skillLevelMatches =
          tournament.tournamentSkillLevel?.toLowerCase() ===
          user?.skillLevel?.toLowerCase();
        return skillLevelMatches;
      })}
      <h4>Other matches not recommended for you:</h4>
      {renderFilteredTournaments((tournament) => {
        const skillLevelDiffers =
          tournament.tournamentSkillLevel?.toLowerCase() !==
          user?.skillLevel?.toLowerCase();
        return skillLevelDiffers;
      })}
    </div>
  );
};

export default TournamentApplication;
