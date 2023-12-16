import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarS from "./NavbarS";

function DashboardS() {
  const [verify, setVerify] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/DashboardS')
      .then(res => {
        if (res.data === "Login is successful") {
          setVerify("Welcome! You are logged in as a Sponsor");
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
      <NavbarS />
      <p>Dashboard: Sponsor</p>
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

export default DashboardS;