import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarTO from "./NavbarTO";


function DashboardCPendingCollaboration() {
    const [tournaments, setTournaments] = useState([])
    const [currentTab, setCurrentTab] = useState(
      localStorage.getItem("currentTab") || "pending"
    )
    //const navigate = useNavigate()
    //axios.defaults.withCredentials = true
    useEffect(() => {
        axios.get('http://localhost:3001/getTournaments')
        .then((response) => {
            setTournaments(response.data)
        })
        .catch(err => console.log(err))
    }, [])
    useEffect(() => {
      localStorage.setItem("currentTab", currentTab);
    }, [currentTab]);

    const handleUpdateStatus = (tournamentId, newStatus) => {
      // Send a request to update the status in the database
      axios.put(`http://localhost:3001/updateTournamentStatus/${tournamentId}`, { newStatus })
        .then(response => {
          // Update the state using the callback form of setTournaments
          setTournaments(prevTournaments => {
            return prevTournaments.map(tournament => {
              if (tournament._id === tournamentId) {
                return { ...tournament, status: newStatus };
              }
              return tournament;
            });
          });
          console.log(response);
        })
        .catch(err => console.log(err));
    };
  
  const handleAccept = (tournamentId) => {
      handleUpdateStatus(tournamentId, 'Accept');
  };
  
  const handleReject = (tournamentId) => {
      handleUpdateStatus(tournamentId, 'Reject');
  };

  const filteredTournaments = {
    pending: tournaments.filter(t => t.status === 'Pending'),
    accepted: tournaments.filter(t => t.status === 'Accept'),
    rejected: tournaments.filter(t => t.status === 'Reject'),
  };
    
      const renderTournamentList = () => {
        const currentTournaments = filteredTournaments[currentTab];
    
        return (
          <table style={{ margin: 'auto', width: '50%', textAlign: 'left' }}>
            <thead>
              <tr>
                <th>Tournament Name</th>
                <th>Tournament Details</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTournaments.map(tournament => (
                 <tr key={tournament._id}>
                  <td>{tournament["Tournament Name"]}</td>
                  <td>{tournament["Tournament Details"]}</td>
                  <td>{tournament.status}</td>
                  <td>
                  <button onClick={() => setCurrentTab("accepted")}>Accept</button>
                  <button onClick={() => setCurrentTab("rejected")}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      };
    
      return (
        <div>
          <NavbarTO />
          <p></p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="navbar-container">
            <nav>
              <button onClick={() => setCurrentTab("pending")}>Pending</button>
              <button onClick={() => setCurrentTab("accepted")}>Accepted</button>
              <button onClick={() => setCurrentTab("rejected")}>Rejected</button>
            </nav>
          </div>
          <div>
          {renderTournamentList()}
          </div>
        </div>
      );
    }

export default DashboardCPendingCollaboration;