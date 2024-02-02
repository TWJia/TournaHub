import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarTO from "./NavbarTO";


function ViewTournament() {
  axios.defaults.withCredentials = true;
    const [user, setUser] = useState(null);
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const handleNavigateToViewTournamentDeatils = (tournamentId) => {
      navigate(`/ViewTournamentDetails/${tournamentId}`);
    };
    const handleNavigateToCreateTournament = () => {
        navigate('/CreateTournament');
      };
      const handleNavigateToAddMatches = (tournamentId) => {
        navigate(`/AddMatches/${tournamentId}`);
      };
      const handleNavigateToUpdateMatches = (tournamentId) => {
        navigate(`/UpdateMatches/${tournamentId}`);
      };
      const handleNavigateToAddStatistics = (tournamentId) => {
        navigate(`/AddStatistics/${tournamentId}`);
      };
      const handleNavigateToUpdateStatistics = (tournamentId) => {
        navigate(`/UpdateStatistics/${tournamentId}`);
      };      
      const handleNavigateToCreateRankingTable = (tournamentId) => {
        navigate(`/CreateRankingTable/${tournamentId}`);
      };
      const handleNavigateToUpdateTournament = (tournamentId) => {
        navigate(`/UpdateTournament/${tournamentId}`);
      };
      const handleNavigateViewApplicants = (tournamentId) => {
        navigate(`/ViewApplicants/${tournamentId}`);
      };
      const handleNavigateInvitationPage = (tournamentId) => {
        navigate(`/InvitationPage/${tournamentId}`);
      };

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              "http://localhost:3001/getCurrentUser"
            );
            setUser(response.data);
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
      
      // useEffect(() => {
      //   // Fetch tournaments when the component mounts
      //     axios.get(`http://localhost:3001/getTournaments`)
      //       .then((response) => {
      //         setTournaments(response.data);
      //       })
      //       .catch((error) => {
      //         console.error('Error fetching tournaments:', error);
      //       })
      //       .finally(() => {
      //         setLoading(false);
      //       });
      //   }, []);
      
      useEffect(() => {
        const fetchData = async () => {
          try {
            if (user) { // Check if user exists before making the request
              const response = await axios.get(`http://localhost:3001/getTournaments/${user._id}`);
              setTournaments(response.data);
            }
          } catch (error) {
            console.error('Error fetching tournaments:', error);
          } finally {
            setLoading(false);
          }
        };
      
        fetchData();
      }, [user]);
      
      const handleViewDetails = (tournamentId) => {
        // Navigate to a details page or perform some action with the tournamentId
        console.log(`View details for tournament with ID: ${tournamentId}`);
      };

      const handleDelete = async (id) => {
        if (window.confirm('Confirm deletion?')) {
          try {
            await axios.delete(`http://localhost:3001/deleteTournament/${id}`);
            // Update the local state by filtering out the deleted tournament
            setTournaments((prevTournaments) => prevTournaments.filter(tournament => tournament._id !== id));
          } catch (error) {
            console.log(error);
          }
        }
      };
    return (
        <div> 
          <NavbarTO />    
          {/* Button to navigate to the form page */}
          <button
            onClick={handleNavigateToCreateTournament}
            className="btn btn-primary mt-3"
          >
            Create Tournament
          </button>
          
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
              <th>Actions</th>
              <th>Tournament Status</th>
              <th>Applications</th>
              <th>Send Invite</th>
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
                <button
                onClick={() => handleNavigateToUpdateTournament(tournament._id)}
                className="btn btn-sm btn-warning mr-2"
                >
                Edit Tournament
                </button>
                  <button
                    onClick={() => handleNavigateToAddMatches(tournament._id)}
                    className="btn btn-sm btn-success mr-2"
                  >
                    Add Matches
                  </button>
                  <button
                    onClick={() =>  handleNavigateToUpdateMatches(tournament._id)}
                    className="btn btn-sm btn-warning mr-2"
                  >
                    Edit Matches
                  </button>
                  <button
                    onClick={() =>  handleNavigateToAddStatistics(tournament._id)}
                    className="btn btn-sm btn-success mr-2"
                  >
                    Add Statistics
                  </button>
                  <button
                    onClick={() =>  handleNavigateToUpdateStatistics(tournament._id)}
                    className="btn btn-sm btn-warning mr-2"
                  >
                    Edit Statistics
                  </button>
                  <button
                    onClick={() => handleNavigateToCreateRankingTable(tournament._id)}
                    className="btn btn-sm btn-primary mr-2"
                  >
                    Add Ranking Table
                  </button>
                  <button
                    onClick={() => handleDelete(tournament._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                  </td>
                  <td style={{ padding: '10px' }}>{tournament.tournamentStatus}</td>
                  <td style={{ padding: '10px' }}>
                    <button onClick={() => handleNavigateViewApplicants(tournament._id)}
                    className="btn btn-sm btn-info"
                    >
                      View
                    </button>
                  </td>
                  <td style={{ padding: '10px' }}>
                    <button onClick={() => handleNavigateInvitationPage(tournament._id)}
                    className="btn btn-sm btn-info"
                    >
                      Invite
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
