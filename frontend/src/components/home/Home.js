import React, { useEffect } from "react";
import MainSection from "./MainSection";
import { Outlet } from "react-router-dom";
import ReactGA4 from "react-ga4";
const Home = () => {
  useEffect(() => {
    ReactGA4.send({ hitType: "pageview", page_location: "/", page_title: "Home Page" });
  }, []);


  return (
    <div>
      <MainSection />
      <Outlet />
    </div>
  );
};
export default Home;
