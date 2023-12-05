import { useState } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Signup(){
    const [name , setName] = useState();
    const [email , setEmail] = useState();
    const [password , setPassword] = useState();
    const [usertype , setUserType] = useState('systemadministrator');
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/register' , {name,email,password,usertype})
        .then(result => {console.log(result)
            alert("User created sucessfully")
            navigate('/login')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name">
                    <strong>Name</strong>    
                </label>
                <input
                    type="text"
                    placeholder="Enter your name"
                    autoComplete="off"
                    name="Name"
                    className="form-control rounded-0"
                    onChange={(e) => setName(e.target.value)}
                    required             
                />
            </div>
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
                    required             
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
                    required             
                />
            </div>
            <div className="mb-3">
                <label htmlFor="usertype">
                    <strong>Usertype</strong>
                </label>
                <select
                    type="select"
                    name="Usertype"
                    className="form-control rounded-0"
                    value={usertype}
                    onChange={(e) => setUserType(e.target.value)}             
                >
                    <option value="systemadministrator">System Administrator</option>
                    <option value="applicant">Applicant</option>
                    <option value="collaborator">Collaborator</option>
                    <option value="tournamentorganizer">Tournament Organizer</option>
                    <option value="eventcoordinator">Event Coordinator</option>
                    <option value="sponsor">Sponsor</option>
                </select>
            </div>
                <button type="submit" className="btn btn-success w-100 rounded-0">Register</button>
            </form> 
                <p>Already have an Account?</p>
                <Link to="/Login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                Login
                </Link>
        </div>
        </div>
    );
}

export default Signup;