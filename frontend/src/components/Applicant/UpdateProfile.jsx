import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarA from "./NavbarA";

const UpdateProfile = () => {
  const [user, setUser] = useState(null);
  const [sportsList, setSportsList] = useState([]);
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interestedSport, setInterestedSport] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/getCurrentUser" ,
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
    // Fetch the list of sports from the database
    axios
      .get('http://localhost:3001/getSports')
      .then((response) => {
        setSportsList(response.data);
      })
      .catch((err) => console.log(err));
  }, []); // Run only once when the component mounts

  const Update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/updateProfile/", {
        name,
        email,
        interestedSport,
        skillLevel
      })
      .then((result) => {
        console.log(result);
        alert("User updated successfully");
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  //   return (
  //     <div>
  //       <NavbarA />
  //       <h1>Update Profile</h1>
  //       {user && (
  //         <div>
  //           <p>
  //             <strong>Name:</strong> {user.name}
  //           </p>
  //           <p>
  //             <strong>Email:</strong> {user.email}
  //           </p>
  //           <p>
  //             <strong>Password:</strong> {user.password}
  //           </p>
  //         </div>
  //       )}
  //     </div>
  //   );
  // };
  return (
    <div>
      <NavbarA />
      <div className="d-flex vh-102 justify-content-center align-items-center"style={{ backgroundColor: '#6b7a8f' }}>
        <div className="w-50 bg-white rounded p-3">
          <h2 style={{ color: 'black' }}>Profile</h2>
          {user && (
            <div>
              <p style={{ color: 'black' }}>Name: {user.name}</p>
              <p style={{ color: 'black' }}>Email: {user.email}</p>
              <p style={{ color: 'black' }}>Gender: {user.gender}</p>
              <p style={{ color: 'black' }}>Date of Birth: {user.dob}</p>
              <p style={{ color: 'black' }}>Interested Sport: {user.interestedSport}</p>
              <p style={{ color: 'black' }}>Skill Level: {user.skillLevel}</p>
            </div>
          )}
          <form onSubmit={Update}>
            <h2 style={{ color: 'black' }}>Update Profile</h2>
            <div className="mb-2">
              <label htmlFor="">New Name</label>
              <input
                type="text"
                placeholder="Enter new name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">New Email</label>
              <input
                type="text"
                placeholder="Enter new email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="interestedSport">Interested Sport</label>
              <select
                id="interestedSport"
                className="form-control"
                value={interestedSport}
                required
                onChange={(e) => setInterestedSport(e.target.value)}
              >
                <option value="" disabled>
                  Select interested sport
                </option>
                {sportsList.map((sport) => (
                  <option key={sport._id} value={sport.name}>
                    {sport.name}
                  </option>
                ))}
              </select>
            </div>
          <div className="mb-2">
            <label htmlFor="skillLevel">Skill Level</label>
            <select
              id="skillLevel"
              className="form-control"
              value={skillLevel}
              required
              onChange={(e) => setSkillLevel(e.target.value)}
            >
              <option value="" disabled>
                Select skill level
              </option>
              <option value="beginner">Beginner</option>
              <option value="amateur">Amateur</option>
              <option value="professional">Professional</option>
            </select>
          </div>


            <button type="submit" className="btn" style={{ backgroundColor: '#8496a3', color: 'black' }}>
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
