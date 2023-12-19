import { Link } from "react-router-dom";
import React, {useEffect} from "react";
import "./About.css";
import Header_dashBoard from "../DashboardProfile/Header_dashBoard";
import ReactGA4 from "react-ga4";
const About = () => {
  useEffect(() => {
  
    ReactGA4.send({
      hitType: "pageview",
      page_title: "About Page",
      page_location: window.location.href,
    });
  }, []);



  return (
    <div>
      <Header_dashBoard />
      <div className="about-page">
        <h1 className="about-title">About Us</h1>
        <p className="about-paragraph">
          The Book Reservation System project was conceived to cater to the
          evolving requirements of our community's public library system. In
          light of the ever-increasing demand for convenience and accessibility
          in today's digital era, we embarked on this project with the goal of
          addressing the challenge of delivering a user-friendly and efficient
          book reservation system for our diverse range of library patrons. Our
          primary focus is to harness the power of technology to simplify and
          expedite the book reservation process, ultimately enhancing the
          overall library experience. Through this endeavor, we seek to not only
          streamline library operations but also empower our community with
          effortless access to our extensive collection. This initiative
          underscores our steadfast commitment to excellence in providing
          accessible, inclusive, and innovative library services for all
          residents of the Monroe County Public Library.
        </p>
      </div>
    </div>
  );
};

export default About;
