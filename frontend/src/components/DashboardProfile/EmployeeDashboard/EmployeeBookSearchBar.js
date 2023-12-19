import React, { useState} from 'react';
import { FaSearch } from 'react-icons/fa';
import './EmployeeSearchBar.css';

const EmployeeBookSearchBar = ({ onSearch }) => {
  const selectedField = 'all fields';
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input.trim(), selectedField);
  };

  return (
      <div className="emp-search-bar-container">
        <form className="emp-search-form" onSubmit={handleSubmit}>
          <input
            className="emp-search-form-input"
            type="text"
            placeholder="Type to search..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />

          <button type="text" className="emp-searchbutton" onClick={handleSubmit}>
            <FaSearch id="search-icon" />
          </button>
        </form>
      </div>
  );
};

export default EmployeeBookSearchBar;