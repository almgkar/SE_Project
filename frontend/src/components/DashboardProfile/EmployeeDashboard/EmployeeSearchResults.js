import React from 'react';

const EmployeeSearchResults = ({ searchResults, selectedBook, handleCheckboxChange2, handleReserveClick, handleReturnClick }) => {
  return (
    <div className="search-results-container">
      <h3 className='search-results-text'>Search Results</h3>
      <div className="scroll-container">
        <ul>
          {searchResults.map((book) => (
            <div key={book.id} className="search-result-book">
              <div className="book-info">
                <p className='title-text'>Title: {book.title}</p>
                <p>Availability: {book.Availability ? 'Available' : 'Not Available'}</p>
              </div>
              <div className='isbn-checkbox'>
                <p>ISBN: {book.isbn}</p>
                <div className="book-checkboxes">
                  <input
                    type="checkbox"
                    checked={selectedBook === book.isbn}
                    disabled={!book.Availability}
                    onChange={() => handleCheckboxChange2(book.isbn)}
                  />
                </div>
              </div>    
            </div>
          ))}
        </ul>
      </div>
      <div className='reserve-return-container'>
        <button className='reserve-book-button' onClick={handleReserveClick} disabled={!selectedBook}>
          Reserve
        </button>
        <button className='return-button' onClick={handleReturnClick}>Return</button>
      </div>
    </div>
  );
};

export default EmployeeSearchResults;
