import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarA from "./Applicant/NavbarA";

function DashboardA() {
  const [verify, setVerify] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/home")
      .then((res) => {
        if (res.data === "Login is successful") {
          setVerify("Welcome! You are logged in as an Applicant");
        } else {
          // navigate back to homepage
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <NavbarA />
      <p>Dashboard: Applicant</p>
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

export default DashboardA;
