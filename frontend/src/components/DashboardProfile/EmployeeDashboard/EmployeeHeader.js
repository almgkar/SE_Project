import React from 'react';
import './EmployeeDashboard.css';

const EmployeeHeader = ({handleButtonClick}) => {

  return (
    <div className='subheader-container'>
      <div className='subheader1'>
        <h1 className='emp-dashboar-title'>Employee Dashboard</h1>
        <div className='google-button-container1'>
            <button onClick={handleButtonClick} className='google-analytics-button1'>
              <div className='button-text'>Google Analytics</div>
            </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHeader;
