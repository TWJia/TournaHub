import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import NavbarTO from "./NavbarTO";

function InvitationPage() {

    const [userDetails, setUserDetails] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [tournamentId, setTournamentId] = useState(""); // New state for tournament ID
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
        // Fetch tournament details when the component mounts
        axios.get(`http://localhost:3001/getAllUser`)
          .then((response) => {
            setUserDetails(response.data);
          })
          .catch((error) => {
            console.error('Error fetching user details:', error);
          })
      }, []);

      const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .post('http://localhost:3001/CreateStatus', { 
            tournamentId: tournamentId, 
            userId: user.id,
            collaboratorStatus: 'Pending', })
          .then((result) => {
            console.log(result);
            alert('Invite sent');
            navigate('/Tournament');
          })
          .catch((err) => console.log(err));
      };


      const handleChange = (e) => {
        setSelectedUserId(e.target.value);
        const selectedUser = userDetails.find(user => user.id === e.target.value);
    
        if (selectedUser && selectedUser.tournamentId) {
          setTournamentId(selectedUser.tournamentId);
        } else {
          setTournamentId("");
        }
      };

      const tournamentOrganizers = userDetails.filter(user => user.usertype === 'tournamentorganizer');

      return (
        <>
          <NavbarTO />
          <div className="d-flex justify-content-center align-items-center">
            <div className="bg-white rounded p-3">
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label htmlFor="tournamentName">Name</label>
                  <p></p>
                  <select
                    value={selectedUserId}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select a tournament organizer</option>
                    {tournamentOrganizers.map((user) => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </div>
    
                <p><button type="submit">Invite</button></p>
              </form>
            </div>
          </div>
        </>
      );
    }

export default InvitationPage;