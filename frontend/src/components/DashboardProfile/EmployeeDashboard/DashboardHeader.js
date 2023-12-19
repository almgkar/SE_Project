import { Link } from "react-router-dom";
import logo from "../../home/images/logoMCAT.png";
import React from "react";
import "../../home/Header.css";

const DashboardHeader = () => {
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
