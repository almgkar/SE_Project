import React from 'react';
import EmployeeSearchBar from './EmployeeSearchBar';
import EmployeeBookSearchBar from './EmployeeBookSearchBar';
import EmployeeSearchResults from './EmployeeSearchResults';
import EmployeeReservedBooks from './EmployeeReservedBooks';

const EmployeeUserInfo = ({
  view,
  userData,
  userBooks,
  selectedBooks,
  isUnreserveButtonDisabled,
  searchResults,
  selectedBook,
  field,
  amount,
  money,
  setMoney,
  handleSearch,
  handleCheckboxChange,
  handleCheckboxChange2,
  handleUnreserveClick,
  handleAddClick,
  handleReturnClick,
  handleReserveClick,
  handleSearchSubmit,
  handlePayClick,
}) => {
  return (
    <div className='user-info-container'>
      {view === 'details' && (
        <EmployeeSearchBar onSearch={handleSearch} />
      )}

      {userData && view === 'details' && (
        <div className="user-result-container">
          <h3>User Information</h3>
          <div className="user-info-row">
            <div>
              <p>First Name: {userData.first_name}</p>
              <p>Last Name: {userData.last_name}</p>
              <p>Amount Due: ${amount}</p>
            </div>
            <div>
              <p>Username: {userData.user_id}</p>
              <p>Email: {userData.user_id}</p>
              <div className="cash-payment-container">
                <input
                  className='cash-input'
                  type="text"
                  placeholder="Enter payment amount"
                  value={money}
                  disabled={amount === 0}
                  onChange={(e) => setMoney(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handlePayClick(e);
                    }
                  }}
                  inputMode="numeric"
                />
                <button disabled={amount === 0} onClick={handlePayClick}>Pay</button>
              </div>
            </div>
          </div>
        </div>
      )}  
      {view === 'search' && (
        <EmployeeBookSearchBar onSearch={handleSearchSubmit}/>
      )}
      {view === 'search' && searchResults.length === 0 && (
        <div className='return-button-contianer'>
          <button className='return-button' onClick={handleReturnClick}>Return</button>
        </div>
      )}
      {view === 'search' && searchResults.length > 0 && (
        <EmployeeSearchResults
          searchResults={searchResults}
          selectedBook={selectedBook}
          handleCheckboxChange2={handleCheckboxChange2}
          handleReturnClick={handleReturnClick}
          handleReserveClick={handleReserveClick}
        />
      )}
      {userBooks && view === 'details' && (
        <EmployeeReservedBooks
          userBooks={userBooks}
          selectedBooks={selectedBooks}
          handleCheckboxChange={handleCheckboxChange}
          handleUnreserveClick={handleUnreserveClick}
          handleAddClick={handleAddClick}
          isUnreserveButtonDisabled={isUnreserveButtonDisabled}
        />
      )}
    </div>
  );
};

export default EmployeeUserInfo;
