import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarTO from "./NavbarTO";

function DashboardTOPendingCollaboration() {
  const [user, setUser] = useState([]);
  const [status, setStatus] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState();
  const [currentTab, setCurrentTab] = useState('Pending'); // Initialize currentTab state
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  
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
      
      useEffect(() => {
        // Fetch tournaments when the component mounts
        axios.get('http://localhost:3001/getStatus')
          .then((response) => {
            setStatus(response.data);
          })
          .catch((error) => {
            console.error('Error fetching status:', error);
          })
          .finally(() => {
            setLoading(false); // Set loading to false whether the request is successful or not
          });
      }, []);

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

      const handleAccept = (tournamentId) => {
        const updatedStatus = {
          tournamentId: tournamentId,
          userId: user._id,
          collaboratorStatus: 'Accepted', // Update the status to 'accepted' for acceptance
        };
      
        updateStatusInDatabase(updatedStatus);
      };

      const handleReject = (tournamentId) => {
        const updatedStatus = {
          tournamentId: tournamentId,
          userId: user._id,
          collaboratorStatus: 'Rejected', // Update the status to 'rejected' for rejection
        };

        updateStatusInDatabase(updatedStatus);
};

const updateStatusInDatabase = (updatedStatus) => {
  const statusIdToUpdate = status.find(
    (s) => s.tournamentId === updatedStatus.tournamentId && s.userId === updatedStatus.userId
  )._id;

  axios
    .put(`http://localhost:3001/updateStatus/${statusIdToUpdate}`, updatedStatus)
    .then((result) => {
      console.log(result);
      alert('Status updated successfully');
      // navigate('/Tournament');
    })
    .catch((err) => console.log(err));
};

  const renderTournamentList = () => {
    // Check if both status and tournaments are available
    if (!status.length || !tournaments.length) {
      return <p>Loading...</p>;
    }
  
    // Filter tournaments based on the conditions
    const filteredTournaments = tournaments.filter((tournament) => {
      return status.some(
        (s) =>
          s.tournamentId === tournament._id &&
          s.userId === user._id &&
          (currentTab === 'All' || s.collaboratorStatus === currentTab)
      );
    });
  
    if (!filteredTournaments.length) {
      return <p>No Pending Collaborations.</p>;
    }
  
    return (
      <table style={{ margin: 'auto', width: '50%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Tournament</th>
            <th>Details</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTournaments.map(tournament => (
            <tr key={tournament._id}>
              <td>{tournament.tournamentName}</td>
              <td>{tournament.tournamentDetails}</td>
              <td>
              {/* Display a list of collaboratorStatus values for each tournament */}
              {status
                .filter(s => s.tournamentId === tournament._id && s.userId === user._id)
                .map((s, index) => (
                  <span key={index}>{s.collaboratorStatus}</span>
                ))}
              </td>
              <td>
                <button onClick={() => handleAccept(tournament._id)}>Accept</button>
                <button onClick={() => handleReject(tournament._id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
        {/* ... (other tbody sections remain unchanged) */}
      </table>
    );
  };

  return (
    <div>
      <NavbarTO />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="navbar-container">
        <nav>
          <button onClick={() => setCurrentTab("Pending")}>Pending</button>
          <button onClick={() => setCurrentTab("Accepted")}>Accepted</button>
          <button onClick={() => setCurrentTab("Rejected")}>Rejected</button>
        </nav>
      </div>
      <div>
      {renderTournamentList()}
      </div>
    </div>
  );
}

export default DashboardTOPendingCollaboration;
