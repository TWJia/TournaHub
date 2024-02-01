import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SelectNavbar from "./SelectNavbar";


function ViewTournament() {
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const handleNavigateToViewTournamentDeatils = (tournamentId) => {
      navigate(`/ViewTournamentDetails/${tournamentId}`);
    };
      
      useEffect(() => {
        // Fetch tournaments when the component mounts
        axios.get('http://localhost:3001/getTournaments')
          .then((response) => {
            setTournaments(response.data);
          })
          .catch((error) => {
            console.error('Error fetching tournaments:', error);
          })
          .finally(() => {
            setLoading(false); // Set loading to false whether the request is successful or not
          });
      }, []);
      const handleViewDetails = (tournamentId) => {
        // Navigate to a details page or perform some action with the tournamentId
        console.log(`View details for tournament with ID: ${tournamentId}`);
      };

    return (
        <div> 
          {SelectNavbar()}
          <h1>Tournament List:</h1> 
      {loading ? (
        <p>Loading tournaments...</p>
      ) : (
        <table style={{ margin: 'auto', textAlign: 'left', borderCollapse: 'collapse', width: '70%' }}>
          <thead>
            <tr>
              <th>Tournament Name</th>
              <th>Sport</th>
              <th>Format</th>
              <th>Number of Matches</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {tournaments.map(tournament => (
              <tr key={tournament._id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>{tournament.tournamentName}</td>
                <td style={{ padding: '10px' }}>{tournament.tournamentSport}</td>
                <td style={{ padding: '10px' }}>{tournament.tournamentFormat}</td>
                <td style={{ padding: '10px' }}>{tournament.tournamentNumberofmatches}</td>
                <td style={{ padding: '10px' }}>
                <button
                onClick={() => handleNavigateToViewTournamentDeatils(tournament._id)}
                className="btn btn-sm btn-info mr-2"
                >
                View
                </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      )}
        </div>
        
      );
}
export default ViewTournament;
