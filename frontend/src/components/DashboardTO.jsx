import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarTO from "./NavbarTO";

function DashboardTO() {
    const [ verify, setVerify ] = useState()
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    useEffect(() => {
        axios.get('http://localhost:3001/DashboardTO')
        .then(res => {
            if (res.data === "Login is successful") {
                setVerify("Welcome! You are logged-in as a Tournament Organizer")
            }
            else {
                //navigate back to homepage
                navigate('/')
            }
            }).catch(err => console.log(err))
        }, [])

    return(
        <div>
        <NavbarTO />    
        <p>Dashboard: Tournament Organizer</p>
        <p>{verify}</p>
        </div>
    );
}

export default DashboardTO;