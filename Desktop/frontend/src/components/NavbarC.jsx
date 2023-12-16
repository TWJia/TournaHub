import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "./images/Tournahub.png";

import {useNavigate} from 'react-router-dom';

export default function NavbarC() {
  const [click, setClick] = useState(false);

  const navigate = useNavigate();
  const navigateToDashboardCPendingCollaboration = () => {
    //navigate to /DashboardCPendingCollaboration
    navigate('/DashboardCPendingCollaboration');
  };

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const Logout = () => {
    window.localStorage.removeItem("loggedInC")
  }

  return (
    <div>
      <div className="navbar">
        <div className="navbar-container">
          <Link to="/DashboardC" onClick={closeMobileMenu}>
            {<img className="nav-logo" src={logo} />}
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <MenuIcon />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <a className="nav-links" onClick={navigateToDashboardCPendingCollaboration}>
                Collaboration
              </a>
            </li>
            <li className="nav-item">
                <a href="/" className="nav-links" onClick={() => Logout()}>
                  LogOut
                </a>
              </li>
          </ul>
        </div>
      </div>
    </div>
  );
}