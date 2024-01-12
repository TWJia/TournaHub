import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarTO from "./NavbarTO";

function CreateTournament() {
  const [tournamentName, settournamentName] = useState('');
  const [tournamentSport, settournamentSport] = useState('');
  const [sportsList, setSportsList] = useState([]);
  const [tournamentFormat, settournamentFormat] = useState('');
  const [tournamentDetails, settournamentDetails] = useState('');
  const [tournamentNumberofplayers, settournamentNumberofplayers] = useState('');
  const [tournamentNumberofmatches, settournamentNumberofmatches] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of sports from the database
    axios
      .get('http://localhost:3001/getSports')
      .then((response) => {
        setSportsList(response.data);
      })
      .catch((err) => console.log(err));
  }, []); // Run only once when the component mounts

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/CreateTournament', 
      { tournamentName, tournamentSport, tournamentFormat, tournamentDetails, tournamentNumberofplayers, tournamentNumberofmatches })
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
              <label htmlFor="tournamentFormat">Format</label>
              <input
                type="text"
                id="tournamentFormat"
                placeholder="Choose Format"
                className="form-control"
                onChange={(e) => settournamentFormat(e.target.value)}
              />
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
              <label htmlFor="tournamentNumberofplayers">Number of players</label>
              <input
                type="text"
                id="tournamentNumberofplayers"
                placeholder="Enter Number of Players"
                className="form-control"
                onChange={(e) => settournamentNumberofplayers(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="tournamentNumberofmatches">Number of matches</label>
              <input
                type="text"
                id="tournamentNumberofmatches"
                placeholder=""
                className="form-control"
                onChange={(e) => settournamentNumberofmatches(e.target.value)}
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
