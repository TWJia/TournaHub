/* eslint-disable react/style-prop-object */
import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';


const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [schedules, setSchedules] = useState([]); // State to manage schedules
  const [showModalFormat, setModalFormat] = useState(false);
  const [tournament, setTournament] = useState([]);
  const [tournamentFormats, setTournamentFormats] = useState([]);
  const [tournamentRoles, setTournamentRoles] = useState([]);
  const [players, setPlayers] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [coordinator, setCoordinator] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [showModalRole, setShowModalRole] = useState(false);
  const [showModalAddPlayers, setModalAddPlayers] = useState(false);
  const [showModalEmail, setShowModalEmail] = useState(false); // ini punya kolaborator
  const [showModalEmail2, setShowModalEmail2] = useState(false); // ini punya coordinator
  const [showModalTournamentEdit, setShowModalTournamentEdit] = useState(false);
  const [editedTournamentIndex, setEditedTournamentIndex] = useState(null);

  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  var currentselectedTournament = "";

  const [editedTournament, setEditedTournament] = useState({
    name: "",
    date: "",
    time: "",
    venue: "",
    rules: ""
  });

  const [newTournament, setNewTournament] = useState({
    name: '',
    date: '',
    time: '',
    venue: '',
    rules: ''
  });

  const [createFormat, setCreateFormat] = useState({
    tid: '',
    name: '',
    description: '',
    structure: '',
    rules: ''
  });

  const [createRole, setCreateRole] = useState({
    tid: '',
    description: '',
    responsibilities: ''
  });


  const [createPlayer, setCreateAddPlayer] = useState({
    tid: '',
    name: '',
    email: '',
  });

  const [createCollaborator, setCreateCollaborator] = useState({
    tid: '',
    userid: '',
  });

  const [createCoordinator, setCreateCoordinator] = useState({
    tid: '',
    userid: '',
  });

  const [createSchedule, setSchedule] = useState({
    tid: '',
    date: '',
    time: '',
  });




  useEffect(() => {
    // Fetch tournament data from the server when the component mounts
    let vartemp = axios.get('http://localhost:3001/tournament', {
      headers: { "Access-Control-Allow-Origin": "*" },
      responseType: "json",
    })
      .then(response => {
        console.log(vartemp);
        console.log(response.data);
        console.log(response.data[0].name);
        setTournament(response.data);
      })
      .catch(error => {
        console.error('Error fetching tournament data:', error);
      });

  }, []);

  
  

  // const handleAddSchedule = () => {
  //   setShowModal(true);
  // };

  const handleCreateTournament = () => {
    setShowModal2(true);
  }


  // const handleSaveSchedule = (newSchedule) => {
  //   setSchedules([...schedules, newSchedule]);
  //   setShowModal(false);
  // };

  const handleTourSchedule = (newTournament) => {
    setTournament([...tournament, newTournament]);
    setShowModal2(false);
  };

  const updateCurrentSelectTournament = (tid) => {
    currentselectedTournament = tid;
  }

  const handleShowTournamentDetails = (index) => {
    const selectedTournament = tournament[index];
    setEditedTournament({
      name: selectedTournament.name,
      date: selectedTournament.date,
      time: selectedTournament.time,
      venue: selectedTournament.venues,
      rules: selectedTournament.rules
    });
    setCreateFormat({
      name: selectedTournament.name,
      description: selectedTournament.description,
      structure: selectedTournament.structure,
      rules: selectedTournament.rules
    });
    setSelectedTournament(tournament[index]);

    // setEditedTournamentIndex(index);

    // setShowModalTournamentEdit(true);
  };





  useEffect(() => {
    if (selectedTournament) {
      // Fetch additional details for the selected tournament if needed
      axios.get(`http://localhost:3001/tournament/${selectedTournament.id}`)
        .then(response => {
          // Set additional details to the selectedTournament state
          setSelectedTournament({ ...selectedTournament, additionalDetails: response.data });
        })
        .catch(error => {
          console.error('Error fetching additional tournament details:', error);
        });
    }
  }, [])


  const handleDeleteTournament = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/tournament/${id}`);

      alert("Tournament Deleted Successfully");

      // Update the state to remove the tournament from the list
      const updatedTournaments = tournament.filter((t) => t.id !== id);
      setTournament(updatedTournaments);
    } catch (error) {
      console.error('Error deleting tournament:', error);
      alert("Failed to delete tournament");
    }
  };

  const handleEditTournament = async (id) => {
    try {
      const response = await axios.post('http://localhost:3001/tournament/update', {
        id: id,
        name: editedTournament.name,
        date: editedTournament.date,
        time: editedTournament.time,
        venues: editedTournament.venue,
        rules: editedTournament.rules
      });

      // Update the tournament state with the new data
      const updatedTournaments = tournament.map((t) =>
        t.id === id ? { ...t, ...response.data.find((updated) => updated.id === t.id) } : t
      );
      setTournament(updatedTournaments);

      alert("Tournament Updated Successfully");
      setShowModalTournamentEdit(false);
    } catch (error) {
      console.error('Error updating tournament:', error);
      alert("Failed to update tournament");
    }
  };

  const handleCreateTournaments = async () => {
    try {
      const response = await axios.post('http://localhost:3001/tournament/create', {
        name: newTournament.name,
        date: newTournament.date,
        time: newTournament.time,
        venues: newTournament.venue,
        rules: newTournament.rules
      });

      // Update your state here, e.g., setTournament(response.data);
      alert("Tournament created successfully");

      // Reset the form fields
      setNewTournament({ name: '', date: '', time: '', venues: '', rules: '' });
      setShowModal2(false); // Close the modal
    } catch (error) {
      console.error('Error creating tournament:', error);
      alert("Failed to create tournament");
    }
  };




  const handleCreateFormat = async () => {

    // if (!tid) {
    //   alert("No tournament selected!");
    //   return;
    // }

    // alert(currentselectedTournament)
    const formatData = {
      tid: createFormat.tid, // Assuming selectedTournament has an 'id' field
      desc: createFormat.description,
      structure: createFormat.structure,
      rules: createFormat.rules,
    };
    try {
      const response = await axios.post('http://localhost:3001/format/update', formatData);
      // console.log(response)
      alert("Format updated successfully");
      setModalFormat(false); // Close the modal
      // You might want to update the state here with the new format data
      // setTournamentFormats([...tournamentFormats, response.data]);
    } catch (error) {
      console.error('Error updating format:', error);
      alert("Failed to update format");
    }
  };

  const fetchFormatsByTournamentId = async (tid) => {
    try {
      const response = await axios.get(`http://localhost:3001/format/${tid}`);
      // Assuming the response data is the list of formats
      console.log(response.data);
      setTournamentFormats(response.data); // Update your state with the fetched formats
    } catch (error) {
      console.error('Error fetching formats:', error);
      // Handle the error appropriately
    }
  };
  


  const handleEditFormat = (index, tid) => {
    const selected = tournament[index];

    setCreateFormat({
      tid: tid,
      name: selected.name,
      description: '',
      structure: '',
      rules: '',
    });
    setModalFormat(true); // Now when you open the modal, selectedTournament should not be null
  };

  const handleEditFormatSHOW = (tid) => {
    console.log("Inside handleEditRoleSHOW, received tid: ", tid);
    fetchFormatsByTournamentId(tid);
    setCreateFormat({
      tid: tid,
      name: tid.name,
      description: '',
      structure: '',
      rules: '',
    });
    
  };

  const handleCreateRole = async () => {

    // if (!tid) {
    //   alert("No tournament selected!");
    //   return;
    // }

    // alert(currentselectedTournament)
    alert(createRole.tid)
    const formatData = {
      tid: createRole.tid, // Assuming selectedTournament has an 'id' field
      desc: createRole.description,
      responsibilities: createRole.responsibilities,
    };
    try {
      const response = await axios.post('http://localhost:3001/role/update', formatData);
      console.log(response)
      alert("Role Created successfully");
      setShowModalRole(false); // Close the modal
      // You might want to update the state here with the new format data
      // setTournamentFormats([...tournamentFormats, response.data]);
    } catch (error) {
      console.error('Error role:', error);
      alert("Failed to create Role");
    }
  };

  const fetchRolesByTournamentId = async (tid) => {
    try {
      console.log("current tid : ", tid);
      const response = await axios.get(`http://localhost:3001/role/${tid}`);
      // Assuming the response data is the list of roles
      console.log(response.data);
      setTournamentRoles(response.data); // Update your state with the fetched roles
    }
    catch (error) {
      console.error('Error fetching roles:', error);
      // Handle the error appropriately
    }
  };


  const handleEditRole = (index, tid) => {
    // fetchRolesByTournamentId(tid);
    setCreateRole({
      tid: tid,
      description: '',
      responsibilities: ''
    });
    setShowModalRole(true); // Now when you open the modal, selectedTournament should not be null
  };

  const handleEditRoleSHOW = (tid) => {
    console.log("Inside handleEditRoleSHOW, received tid: ", tid);
    fetchRolesByTournamentId(tid);
    setCreateRole({
      tid: tid,
      description: '',
      responsibilities: ''
    });
  };

  const handleCreatePlayer = async () => {

    // if (!tid) {
    //   alert("No tournament selected!");
    //   return;
    // }

    // alert(currentselectedTournament)
    alert(createPlayer.tid)
    const formatData = {

      tid: createPlayer.tid, // Assuming selectedTournament has an 'id' field
      name: createPlayer.name, 
      email: createPlayer.email,
    };
    try {
      const response = await axios.post('http://localhost:3001/player/create', formatData);
      console.log(response)
      alert("Player Created successfully");
      setModalAddPlayers(false); // Close the modal
      // You might want to update the state here with the new format data
      // setTournamentFormats([...tournamentFormats, response.data]);
    } catch (error) {
      console.error('Error Player:', error);
      alert("Failed to create Player");
    }
  };

  const fetchPlayersByTournamentId = async (tid) => {
    try {
      const response = await axios.get(`http://localhost:3001/player/${tid}`);
      // Assuming the response data is the list of players
      console.log(response.data);
      setPlayers(response.data); // Update your state with the fetched players
    } catch (error) {
      console.error('Error fetching players:', error);
      // Handle the error appropriately
    }
  };

  const handleEditPlayers = (tid) => {
    fetchPlayersByTournamentId(tid);
    //fetchPlayersByTournamentId(tid);
    setCreateAddPlayer({
      tid: tid,
      name: '',
      email: ''
    });
    setModalAddPlayers(true); // Now when you open the modal, selectedTournament should not be null
  };

  const handleEditPlayersSHOW = (tid) => {
    fetchPlayersByTournamentId(tid);
    //fetchPlayersByTournamentId(tid);
    setCreateAddPlayer({
      tid: tid,
      name: '',
      email: ''
    });
    
  };

  // const fetchPlayersByCollaboratorId = async (tid) => {
  //   try {
  //     const response = await axios.get(`http://localhost:3001/all-data/${tid}`);
  //     // Assuming the response data is the list of players
  //     console.log(response.data);
  //     setCollaborators(response.data.colabolator); // Update your state with the fetched players
  //   } catch (error) {
  //     console.error('Error fetching players:', error);
  //     // Handle the error appropriately
  //   }
  // };

  const fetchPlayersByCollaboratorId = async (tid) => {
    try {
      const response = await axios.get(`http://localhost:3001/all-data/${tid}`);
      // Check if colaborator data is in the response and is an array
      console.log(response.data.colaborator);
      if (response.data && Array.isArray(response.data.colaborator)) {
        setCollaborators(response.data.colaborator); // Update the state
      } else {
        // Handle the case where the data is not as expected
        console.log('Collaborator data is not available or not in the expected format');
      }
    } catch (error) {
      console.error('Error fetching collaborators:', error);
    }
  };
  

  const handleCreateCollaborator = async (userid,tid) => {

      alert(createCollaborator.tid)
      const formatData = {
        tid: createCollaborator.tid, // Assuming selectedTournament has an 'id' field
        userid: createCollaborator.userid,
      };
      try {
        const response = await axios.post(`http://localhost:3001/invite-colab/${userid}/${tid}`, formatData);
        console.log(response)
        alert("Collaborator Created successfully");
        setShowModalEmail(false); // Close the modal
        // You might want to update the state here with the new format data
        // setTournamentFormats([...tournamentFormats, response.data]);
      } catch (error) {
        console.error('Error role:', error);
        alert("Failed");
      }
  }

  const handleEditCollaborator = (tid) => {
    //fetchPlayersByTournamentId(tid);
    fetchPlayersByCollaboratorId(tid);
    setCreateCollaborator({
      tid: tid,
      // userid: '',
    });
    setShowModalEmail(true); // Now when you open the modal, selectedTournament should not be null
  };

  const handleEditCollaboratorSHOW = (tid) => {
    //fetchPlayersByTournamentId(tid);
    fetchPlayersByCollaboratorId(tid);
    setCreateCollaborator({
      tid: tid,
      // userid: '',
    });
  };

  const fetchPlayersByCoordinatorId = async (tid) => {
    try {
      const response = await axios.get(`http://localhost:3001/all-data/${tid}`);
      // Check if colaborator data is in the response and is an array
      console.log(response.data.coordinator);
      if (response.data && Array.isArray(response.data.coordinator)) {
        setCoordinator(response.data.coordinator); // Update the state
      } else {
        // Handle the case where the data is not as expected
        console.log('Coordinator data is not available or not in the expected format');
      }
    } catch (error) {
      console.error('Error fetching coordinators:', error);
    }
  };
  

  const handleCreateCoordinator = async (userid,tid) => {

      alert(createCoordinator.tid)
      const formatData = {
        tid: createCoordinator.tid, // Assuming selectedTournament has an 'id' field
        userid: createCoordinator.userid,
      };
      try {
        const response = await axios.post(`http://localhost:3001/invite-colab/${userid}/${tid}`, formatData);
        console.log(response)
        alert("Coordinator Created successfully");
        setShowModalEmail2(false); // Close the modal
        // You might want to update the state here with the new format data
        // setTournamentFormats([...tournamentFormats, response.data]);
      } catch (error) {
        console.error('Error role:', error);
        alert("Failed");
      }
  }

  const handleEditCoordinator = (tid) => {
    //fetchPlayersByTournamentId(tid);
    fetchPlayersByCoordinatorId(tid);
    setCreateCoordinator({
      tid: tid,
      // userid: '',
    });
    setShowModalEmail2(true); // Now when you open the modal, selectedTournament should not be null
  };

  const handleEditCoordinatorSHOW = (tid) => {
    //fetchPlayersByTournamentId(tid);
    fetchPlayersByCoordinatorId(tid);
    setCreateCoordinator({
      tid: tid,
      // userid: '',
    });
  };

  // const handleDeleteCollaborator = async (collaboratorId) => {
  //   try {
  //     await axios.delete(`http://localhost:3001/collaborator/${collaboratorId}`);
  //     // Remove the collaborator from state
  //     setCollabolators(prevCollabolators => prevCollabolators.filter(c => c.id !== collaboratorId));
  //     // Show a success message or handle the UI update accordingly
  //   } catch (error) {
  //     console.error('Error deleting collaborator:', error);
  //     // Handle the error appropriately
  //   }
  // };

  const handleAddSchedule = async () => {
    // if (!tid) {
    //   alert("No tournament selected!");
    //   return;
    // }

    // alert(currentselectedTournament)
    const scheduleData = {
      tid: createSchedule.tid, // Assuming selectedTournament has an 'id' field
      date: createSchedule.date,
      time: createSchedule.time,
    };
    try {
      const response = await axios.post('http://localhost:3001/schedule/create', scheduleData);
      console.log(response)
      alert("Schedule added successfully");
      setShowModal(false); // Close the modal
      // You might want to update the state here with the new schedule data
      // setTournamentFormats([...tournamentFormats, response.data]);
    } catch (error) {
      console.error('Error adding schedule:', error);
      alert("Failed to add schedule");
    }
  }

  const fetchSchedulesByTournamentId = async (tid) => {
    try {
      const response = await axios.get(`http://localhost:3001/schedule/${tid}`);
      // Assuming the response data is the list of schedules
      console.log(response.data);
      setSchedules(response.data); // Update your state with the fetched schedules
    } catch (error) {
      console.error('Error fetching schedules:', error);
      // Handle the error appropriately
    }
  }


  const handleEditSchedule = (tid) => {
    fetchSchedulesByTournamentId(tid);
    setSchedule({
      tid: tid,
      date: '',
      time: '',
    });
    setShowModal(true); // Now when you open the modal, selectedTournament should not be null
  }

  return (
    <div className="App">
      <header className="bg-dark text-white py-3">
        <div className="container">
          <nav className="navbar">
            {/* Replace this span with an img tag */}
            <img src="/logo.jpeg" alt="TournaHUB Logo" className="navbar-brand w-25 " />
          </nav>
        </div>
      </header>

      <main>
        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center">
            <h1>My Tournament</h1>
            <div className="btn-group" role="group" aria-label="Tournament buttons">
              <button className="btn btn-success ms-2" onClick={handleCreateTournament}>
                Create Tournament
              </button>
            </div>
          </div>
          {/* Tempat untuk menampilkan daftar jadwal */}

          {/* <ul className="list-group mt-3">
            {schedules.map((schedule, index) => (
              <li key={index} className="list-group-item">
                <h1>List Schedule</h1>
                {schedule.name} - {schedule.date} - {schedule.time} - {schedule.venue}
              </li>
            ))}
          </ul> */}
          <ul className="list-group mt-3">
            {tournament.map((tourr, index) => (
              // currentselectedTournament = tourr.id;
              <li key={index} className="list-group-item">
                <div className="tournament-box">
                  <h3>Tournament {index + 1}</h3>
                  <p>
                    <strong>Name:</strong> {tourr.name}<br />
                    {/* <strong>Date:</strong> {new Date(tourr.date).toLocaleDateString()}<br />
                    <strong>Times:</strong> {tourr.time}<br /> */}
                    <strong>Venue:</strong> {tourr.venues}<br />
                    <strong>Rules:</strong> {tourr.rules}<br />
                    <input type="hidden" value={tourr.id} name="tour_id" />
                  </p>
                  <div className="tournament-buttons">
                    <button className="btn btn-success me-2" onClick={() => {
                      console.log("Tournament ID: ", tourr.id); 
                      handleShowTournamentDetails(index);
                      handleEditPlayersSHOW(tourr.id);
                      handleEditRoleSHOW(tourr.id);
                      handleEditFormatSHOW(tourr.id);
                      handleEditCollaboratorSHOW(tourr.id);
                      handleEditCoordinatorSHOW(tourr.id);
                      updateCurrentSelectTournament(tourr.id);
                    }
                    }>
                      View Details
                    </button>
                    <button className="btn btn-success me-2" onClick={() => {
                      // setSelectedTournament(selectedTournament);
                      // setEditedTournamentIndex(tournament.indexOf(selectedTournament));
                      handleEditPlayersSHOW(tourr.id);
                      //handleEditFormatSHOW(tourr.id);
                      handleEditRoleSHOW(tourr.id);
                      // setShowModal(true);
                    }}>
                      Add Schedule
                    </button>
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => {
                        handleEditRole(index, tourr.id);
                      }}
                    >
                      Role
                    </button>

                    <button className="btn btn-primary me-2" onClick={() => {
                      handleEditFormat(index, tourr.id);
                      // updateCurrentSelectTournament(tourr.id);
                    }
                    }>
                      Edit Format
                    </button>
                    <button className="btn btn-danger me-2" onClick={() => handleDeleteTournament(tourr.id)}>
                      Delete Tournament
                    </button>
                    <button className="btn btn-info ms-5 me-2" onClick={() => {
                      handleEditPlayers(tourr.id);
                      // setSelectedTournament(null);
                    }
                    }>
                      Add Player
                    </button>
                    <button
                  type="button"
                  className="btn btn-link ms-5 me-2"
                  data-dismiss="modal"
                  onClick={() => {
                    handleEditCollaborator(tourr.id);
                  }}
                >
                  Invite Collaborator
                </button>
                <button
                  type="button"
                  className="btn btn-link ms-5 me-2" 
                  data-dismiss="modal"
                  onClick={() => {
                    handleEditCoordinator(tourr.id);
                  }}
                >
                  Invite Coordinator
                </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

        </div>
      </main>

      {/* <footer className="mt-5 py-3 bg-dark text-white fixed-bottom">
        <div className="container">
          <p>Tournament Management Website 2023</p>
        </div>
      </footer> */}

      {/* Modal untuk menambahkan jadwal */}

      {showModalRole && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', zIndex: 1050 }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Role</h5>
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={() => setShowModalRole(false)} // Menutup modal role
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Form for adding a role */}
                {/* Customize this form based on your needs */}
                <form>
                  <div className="form-group">
                    <label htmlFor="roleName">Role Name:</label>
                    {/* <input type="text" className="form-control" id="roleName" /> */}
                    <input class="form-control" type="text" value={"Tournament Organizer"}  aria-label="Disabled input example" disabled />
                  </div>
                  <div className="form-group">
                    <label htmlFor="roleDescription">Role Description:</label>
                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" value={createRole.desc}
                    onChange={(e) => setCreateRole({ ...createRole, description: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="roleDescription">Responsibilities:</label>
                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" value={createRole.responsibilities}
                    onChange={(e) => setCreateRole({ ...createRole, responsibilities: e.target.value })}
                    ></textarea>
                  </div>
                  {/* Add more fields for the role form as needed */}
                  <input type="hidden" value={createRole.tid} name="tid" />
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModalRole(false)} // Menutup modal role
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCreateRole}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModalFormat && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', zIndex: 1050 }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Format</h5>
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={() => setModalFormat(false)} // Menutup modal role
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Form for adding a role */}
                {/* Customize this form based on your needs */}
                <form>
                  <div className="form-group">
                    <label htmlFor="formatName">Tournament Name:</label>
                    <input type="text" className="form-control" id="formatName" value={createFormat.name} onChange={(e) => setCreateFormat({ ...createFormat, name: e.target.value })} disabled />
                    <label htmlFor="formatDescription">Tournament Description:</label>
                    <textarea
                      className="form-control"
                      id="formatDescription"
                      placeholder="Enter tournament description..."
                      value={createFormat.desc}
                      onChange={(e) => setCreateFormat({ ...createFormat, description: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="formatStructure">Tournament Structure:</label>
                    <textarea
                      className="form-control"
                      id="formatStructure"
                      placeholder="Enter tournament structure..."
                      value={createFormat.structure}
                      onChange={(e) => setCreateFormat({ ...createFormat, structure: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="formatRules">Tournament Rules:</label>
                    <textarea
                      className="form-control"
                      id="formatRules"
                      placeholder="Enter tournament rules..."
                      value={createFormat.rules}
                      onChange={(e) => setCreateFormat({ ...createFormat, rules: e.target.value })}
                    ></textarea>
                  </div>
                  <input type="hidden" value={createFormat.tid} name="tid" />

                </form>

              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setModalFormat(false)} // Menutup modal format
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleCreateFormat}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModalEmail && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', zIndex: 1050 }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Invite Collabolator</h5>
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={() => setShowModalEmail(false)} // Menutup modal role
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Form for adding a role */}
                {/* Customize this form based on your needs */}
                <label htmlFor="Participants">List Collaborator :</label>
                <ul className="list-group">
                  {collaborators.length > 0 ? (
                    collaborators.map((collaborator, index) => (
                      <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <span className="text-nowrap">{collaborator.user_id}</span>
                        <button type='button' className='btn btn-danger'>Delete</button>
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item">No collaborators found.</li>
                  )}
                </ul>



                <form>
                  {/* <div className="form-group">
                    <label htmlFor="roleName">Role Description:</label>
                    <input type="text" className="form-control" id="roleName" />
                  </div> */}
                  <Form.Group controlId="recipient">
                    <Form.Label>To:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Recipient's email"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                    />
                  </Form.Group>

                  {/* Add more fields for the role form as needed */}
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModalEmail(false)} // Menutup modal role
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCreateCollaborator}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

        {showModalEmail2 && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', zIndex: 1050 }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Invite Coordinator</h5>
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={() => setShowModalEmail2(false)} // Menutup modal role
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Form for adding a role */}
                {/* Customize this form based on your needs */}
                <label htmlFor="Participants">List Coordinator :</label>
                <ul className="list-group">
                  {coordinator.length > 0 ? (
                    coordinator.map((cordinator, index) => (
                      <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <span className="text-nowrap">{cordinator.user_id}</span>
                        <button type='button' className='btn btn-danger'>Delete</button>
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item">No coordinator found.</li>
                  )}
                </ul>



                <form>
                  {/* <div className="form-group">
                    <label htmlFor="roleName">Role Description:</label>
                    <input type="text" className="form-control" id="roleName" />
                  </div> */}
                  <Form.Group controlId="recipient">
                    <Form.Label>To:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Recipient's email"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                    />
                  </Form.Group>

                  {/* Add more fields for the role form as needed */}
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModalEmail(false)} // Menutup modal role
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => (alert('Email sended!'), setShowModalEmail(false))}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Schedule</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Form untuk menambahkan jadwal */}
                {/* Sesuaikan form ini dengan kebutuhan Anda */}
                <label htmlFor="Participants">List Schedule :</label>
                <ul className="list-group list-group-flush ">
                  {schedules.map((scheduless, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      {/* new Date().toLocaleDateString() */}
                      <span className="text-nowrap">{new Date(scheduless.date).toLocaleDateString()} - {scheduless.time}</span>
                      
                    </li>
                  ))}
                </ul>
                <form>
                  
                  <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="date" className="form-control" id="date" value={createSchedule.date}
                    onChange={(e) => setSchedule({ ...createSchedule, date: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="times">Times:</label>
                    <input type="time" className="form-control" id="time" value={createSchedule.time}
                    onChange={(e) => setSchedule({ ...createSchedule, time: e.target.value })}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowModal(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleAddSchedule}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal2 && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Tournament</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Create Format"
                  onClick={() => setShowModal2(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Form untuk menambahkan jadwal */}
                {/* Sesuaikan form ini dengan kebutuhan Anda */}
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Tournament Name:</label>
                    <input type="text" className="form-control" id="name" value={newTournament.name} onChange={(e) => setNewTournament({ ...newTournament, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="date" className="form-control" id="date" value={newTournament.date} onChange={(e) => setNewTournament({ ...newTournament, date: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="times">Times:</label>
                    <input type="text" className="form-control" id="time" value={newTournament.time} onChange={(e) => setNewTournament({ ...newTournament, time: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="venue">Venues:</label>
                    <input type="text" className="form-control" id="venue" value={newTournament.venue} onChange={(e) => setNewTournament({ ...newTournament, venue: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="venue">Rules:</label>
                    <input type="text" className="form-control" id="rules" value={newTournament.rules} onChange={(e) => setNewTournament({ ...newTournament, rules: e.target.value })} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => {
                  setModalFormat(true); // Menampilkan modal role
                  setShowModal2(null);
                }}>
                  Create Format
                </button>
                <button type="button" className="btn btn-primary" onClick={handleCreateTournaments}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTournament && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Tournament Details</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setSelectedTournament(null)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h3>Tournament {tournament.indexOf(selectedTournament) + 1}</h3>
                <p>
                  <strong>Name:</strong> {selectedTournament.name}<br />
                  <strong>Date:</strong> {new Date(selectedTournament.date).toLocaleDateString()}<br />
                  <strong>Times:</strong> {selectedTournament.time}<br />
                  <strong>Venue:</strong> {selectedTournament.venues}<br />
                  <strong>Rules:</strong> {selectedTournament.rules}<br />
                  {tournamentFormats.map((format, index) => (
                    <div key={index}>
                    <strong>Description: {format.description}</strong>
                    <br />
                    <strong>Structure: {format.structure}</strong>
                  </div>
                  ))}
                  <h5>Roles:</h5>
                  {tournamentRoles.map((role, index) => (
                    <div key={index}>
                      <strong>Description: {role.description}</strong>
                      <br />
                      <strong>Responsibilities: {role.responsibilities}</strong>
                    </div>
                  ))}
                  <h5>List Player:</h5>
                  {players.map((player, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      <span className="text-nowrap">{player.name} - {player.email}</span>
                    </li>
                  ))}
                  <h5>List Collaborator:</h5>
                  <ul className="list-group">
                  {collaborators.length > 0 ? (
                    collaborators.map((collaborator, index) => (
                      <li key={index} className="d-flex justify-content-between align-items-center">
                        <span className="text-nowrap">{collaborator.user_id}</span>
                        {/* <button type='button' className='btn btn-danger'>Delete</button> */}
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item">No collaborators found.</li>
                  )}
                </ul>
                  <h5>List Coordinator:</h5>
                  <ul className="list-group">
                  {coordinator.length > 0 ? (
                    coordinator.map((cordinator, index) => (
                      <li key={index} className="d-flex justify-content-between align-items-center">
                        <span className="text-nowrap">{cordinator.user_id}</span>
                        {/* <button type='button' className='btn btn-danger'>Delete</button> */}
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item">No coordinator found.</li>
                  )}
                </ul>
                </p>
              </div>
              <div className="modal-footer">
              {/* <button className="btn btn-success" onClick={()=> {
                // setSelectedTournament(selectedTournament);
                // setEditedTournamentIndex(tournament.indexOf(selectedTournament));
                setShowModal(true);
              }}>
                Add Schedule
              </button> */}
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => {
                    setSelectedTournament(selectedTournament);
                    setEditedTournamentIndex(tournament.indexOf(selectedTournament));
                    setShowModalTournamentEdit(true);
                  }}
                >
                  Edit Tournament
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => setSelectedTournament(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModalTournamentEdit && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Tournament</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Create Format"
                  onClick={() => setShowModalTournamentEdit(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Form untuk menambahkan jadwal */}
                {/* Sesuaikan form ini dengan kebutuhan Anda */}
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Tournament Name:</label>
                    <input type="text" className="form-control" id="name"
                      value={editedTournament.name}
                      onChange={(e) => setEditedTournament({ ...editedTournament, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="text" className="form-control" id="date"
                      value={editedTournament.date}
                      onChange={(e) => setEditedTournament({ ...editedTournament, date: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="times">Times:</label>
                    <input type="text" className="form-control" id="times"
                      value={editedTournament.time}
                      onChange={(e) => setEditedTournament({ ...editedTournament, time: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="venue">Venues:</label>
                    <input type="text" className="form-control" id="venue"
                      value={editedTournament.venue}
                      onChange={(e) => setEditedTournament({ ...editedTournament, venue: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="venue">Rules:</label>
                    <input type="text" className="form-control" id="rules"
                      value={editedTournament.rules}
                      onChange={(e) => setEditedTournament({ ...editedTournament, rules: e.target.value })}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => {
                  setShowModalTournamentEdit(null);
                }}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={() => handleEditTournament(selectedTournament.id)}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModalAddPlayers && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Players</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Create Format"
                  onClick={() => setModalAddPlayers(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Form untuk menambahkan jadwal */}
                {/* Sesuaikan form ini dengan kebutuhan Anda */}
                <label htmlFor="Participants">Participants :</label>
                <ul className="list-group">
                  {players.map((player, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      <span className="text-nowrap">{player.name} - {player.email}</span>
                      <button type='button' className='btn btn-danger'>Delete</button>
                    </li>
                  ))}
                </ul>
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name :</label>
                    <input type="text" className="form-control" id="name" value={createPlayer.name} 
                    onChange={(e)=> setCreateAddPlayer({...createPlayer, name: e.target.value})} required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Email :</label>
                    <input type="email" className="form-control" id="email" value={createPlayer.email}
                    onChange={(e)=> setCreateAddPlayer({...createPlayer, email: e.target.value})}
                    required/>
                  </div>
                  <input type="hidden" value={createPlayer.tid} name="tid" />
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => {
                  setModalAddPlayers(null);
                }}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" 
                onClick={handleCreatePlayer}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
