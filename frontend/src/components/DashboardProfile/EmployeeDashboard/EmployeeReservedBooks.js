import React from 'react';

const EmployeeReservedBooks = ({
  userBooks,
  selectedBooks,
  handleCheckboxChange,
  handleUnreserveClick,
  handleAddClick,
  isUnreserveButtonDisabled
}) => {
  return (
    <div className="user-books-container">
      <h3>Reserved Books</h3>
      <div className='reservation-button-container'>
        <button className='unreserve-button'
          onClick={handleUnreserveClick}
          disabled={isUnreserveButtonDisabled}
        >
          Unreserve
        </button>
        <button className='add-button' onClick={handleAddClick}>+</button>
      </div>
      <ul>
        {userBooks.map((book) => (
          <div key={book.isbn} className="reserved-book">
            <p className='title-text'>Title: {book.title}</p>
            <p>ISBN: {book.isbn}</p>
            <div className="book-checkboxes">
              <input
                type="checkbox"
                checked={selectedBooks.includes(book.isbn)}
                onChange={() => handleCheckboxChange(book.isbn)}
              />
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeReservedBooks;
