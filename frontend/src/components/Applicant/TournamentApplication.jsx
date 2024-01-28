import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarA from "./NavbarA";

const TournamentApplication = () => {
  // Fetch and display tournaments that are open for application.
  const [openTournaments, setOpenTournaments] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOpenTournaments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/getOpenTournaments"
        );
        setOpenTournaments(response.data);
      } catch (error) {
        console.error("Error fetching open tournaments:", error);
      }
    };
    fetchData();
    fetchOpenTournaments();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/getCurrentUser");
      setUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const applyForTournament = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/applyForTournament/${id}/${user._id}`
      );
      console.log("Application response:", response.data);
    } catch (error) {
      if (
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

  // Filter tournaments based on user's skill level preference (case-insensitive)
  const filteredTournaments = openTournaments.filter((tournament) => {
    const tournamentSkillLevels = tournament && tournament.tournamentSkillLevel;
    const userSkillLevel = user && user.skillLevel;

    return (
      tournamentSkillLevels &&
      userSkillLevel &&
      tournamentSkillLevels.toLowerCase() === userSkillLevel.toLowerCase()
    );
  });

  return (
    <div>
      <NavbarA />
      <h2>Open Tournaments</h2>
      {/* Display tournaments of the user's skill level first */}
      <h4>Recommended match for your skill level:</h4>
      {filteredTournaments.map((tournament) => (
        <div key={tournament._id}>
          <p>{tournament.tournamentName}</p>
          <p>{tournament.tournamentDetails}</p>
          <p>{tournament.tournamentSkillLevel}</p>
          <button onClick={() => applyForTournament(tournament._id)}>
            Apply
          </button>
        </div>
      ))}
      <h4>Other matches not recommended for you:</h4>
      {openTournaments
        .filter((tournament) => {
          const tournamentSkillLevels =
            tournament && tournament.tournamentSkillLevel;
          const userSkillLevel = user && user.skillLevel;

          return (
            tournamentSkillLevels &&
            userSkillLevel &&
            tournamentSkillLevels.toLowerCase() !== userSkillLevel.toLowerCase()
          );
        })
        .map((tournament) => (
          <div key={tournament._id}>
            <p>{tournament.tournamentName}</p>
            <p>{tournament.tournamentDetails}</p>
            <p>{tournament.tournamentSkillLevel}</p>
            <button onClick={() => applyForTournament(tournament._id)}>
              Apply
            </button>
          </div>
        ))}
    </div>
  );
};

export default TournamentApplication;
