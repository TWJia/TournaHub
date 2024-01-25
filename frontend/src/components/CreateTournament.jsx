import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarTO from "./NavbarTO";

function CreateTournament() {
  const [user, setUser] = useState(null);
  const [organizerId, setorganizerId] = useState('');
  const [tournamentName, settournamentName] = useState('');
  const [tournamentSport, settournamentSport] = useState('');
  const [sportsList, setSportsList] = useState([]);
  const [tournamentSkillLevel, settournamentSkillLevel] = useState('');
  const [tournamentFormat, settournamentFormat] = useState('');
  const [tournamentDetails, settournamentDetails] = useState('');
  const [tournamentStartDate, settournamentStartDate] = useState('');
  const [tournamentEndDate, settournamentEndDate] = useState('');
  const [tournamentNumberofplayers, settournamentNumberofplayers] = useState('');
  const [tournamentNumberofmatches, settournamentNumberofmatches] = useState('');
  const [tournamentStatus, settournamentStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;


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
  
  useEffect(() => {
    // Set the initial value of organizerId when the component mounts
    setorganizerId(user ? user._id : '');
  }, [user]);


  useEffect(() => {
    // Fetch the list of sports from the database
    axios
      .get('http://localhost:3001/getSports')
      .then((response) => {
        setSportsList(response.data);
      })
      .catch((err) => console.log(err));
  }, []); // Run only once when the component mounts

  useEffect(() => {
    // Calculate and update the number of matches when the number of players or format changes
    calculateNumberOfMatches();
  }, [tournamentNumberofplayers, tournamentFormat]);

  const calculateNumberOfMatches = () => {
    if (tournamentFormat === 'Single Elimination') {
      // Single Elimination: n - 1 matches
      settournamentNumberofmatches(tournamentNumberofplayers - 1);
    } else if (tournamentFormat === 'Double Elimination') {
      // Double Elimination: (n - 1) * 2 + 1 matches
      settournamentNumberofmatches((tournamentNumberofplayers - 1) * 2 + 1);
    } else {
      // Handle other formats as needed
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/CreateTournament', 
      { organizerId, 
        tournamentName, tournamentSport, tournamentSkillLevel,
        tournamentFormat, tournamentDetails, 
        tournamentStartDate, tournamentEndDate, 
        tournamentNumberofplayers, tournamentNumberofmatches, 
        tournamentStatus: 'Open for Application' })
      .then((result) => {
        console.log(result);
        alert('Tournament created successfully');
        navigate('/Tournament');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <NavbarTO />
      <div className="d-flex justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
          <form onSubmit={handleSubmit}>
            <h2>Create Tournament</h2>

            <div className="mb-2">
  <label htmlFor="organizerId">Organizer ID</label>
  <input
    type="text"
    id="organizerId"
    className="form-control"
    value={organizerId}
    onChange={(e) => setorganizerId(e.target.value)}
    readOnly
  />
</div>
            <div className="mb-2">
              <label htmlFor="tournamentName">Name</label>
              <input
                type="text"
                id="tournamentName"
                placeholder="Enter Name"
                className="form-control"
                onChange={(e) => settournamentName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="tournamentSport">Sport</label>
              <select
                id="tournamentSport"
                className="form-control"
                value={tournamentSport}
                onChange={(e) => settournamentSport(e.target.value)}
              >
                <option value="" disabled>
                  Select Sport
                </option>
                {sportsList.map((sport) => (
                  <option key={sport._id} value={sport.name}>
                    {sport.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label htmlFor="tournamentSkillLevel">Skill Level</label>
              <select
              id="tournamentSkillLevel"
              className="form-control"
              onChange={(e) => settournamentSkillLevel(e.target.value)}
              >
              <option value="Beginner">Beginner</option>
              <option value="Amateur">Amateur</option>
              <option value="Professional">Professional</option>
              </select>
            </div>
            <div className="mb-2">
            <label htmlFor="tournamentFormat">Format</label>
            <select
              id="tournamentFormat"
              className="form-control"
              value={tournamentFormat}
              onChange={(e) => settournamentFormat(e.target.value)}
            >
              <option value="" disabled>
                Select Format
              </option>
              <option value="Single Elimination">Single Elimination</option>
              <option value="Double Elimination">Double Elimination</option>
            </select>
          </div>
            <div className="mb-2">
              <label htmlFor="tournamentDetails">Details</label>
              <input
                type="text"
                id="tournamentDetails"
                placeholder="Enter Details"
                className="form-control"
                onChange={(e) => settournamentDetails(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="settournamentStartDate">Start Date</label>
              <input
                type="date"
                id="settournamentStartDate"
                className="form-control"
                value={tournamentStartDate}
                onChange={(e) => settournamentStartDate(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="settournamentEndDate">End Date</label>
              <input
                type="date"
                id="settournamentEndDate"
                className="form-control"
                onChange={(e) => settournamentEndDate(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="tournamentNumberofplayers">Number of players</label>
              <input
                type="number" // Use type="number" for numeric input
                id="tournamentNumberofplayers"
                placeholder="Enter Number of Players"
                className="form-control"
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (!isNaN(value)) {
                    settournamentNumberofplayers(value);
                  }
                }}
              />
            </div>
             <div className="mb-2">
              <label htmlFor="tournamentNumberofmatches">Number of matches</label>
              <input
                type="text"
                id="tournamentNumberofmatches"
                placeholder=""
                className="form-control"
                value={tournamentNumberofmatches}
                readOnly // Make it read-only
              />
            </div>
            <div className="mb-2">
              <input
                type="hidden"
                id="tournamentStatus"
                value="Open for Application"
                className="form-control"
                onChange={(e) => settournamentStatus(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateTournament;
