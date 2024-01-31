// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import NavbarTO from "./NavbarTO";

// function ViewApplicants() {
//   const navigate = useNavigate();
//   const { tournamentId } = useParams();
//   const [tournament, setTournament] = useState(null);
//   const [applicants, setApplicants] = useState([]);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTournamentData = async () => {
//       try {
//         if (!user) {
//           console.error("User not available");
//           return;
//         }

//         const response = await axios.get(
//           `http://localhost:3001/reviewTournamentApplications/${tournamentId}/${user._id}`
//         );
//         setTournament(response.data);
//       } catch (error) {
//         console.error("Error fetching tournament data:", error);
//       }
//     };
//   }, [tournamentId, user]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:3001/getCurrentUser"
//         );
//         setUser(data);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       <NavbarTO />
//       <div className="d-flex justify-content-center align-items-center">
//         <h2>Applicants for {tournament?.tournamentName}</h2>

//         {applicants?.length > 0 ? (
//           <ul>
//             {applicants.map(async (applicant) => {
//               try {
//                 const userResponse = await axios.get(
//                   `http://localhost:3001/getUser/${applicant.user?.user._id}`
//                 );
//                 const userName = userResponse.data?.name || "Unknown User";

//                 return <li key={applicant._id}>User Name: {userName}</li>;
//               } catch (error) {
//                 console.error("Error fetching user data:", error);
//                 return null;
//               }
//             })}
//           </ul>
//         ) : (
//           <p>No applicants for this tournament.</p>
//         )}
//       </div>
//     </>
//   );
// }

// export default ViewApplicants;
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavbarTO from "./NavbarTO";

function ViewApplicants() {
  const navigate = useNavigate();
  const { tournamentId } = useParams();
  const [tournament, setTournament] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ...
        if (user && user._id) {
          const response = await axios.get(
            `http://localhost:3001/reviewTournamentApplications`
          );

          setTournament(response.data);
          setApplicants(response.data?.applications.user || []);
        }
      } catch (error) {
        console.error("Error fetching tournament data:", error);
      }
    };

    if (user) {
      fetchTournamentData();
    }
  }, [tournamentId, user]);

  const fetchTournamentData = async () => {
    try {
      if (!user || !user._id) {
        console.error("User or user ID not available");
        return;
      }

      const userApplication = tournament?.applications?.find((application) =>
        application.user?._id.equals(user._id)
      );

      if (!userApplication) {
        console.error("User application not found");
        return;
      }

      const response = await axios.get(
        `http://localhost:3001/reviewTournamentApplications`
      );

      setTournament(response.data);
      setApplicants(response.data?.applications || []);
    } catch (error) {
      console.error("Error fetching tournament data:", error);
    }
  };
  return (
    <>
      <NavbarTO />
      <div className="d-flex justify-content-center align-items-center">
        <h2>Applicants for {tournament?.tournamentName}</h2>

        {applicants?.length > 0 ? (
          <ul>
            {applicants.map(async (applicant) => {
              try {
                const userResponse = await axios.get(
                  `http://localhost:3001/getUser/${applicant.user?.user._id}`
                );
                const userName = userResponse.data?.name || "Unknown User";

                return <li key={applicant._id}>User Name: {userName}</li>;
              } catch (error) {
                console.error("Error fetching user data:", error);
                return null;
              }
            })}
          </ul>
        ) : (
          <p>No applicants for this tournament.</p>
        )}
      </div>
    </>
  );
}

export default ViewApplicants;
