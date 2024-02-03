import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavbarTO from "./NavbarTO";

function ViewApplicants() {
  const { tournamentId } = useParams();
  const [tournament, setTournament] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplicationsOfTournaments = async () => {
    if (!tournamentId) return;
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/applicationstatus/getApplicationOfTournament/${tournamentId}`
      );
      setApplicants(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchTournamenData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/getTournamentDetails/${tournamentId}`
      );
      setTournament(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!tournamentId) return;
    fetchApplicationsOfTournaments();
    fetchTournamenData();
  }, [tournamentId]);

  return (
    <>
      <NavbarTO />
      <div>
        <h2>Applicants for {tournament?.tournamentName}:</h2> 
        
        {applicants?.length > 0 ? (
          <ol>
            {applicants.map((applicantions) => (
            <li key={applicantions._id}>
              <div>
                <p>Name : {applicantions?.user?.name}</p>
                <p>Email : {applicantions?.user?.email}</p>
              </div>
            </li>
            ))}
          </ol>
        ) : (
          <p>No applicants for this tournament.</p>
        )}
      </div>
    </>
  );
}
export default ViewApplicants;
