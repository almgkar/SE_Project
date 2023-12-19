import React, { useEffect, useRef, useState } from 'react';
import './SearchBar.css'
import {FaSearch} from "react-icons/fa"
import { useGlobalContext } from './Context';
import { useNavigate } from 'react-router-dom';
import ReactGA4 from "react-ga4";

const SearchBar = () => {
  const {
    setSearchTerm,
    setResultTitle,
    selectedField,
    setSelectedField,
    setShouldFetchData,
    setCurrentPage,
  } = useGlobalContext();
  const searchText = useRef("");
  const navigate = useNavigate();

  const [input, setInput] = useState("");

  useEffect(() => searchText.current.focus(), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempSearchTerm = searchText.current.value.trim();
    if (tempSearchTerm.replace(/[^\w\s]/gi, "").length === 0) {
      setSearchTerm("Illustrated");
      setResultTitle("Please Enter Something...");
    } else {
      setSearchTerm(tempSearchTerm);
      setShouldFetchData(true);
      setCurrentPage(1);
    }

    ReactGA4.send({
      hitType: "event",
      eventCategory: "Search",
      eventAction: "Submitted",
      eventLabel: tempSearchTerm,
    });

    navigate("/book");

    setTimeout(() => {
      const resultsSection = document.getElementById("booklist");
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 550); 
  };

  return (
    <div className="search-bar-container">
      <select
        className="select-field"
        value={selectedField}
        onChange={(event) => {
          setSelectedField(event.target.value);
          setShouldFetchData(false);
        }}
      >
        <option value="title" className="option-text">
          Title
        </option>
        <option value="author" className="option-text">
          Author
        </option>
        <option value="all fields" className="option-text">
          All Fields
        </option>
      </select>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-form-input"
          type="text"
          placeholder="Type to search..."
          value={input}
          ref={searchText}
          onChange={(event) => setInput(event.target.value)}
        />

        <button type="text" className="searchbutton" onClick={handleSubmit}>
          <FaSearch id="search-icon"></FaSearch>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
