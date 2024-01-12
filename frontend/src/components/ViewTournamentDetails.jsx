import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavbarTO from "./NavbarTO";

function ViewTournamentDetails() {
  const [tournamentDetails, setTournamentDetails] = useState({});
  const [matchDetails, setMatchDetails] = useState({});
  const [rankingTableDetails, setRankingTableDetails] = useState({});
  const [loadingTournament, setLoadingTournament] = useState(true);
  const [loadingMatches, setLoadingMatches] = useState(true);
  const [LoadingRankingTable, setLoadingRankingTable] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    // Fetch tournament details when the component mounts
    axios.get(`http://localhost:3001/getTournamentDetails/${id}`)
      .then((response) => {
        setTournamentDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tournament details:', error);
      })
      .finally(() => {
        setLoadingTournament(false);
      });
  }, 
  [id]);

  useEffect(() => {
    // Fetch match details when the component mounts
    axios.get(`http://localhost:3001/getMatches/${id}`)
      .then((response) => {
        setMatchDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching match details:', error);
      })
      .finally(() => {
        setLoadingMatches(false);
      });
  }, [id]);

  useEffect(() => {
    // Fetch ranking table details when the component mounts
    axios.get(`http://localhost:3001/getRankingTable/${id}`)
      .then((response) => {
        setRankingTableDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching ranking table details:', error);
      })
      .finally(() => {
        setLoadingRankingTable(false);
      });
  }, [id]);

  return (
    <div>
      <NavbarTO />
      {loadingTournament || loadingMatches || LoadingRankingTable ? (
        <p>Loading...</p>
      ) : (
<div>
          <h1>{tournamentDetails.tournamentName}</h1>
          <p>Sport: {tournamentDetails.tournamentSport}</p>
          <p>Details: {tournamentDetails.tournamentDetails}</p>
          {/* Display other tournament details as needed */}
          <h1>Matches</h1>
          {Array.isArray(matchDetails) && matchDetails.length > 0 ? (
            matchDetails.map((match, index) => (
              <div key={index}>
                <p>Match {match.MatchNumber}</p>
                <p>Player 1: {match.Player1}</p>
                <p>Player 2: {match.Player2}</p>
                <p>Player 1 Score: {match.Player1_Score}</p>
                <p>Player 2 Score: {match.Player2_Score}</p>
                <p>Winner: {match.Winner}</p>
                {/* Display other match details as needed */}
              </div>
              
            ))

          ) : (
            <p>No match details available.</p>
          )}
          <div>
            <h1>Ranking Table</h1>
            {Array.isArray(rankingTableDetails) && rankingTableDetails.length > 0 ? (
            rankingTableDetails.map((rankingtables, index) => (
              <div key={index}>
                <p>Winner: {rankingtables.Winner}</p>
                <p>Runner-Up: {rankingtables.RunnerUp}</p>
                {/* Display other match details as needed */}
              </div>
              
            ))

          ) : (
            <p>No ranking table details available.</p>
          )}
              </div>
        </div>
      )}
    </div>
  );
}

export default ViewTournamentDetails;