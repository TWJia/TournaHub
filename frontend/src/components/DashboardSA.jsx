import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarSA from "./NavbarSA";

function DashboardSA() {
    const [ verify, setVerify ] = useState()
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    useEffect(() => {
        axios.get('http://localhost:3001/DashboardSA')
        .then(res => {
            if (res.data === "Login is successful") {
                setVerify("Welcome! You are logged-in as an System Administrator")
            }
            else {
                //navigate back to homepage
                navigate('/')
            }
            }).catch(err => console.log(err))
        }, [])

    return(
        <div>
        <NavbarSA />    
        <p>Dashboard: System Administrator</p>
        <p>{verify}</p>
        </div>
    );
}

export default DashboardSA;