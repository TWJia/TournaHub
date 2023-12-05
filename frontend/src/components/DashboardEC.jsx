import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarEC from "./NavbarEC";

function DashboardEC() {
    const [ verify, setVerify ] = useState()
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    useEffect(() => {
        axios.get('http://localhost:3001/DashboardEC')
        .then(res => {
            if (res.data === "Login is successful") {
                setVerify("Welcome! You are logged-in as an Event Coordinator")
            }
            else {
                //navigate back to homepage
                navigate('/')
            }
            }).catch(err => console.log(err))
        }, [])

    return(
        <div>
        <NavbarEC />    
        <p>Dashboard: Event Coordinator</p>
        <p>{verify}</p>
        </div>
    );
}

export default DashboardEC;