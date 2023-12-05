import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarC from "./NavbarC";

function DashboardC() {
    const [ verify, setVerify ] = useState()
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    useEffect(() => {
        axios.get('http://localhost:3001/DashboardC')
        .then(res => {
            if (res.data === "Login is successful") {
                setVerify("Welcome! You are logged-in as a Collaborator")
            }
            else {
                //navigate back to homepage
                navigate('/')
            }
            }).catch(err => console.log(err))
        }, [])

    return(
        <div>
        <NavbarC />    
        <p>Dashboard: Collaborator</p>
        <p>{verify}</p>
        </div>
    );
}

export default DashboardC;