import React, { useState, useEffect } from "react";
import HeaderDashboard from "./DashboardHeader";
import TopSearchedBooksChart from "./TopSearchedBooksChart";
import TopBookedBooksChart from "./TopBookedBooksChart";
import "./AdminDashboard.css";
import { FaUsers, FaBookOpen, FaBook } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import userSession from "../../LoginSingup/userSession";
import { useNavigate } from "react-router-dom";

const url = process.env.REACT_APP_API_URL || "http://localhost:3001";

const AdminDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const type = userSession.getUserType();
    console.log("type is below");
    console.log(type);
    if (type !== "admin") {
      navigate("/LoginSignup");
    }
  }, []);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBookReservations, setTotalBookReservations] = useState(0);
  const [availableBooks, setAvailableBooks] = useState(0);
  useEffect(() => {
    fetch(`${url}/search/count-books`)
      .then((response) => response.json())
      .then((data) => {
        setTotalBooks(data.count);
        setAvailableBooks(data.availableBooks);
      })
      .catch((error) => {
        console.error("Error fetching total books:", error);
      });

    fetch(`${url}/userInfo/count-users`)
      .then((response) => response.json())
      .then((data) => {
        setTotalUsers(data.count);
      })
      .catch((error) => {
        console.error("Error fetching total users:", error);
      });

    fetch(`${url}/search/total-book-reservations`)
      .then((response) => response.json())
      .then((data) => {
        setTotalBookReservations(data.totalBookReservations);
      })
      .catch((error) => {
        console.error("Error fetching total book reservations:", error);
      });
  }, []);

  const handleButtonClick = () => {
    window.open(
      "https://analytics.google.com/analytics/web/?authuser=3#/p415081921/reports/intelligenthome",
      "_blank",
      "noopener noreferrer"
    );
  };

  return (
    <div>
      <HeaderDashboard />
      <div className="subheader">
        <div className="dashboard-title">Admin Dashboard</div>
        <div className="google-button-container">
          <button
            onClick={handleButtonClick}
            className="google-analytics-button"
          >
            <div className="button-text">Google Analytics</div>
          </button>
        </div>
      </div>
      <div className="data-container1">
        <div className="data">
          <div className="data-section">
            <div className="data-containers">
              <FaBookOpen size="2rem" />
              <div>TOTAL BOOKS</div>
              <div>{totalBooks}</div>
            </div>
            <div className="data-containers">
              <FaUsers size="2rem" />
              <div>REGISTER USERS</div>
              <div>{totalUsers}</div>
            </div>
            <div className="data-containers">
              <FaBookmark size="2rem" />
              <div>RESERVATIONS</div>
              <div>{totalBookReservations}</div>
            </div>
            <div className="data-containers">
              <FaBook size="2rem" />
              <div>AVAILABLE BOOKS</div>
              <div>{availableBooks}</div>
            </div>
          </div>
          <div className="charts-container">
            <TopSearchedBooksChart />
            <TopBookedBooksChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
