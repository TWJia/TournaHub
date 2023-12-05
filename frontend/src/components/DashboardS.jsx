import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarS from "./NavbarS";

function DashboardS() {
    const [ verify, setVerify ] = useState()
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    useEffect(() => {
        axios.get('http://localhost:3001/DashboardS')
        .then(res => {
            if (res.data === "Login is successful") {
                setVerify("Welcome! You are logged-in as a Sponsor")
            }
            else {
                //navigate back to homepage
                navigate('/')
            }
            }).catch(err => console.log(err))
        }, [])

    return(
        <div>
        <NavbarS />    
        <p>Dashboard: Sponsor</p>
        <p>{verify}</p>
        </div>
    );
}

export default DashboardS;