import { Link } from "react-router-dom";
import logo from "./images/logoMCAT.png";
import React, { useState, useEffect} from "react";
import userSession from "../LoginSingup/userSession";
import "./Header.css";

const Header = () => {
  const [userId, setUserId] = useState(null);
  const [type, setUserType] = useState(null);

  useEffect(() => {
    setUserId(userSession.getUserId());
    setUserType(userSession.getUserType());   
  }, []);
    
  const [selectedLocation, setSelectedLocation] = useState("Bloomington");

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
    reloadPage();
  };

  const reloadPage = () =>{
    window.location.reload();
  }


  return (
    <nav className="navbar" id="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link className="logo-container" to="/">
            <img className="home-logo" src={logo} alt="Logo" />
            <span className="site-name">MonroeCAT</span>
          </Link>
          <div className="ls-nav">
            <select
              className="location-dropdown"
              value= {selectedLocation}
              onChange={handleLocationChange}
            >
              <option value="Bloomington">Bloomington</option>
              <option value="Indianapolis">Indianapolis</option>
            </select>
            <Link to="/LoginSignup" className="nav-link">
              SignUp/Login
            </Link>
            {type === "user" && userId  && (
              <Link to="/Dashboard" className="nav-link">
              Dashboard
              </Link>
            )}
            {type === "admin" && userId && (
              <div>
                <Link to="/AdminDashboard" className="nav-link">Admin</Link>
                <Link to="/EmployeeDashboard" className="nav-link">
                  Employee
                </Link>
              </div>
              
            )}

            {type === "employee" && userId && (
              <Link to="/EmployeeDashboard" className="nav-link">
              Employee
              </Link>
            )}

            {type === "customer support" && userId && (
              <Link to="/CustomerSupport" className="nav-link">
              Customer Support
              </Link>
            )}
            
            <Link to="/About" className="nav-link">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;
