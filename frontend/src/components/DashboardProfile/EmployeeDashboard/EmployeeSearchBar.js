import React, { useState} from 'react';
import { FaSearch } from 'react-icons/fa';
import './EmployeeSearchBar.css';

const EmployeeSearchBar = ({ onSearch }) => {
  const [selectedField, setSelectedField] = useState('username');
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input, selectedField);
  };

  return (
      <div className="emp-search-bar-container">
        <select
          className="emp-select-field"
          value={selectedField}
          onChange={(event) => {
            setSelectedField(event.target.value);
          }}
        >
          <option value="username" className="option-text">
            Username
          </option>
          <option value="fullName" className="option-text">
            Fullname
          </option>
        </select>
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

export default EmployeeSearchBar;
