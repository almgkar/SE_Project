import React, { useState, useEffect } from "react";
import { useNavigate, useResolvedPath } from "react-router-dom";
import HeaderDashBoard from "./Header_dashBoard";
import Footer from "../home/Footer";
import DsMainSection from "./Ds_Mainsection";
import { useLocation } from "react-router-dom";
import userSession from "../LoginSingup/userSession";

const Dashboard = () => {
  const navigate = useNavigate();
  const userId = userSession.getUserId();
  useEffect(() => {
    const type = userSession.getUserType();
    if (!userId) {
      navigate("/LoginSignup");
    } else if (type !== "user") {
      navigate("/LoginSignup");
    }
  }, []);
  //var userId = userSession.getUserId();
  return (
    <div>
      <HeaderDashBoard />
      <DsMainSection userId={userId} />
      <Footer />
    </div>
  );
};

export default Dashboard;
