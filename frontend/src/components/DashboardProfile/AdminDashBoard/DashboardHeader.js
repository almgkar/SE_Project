import { Link } from "react-router-dom";
import logo from "../../home/images/logoMCAT.png";
import React, { useState, useEffect} from "react";
import userSession from "../../LoginSingup/userSession";
import "../../home/Header.css";

const DashboardHeader = () => {
  const [userId, setUserId] = useState(null);
  const [type, setUserType] = useState(null);

  useEffect(() => {
    setUserId(userSession.getUserId());
    setUserType(userSession.getUserType());   
  }, []);

  return (
    <nav className="navbar" id="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link className="logo-container" to="/">
            <img className="home-logo" src={logo} alt="Logo" />
            <span className="site-name">MonroeCAT</span>
          </Link>
          <div className="ls-nav">
            <Link to="/LoginSignup" className="nav-link">
              SignUp/Login
            </Link>
            <Link to="/AdminDashboard" className="nav-link">
              Admin
            </Link>
            <Link to="/EmployeeDashboard" className="nav-link">
              Employee
            </Link>
            <Link to="/CustomerSupport" className="nav-link">
              Customer Support
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default DashboardHeader;
