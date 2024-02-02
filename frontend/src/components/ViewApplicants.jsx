import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavbarTO from "./NavbarTO";

function ViewApplicants() {
  const { tournamentId } = useParams();
  const [tournament, setTournament] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        // Fetch user information
        const { data: userData } = await axios.get(
          "http://localhost:3001/getCurrentUser",
          { withCredentials: true }
        );

        if (!userData || !userData._id) {
          console.error("User or user ID not available");
          return;
        }

        // Fetch all user IDs
        const { data: allUserIds } = await axios.get(
          "http://localhost:3001/getAllUserIds"
        );

        // Fetch tournament details and applicants
        const { data } = await axios.get(
          `http://localhost:3001/api/applicationstatus/reviewTournamentApplications/${tournamentId}/${userData._id}`
        );

        setTournament(data.tournament);

        // Fetch user details based on user IDs
        const { data: userDetails } = await axios.post(
          "http://localhost:3001/getUserDetails",
          { userIds: allUserIds }
        );

        // Map user details to applicants
        const updatedApplicants = data.userApplications.map((applicant) => {
          const userDetailsForApplicant = userDetails.find(
            (userDetail) => userDetail._id === applicant.user._id
          );
          return {
            ...applicant,
            user: userDetailsForApplicant,
          };
        });

        setApplicants(updatedApplicants);
      } catch (error) {
        console.error("Error fetching tournament data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTournamentData();
  }, [tournamentId]);

  return (
    <>
      <NavbarTO />
      <div className="d-flex justify-content-center align-items-center">
        <h2>Applicants for {tournament?.tournamentName}</h2>

        {applicants?.length > 0 ? (
          <ul>
            {applicants.map((applicantions) => (
              <li key={applicantions._id}>
                User Name: {applicantions.userName}
              </li>
            ))}
          </ul>
        ) : (
          <p>No applicants for this tournament.</p>
        )}
      </div>
    </>
  );
}
export default ViewApplicants;
