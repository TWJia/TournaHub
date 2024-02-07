import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarA from "./NavbarA";
import "./TournamentApplication.css";

const UserApplicationStatus = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3001/getCurrentUser",
          {
            withCredentials: true,
          }
        );
        setUser(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchAppliedTournaments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/applicationstatus/getUserApplications/${user?._id}`
        );
        setApplications(response.data); // Update here
      } catch (error) {
        console.error("Error fetching user applications:", error);
      }
    };

    if (user) {
      fetchAppliedTournaments();
    }
  }, [user]);

  return (
    <>
      <NavbarA />
      <div style={{ backgroundColor: '#4a4e65', padding: '25px' }}>
        <h2>Your Application Status</h2>

        {applications.length > 0 ? (
          <ul>
            {applications.map((application) => (
              <div className="Tframe" key={application.tournamentId}style={{ backgroundColor: '#f7931e', padding: '10px', marginBottom: '10px' }}>
                <p>Tournament: {application.tournamentName}</p>
                <p>Status: {application.action}</p>
              </div>
            ))}
          </ul>
        ) : (
          <p>No applications found.</p>
        )}
      </div>
    </>
  );
};

export default UserApplicationStatus;
