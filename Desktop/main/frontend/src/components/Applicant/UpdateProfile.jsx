import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarA from "./NavbarA";

const UpdateProfile = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUserType] = useState("");
  const [isActive, setIsActive] = useState("");
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

  const Update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/updateUser/" + id, {
        name,
        email,
        password,
        usertype,
        isActive,
      })
      .then((result) => {
        console.log(result);
        alert("User updated successfully");
        navigate("/ManageUsers");
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
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
          <h2>Profile</h2>
          {user && (
            <div>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
          )}
          <form onSubmit={Update}>
            <h2>Update Profile</h2>
            <div className="mb-2">
              <label htmlFor="">New Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">New Email</label>
              <input
                type="text"
                placeholder="Enter Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">New Password</label>
              <input
                type="text"
                placeholder="Enter Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-success">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
