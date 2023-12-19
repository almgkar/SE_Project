import "./MainSection.css";
import React from "react";
import SearchBar from "./SearchBar";
import Header from "./Header";
const MainSection = () => {
  return (
    <div className="holder" id="main-holder">
      <div className="main-section">
        <Header /> 
        <div className="main-section-content" id="main-section-content">
          <h2 className="main-section-title">
          Discover your perfect book
          </h2><br />
          <p className="main-section-text">
          Welcome to our digital library where you can find your perfect book, whether you seek knowledge, adventure, or solace. Begin your reading journey today.
          </p> 
          <SearchBar />
        </div>
      </div>
    </div>
   
  );
};

export default MainSection;


