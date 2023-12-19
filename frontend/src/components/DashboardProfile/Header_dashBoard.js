import { Link } from "react-router-dom";
import logo from "../home/images/logoMCAT.png";
import React from "react";
import "./Header_dashBoard.css";

const Header_dashBoard = () => {
  //const navigate = useNavigate();

  return (
    <nav className="navbar" id="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link className="logo-container" to="/">
            <img className="home-logo" src={logo} alt="Logo" />
            <span className="site-name">MonroeCAT</span>
          </Link>
          <Link to="/Logout" className="site-name">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Header_dashBoard;
