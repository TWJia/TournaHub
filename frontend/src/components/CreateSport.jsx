import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import NavbarSA from "./NavbarSA";
import Select from "react-select";

function CreateSport() {
  const [name, setName] = useState("");
  const [selectedFormats, setSelectedFormats] = useState([]);
  const navigate = useNavigate();

  const tournamentFormats = [
    "Single Elimination",
    "Double Elimination",
    "Round Robin",
    "Swiss",
    "Free-for-all",
    // Add more tournament formats as needed
  ];

  const formatOptions = tournamentFormats.map((format) => ({ value: format, label: format }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Formats:", selectedFormats);

    axios
      .post('http://localhost:3001/CreateSport', { name, tournamentFormats: selectedFormats })
      .then(result => {
        console.log(result);
        alert('Sport created successfully');
        navigate('/DashboardSA');
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <NavbarSA />
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
            <h2>Create Sport</h2>
            <div className="mb-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
            <div className="mb-2">
            <Select
                name="tournamentFormats"
                options={formatOptions}
                isMulti
                aria-label="Tournament Formats"  // Provide an accessible label
                onChange={(selectedOptions) =>
                  setSelectedFormats(selectedOptions.map((option) => option.value))
                }
              />
            </div>
            <button className="btn btn-success">Create</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateSport;
