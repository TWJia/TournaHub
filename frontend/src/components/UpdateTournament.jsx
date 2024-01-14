import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavbarTO from './NavbarTO';

function UpdateTournament() {
  const [tournamentDetails, setTournamentDetails] = useState([]);
  const [updatedTournaments, setUpdatedTournaments] = useState([]);
  const [loadingTournament, setLoadingTournament] = useState(true);
  const [sportsList, setSportsList] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getTournamentDetails/${id}`)
      .then((response) => {
        setTournamentDetails(response.data);
        setUpdatedTournaments([response.data]);
      })
      .catch((error) => {
        console.error('Error fetching tournament details:', error);
      })
      .finally(() => {
        setLoadingTournament(false);
      });
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const updateTournament = (e, tournamentId) => {
    e.preventDefault();
    const updatedTournament = updatedTournaments.find(
      (tournament) => tournament._id === tournamentId
    );
    console.log('Updated Tournament:', updatedTournament);

    axios
      .put(`http://localhost:3001/updateTournament/${tournamentId}`, updatedTournament)
      .then((result) => {
        console.log(result);
        alert('Tournament updated successfully');
        navigate('/Tournament');
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (e, tournamentId, field) => {
    const value = e.target.value;
    setUpdatedTournaments((prevTournaments) =>
      prevTournaments.map((tournament) =>
        tournament._id === tournamentId ? { ...tournament, [field]: value } : tournament
      )
    );
  };
  useEffect(() => {
    // Fetch the list of sports from the database
    axios
      .get('http://localhost:3001/getSports')
      .then((response) => {
        setSportsList(response.data);
      })
      .catch((err) => console.log(err));
  }, []); // Run only once when the component mounts

  return (
    <div>
      <NavbarTO />
      {loadingTournament ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Tournament Name:</p>
          <input
            type="text"
            value={updatedTournaments.find((tournament) => tournament._id === id)?.tournamentName || ''}
            onChange={(e) => handleInputChange(e, id, 'tournamentName')}
          />

          <p>Sport:</p>
          <select
          value={updatedTournaments.find((tournament) => tournament._id === id)?.tournamentSport || ''}
          onChange={(e) => handleInputChange(e, id, 'tournamentSport')}
          >
            {sportsList.map((sport) => (
                <option key={sport._id} value={sport.name}>
                    {sport.name}
                </option>
                ))}
          </select>
          
          <p>Format:</p>
          <input
            type="text"
            value={updatedTournaments.find((tournament) => tournament._id === id)?.tournamentFormat || ''}
            onChange={(e) => handleInputChange(e, id, 'tournamentFormat')}
          />

          <p>Details:</p>
          <input
            type="text"
            value={updatedTournaments.find((tournament) => tournament._id === id)?.tournamentDetails || ''}
            onChange={(e) => handleInputChange(e, id, 'tournamentDetails')}
          />

          <p>Start Date:</p>
          <input
            type="date"
            value={formatDate(updatedTournaments.find((tournament) => tournament._id === id)?.tournamentStartDate || '')}
            onChange={(e) => handleInputChange(e, id, 'tournamentStartDate')}
          />

          <p>End Date:</p>
          <input
            type="date"
            value={formatDate(updatedTournaments.find((tournament) => tournament._id === id)?.tournamentEndDate || '')}
            onChange={(e) => handleInputChange(e, id, 'tournamentEndDate')}
          />

          <p>Number of Players:</p>
          <input
            type="text"
            value={updatedTournaments.find((tournament) => tournament._id === id)?.tournamentNumberofplayers || ''}
            onChange={(e) => handleInputChange(e, id, 'tournamentNumberofplayers')}
          />

          <p>Number of Matches:</p>
          <input
            type="text"
            value={updatedTournaments.find((tournament) => tournament._id === id)?.tournamentNumberofmatches || ''}
            onChange={(e) => handleInputChange(e, id, 'tournamentNumberofmatches')}
          />
          
          <p>Tournament Status:</p>
          <select
          value={(updatedTournaments.find((tournament) => tournament._id === id) || {}).tournamentStatus || ''}
          onChange={(e) => handleInputChange(e, id, 'tournamentStatus')}
          >
            <option value="Open for Application">Open for Application</option>
            <option value="Closed Application">Closed Application</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            {/* Add more options as needed */}
          </select>

          {/* Add more input fields and labels for other fields as needed */}

          <p></p>
          <button onClick={(e) => updateTournament(e, id)}>Update Tournament</button>
        </div>
      )}
    </div>
  );
}

export default UpdateTournament;
