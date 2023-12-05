import React from "react";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Login() {
    const [email , setEmail] = useState();
    const [password , setPassword] = useState();
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login' , {email,password})
        .then(res => {
            if (res.data.Status === "Login is successful"){
                if (res.data.usertype === "systemadministrator") {
                    window.localStorage.setItem("loggedInSA", true)
                    navigate('/DashboardSA')
                } 
                else if (res.data.usertype === "applicant") {
                    window.localStorage.setItem("loggedInA", true)
                    navigate('/DashboardA')
                }
                else if (res.data.usertype === "collaborator") {
                    window.localStorage.setItem("loggedInC", true)
                    navigate('/DashboardC')
                }
                else if (res.data.usertype === "tournamentorganizer") {
                    window.localStorage.setItem("loggedInTO", true)
                    navigate('/DashboardTO')
                }
                else if (res.data.usertype === "eventcoordinator") {
                    window.localStorage.setItem("loggedInEC", true)
                    navigate('/DashboardEC')
                }
                else if (res.data.usertype === "sponsor") {
                    window.localStorage.setItem("loggedInS", true)
                    navigate('/DashboardS')
                }       
            } else {
                console.log(res.data)
            }
        })
        .catch(err => console.log(err))
    }

    return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email">
                    <strong>Email</strong>
                </label>
                <input
                    type="text"
                    placeholder="Enter your email"
                    autoComplete="off"
                    name="Email"
                    className="form-control rounded-0"
                    onChange={(e) => setEmail(e.target.value)}             
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password">
                    <strong>Password</strong>
                </label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="off"
                    name="Password"
                    className="form-control rounded-0"
                    onChange={(e) => setPassword(e.target.value)}             
                />
            </div>
                <button type="submit" className="btn btn-success w-100 rounded-0">Login</button>
            </form> 
        </div>
        </div>
    );
}

export default Login;