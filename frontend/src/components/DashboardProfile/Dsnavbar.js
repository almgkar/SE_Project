import { Link } from "react-router-dom";
import React from "react";
import "./Dsnavbar.css";

const Dsnavbar = ({ userId }) => {
  return (
    <nav className="navbar" id="navbar">
      <div className="navbar-container">
        <div className="ls-nav">
          <Link to="/" className="nav-link">
            Book Search
          </Link>
          <Link
            to="/ProfileForm"
            className="nav-link"
            state={{ userId: userId }}
          >
            Edit Profile
          </Link>
          <Link
            to="/MakePayment"
            className="nav-link"
            state={{ userId: userId }}
          >
            Payment Late Fees
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Dsnavbar;
