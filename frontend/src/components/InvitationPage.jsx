import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import NavbarTO from "./NavbarTO";

function InvitationPage() {

    const { tournamentId } = useParams();
    const [userDetails, setUserDetails] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [userId, setUserId] = useState("");

    const [loadingTournament, setLoadingTournament] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        // Fetch user details when the component mounts
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
        axios.post('http://localhost:3001/CreateStatus', {

            tournamentId,
            userId: selectedUserId,
            collaboratorStatus: 'Pending',
        })
          .then((result) => {
            console.log(result);
            alert('Invite sent');
            navigate('/Tournament');
          })
          .catch((err) => console.log(err));
    };

    const handleChange = (e) => {
      const selectedUserId = e.target.value;
      setSelectedUserId(selectedUserId);
  
      // Find the selected user based on userId
      const selectedUser = userDetails.find(user => user._id === selectedUserId);
  
      if (selectedUser) {
          // If the user is found, set the userId and tournamentId
          setUserId(selectedUser._id);
      } else {
          console.log("Selected User is undefined.");
          // Handle this case, perhaps show an error message or set default values.
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
                                    <option key={user._id} value={user._id}>{user.name}</option>
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