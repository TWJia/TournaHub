import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarTO from "./NavbarTO";

function DashboardTO() {
  const [verify, setVerify] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/DashboardTO')
      .then(res => {
        if (res.data === "Login is successful") {
          setVerify("Welcome! You are logged in as a Tournament Organizer");
        } else {
          // navigate back to homepage
          navigate('/');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getCurrentUser');
        setUser(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <NavbarTO />
      <p>Dashboard: Tournament Organizer</p>
      <p>{verify}</p>
      {user && (
        <div>
          <p>User ID: {user._id}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}

export default DashboardTO;