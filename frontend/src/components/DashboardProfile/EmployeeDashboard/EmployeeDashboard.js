import React, { useState } from "react";
import HeaderDashboard from "./DashboardHeader";
import EmployeeSearchBar from "./EmployeeSearchBar";
import EmployeeBookSearchBar from "./EmployeeBookSearchBar";
import "./EmployeeDashboard.css";
import userSession from "../../LoginSingup/userSession";
const url = process.env.REACT_APP_API_URL || "http://localhost:3001";
const params = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};
const EmployeeDashboard = () => {
  const type = userSession.getUserType();
  console.log("type is below");
  console.log(type);

  const [view, setView] = useState("details");
  const [userData, setUserData] = useState(null);
  const [userBooks, setUserBooks] = useState(null);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [isUnreserveButtonDisabled, setIsUnreserveButtonDisabled] =
    useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [field, setField] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [amount, setAmount] = useState(0);
  const [money, setMoney] = useState(amount);

  const handleSearch = async (input, selectedField) => {
    try {
      const response = await fetch(
        `${url}/userInfo/get-user?term=${input}&type=${selectedField}`,
        params
      );
      const data = await response.json();

      const resp = await fetch(
        `${url}/userInfo/amount-due?user_id=${data.user.user_id}`,
        params
      );
      const due = await resp.json();

      setUserData(data.user);
      setField(selectedField);
      setAmount(due.amount);

      if (data.user !== null) {
        const booksResponse = await fetch(
          `${url}/search/user-books/${data.user.user_id}`
        );
        const booksData = await booksResponse.json();

        if (booksResponse != null) {
          setUserBooks(booksData);
          setSelectedBooks([]);
          setIsUnreserveButtonDisabled(true);
        } else {
          setUserBooks(null);
          throw new Error(booksData.error || "Failed to fetch user books");
        }
      } else {
        setUserBooks(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserData(null);
      setUserBooks(null);
    }
  };

  const handleCheckboxChange = (isbn) => {
    const updatedSelectedBooks = [...selectedBooks];

    if (updatedSelectedBooks.includes(isbn)) {
      const index = updatedSelectedBooks.indexOf(isbn);
      updatedSelectedBooks.splice(index, 1);
    } else {
      updatedSelectedBooks.push(isbn);
    }

    setSelectedBooks(updatedSelectedBooks);
    setIsUnreserveButtonDisabled(updatedSelectedBooks.length === 0);
  };

  const handleCheckboxChange2 = (isbn) => {
    setSelectedBook((prevSelectedBook) =>
      prevSelectedBook === isbn ? null : isbn
    );
  };

  const handleUnreserveClick = async () => {
    try {
      const response = await fetch(`${url}/reserve/unreserve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isbns: selectedBooks,
          user_id: userData.user_id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Books unreserved successfully:", data.message);
        handleSearch(userData.user_id, field);
      } else {
        console.error("Failed to unreserve books:", data.error);
      }
    } catch (error) {
      console.error("Error during unreserve:", error);
    }
  };

  const handleAddClick = () => {
    setView("search");
  };

  const handleReturnClick = async () => {
    setView("details");
    setSelectedBook(null);
    setSearchResults([]);
    try {
      const booksResponse = await fetch(
        `${url}/search/user-books/${userData.user_id}`
      );
      const booksData = await booksResponse.json();

      if (booksResponse != null) {
        setUserBooks(booksData);
        setSelectedBooks([]);
        setIsUnreserveButtonDisabled(true);
      } else {
        setUserBooks(null);
        throw new Error(booksData.error || "Failed to fetch user books");
      }
    } catch (error) {
      console.error("Error fetching user books:", error);
      setUserBooks(null);
    }
  };

  const handleReserveClick = async () => {
    try {
      if (!selectedBook || !userData || !field) {
        console.error("Invalid parameters for reservation");
        return;
      }

      const response = await fetch(`${url}/reserve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isbn: selectedBook,
          username: userData.user_id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Book reserved successfully:", data.message);
        handleSearch(userData.user_id, field);
        handleSearchSubmit(searchTerm, "all fields");
      } else {
        console.error("Failed to reserve book:", data.error);
      }
    } catch (error) {
      console.error("Error during reservation:", error);
    }
  };

  const handleSearchSubmit = async (searchTerm, selectedField) => {
    setSelectedBook(null);
    setSearchTerm(searchTerm);
    try {
      const response = await fetch(
        `${url}/search?term=${searchTerm}&field=${selectedField}`,
        params
      );
      const data = await response.json();

      if (data) {
        const newBooks = data.map((bookSingle) => {
          const { _id, title, Availability, isbn } = bookSingle;

          return {
            id: _id,
            isbn: isbn,
            title: title,
            Availability: Availability,
          };
        });

        console.log(newBooks);

        setSearchResults(newBooks);
      } else {
        setSearchResults([]);
        throw new Error(data.error || "Failed to fetch search results");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  const handlePayClick = async () => {
    try {
      if (!userData || !money) {
        console.log("no");
        console.error("Invalid parameters for payment");
        return;
      }

      const response = await fetch(`${url}/userInfo/update-amount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userData.user_id,
          payment: money,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Payment successful:", data.amount);
        handleSearch(userData.user_id, field);
      } else {
        console.error("Failed to process payment:", data.error);
      }
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };

  const handleButtonClick = () => {
    window.open(
      "https://analytics.google.com/analytics/web/?authuser=3#/p415081921/reports/intelligenthome",
      "_blank",
      "noopener noreferrer"
    );
  };

  return (
    <div className="employee-dashboard-container">
      <HeaderDashboard />
      <div className="subheader-container">
        <div className="subheader1">
          <h1 className="emp-dashboar-title">Employee Dashboard</h1>
          <div className="google-button-container1">
            <button
              onClick={handleButtonClick}
              className="google-analytics-button1"
            >
              <div className="button-text">Google Analytics</div>
            </button>
          </div>
        </div>
      </div>

      <div className="user-info-container">
        {view === "details" && <EmployeeSearchBar onSearch={handleSearch} />}

        {userData && view === "details" && (
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
                    className="cash-input"
                    type="text"
                    placeholder="Enter payment amount"
                    value={money}
                    disabled={amount === 0}
                    onChange={(e) => setMoney(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handlePayClick(e);
                      }
                    }}
                    inputMode="numeric"
                  />
                  <button disabled={amount === 0} onClick={handlePayClick}>
                    Pay
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {view === "search" && searchResults.length === 0 && (
          <div className="return-button-contianer">
            <button className="return-button" onClick={handleReturnClick}>
              Return
            </button>
          </div>
        )}
        {view === "search" && searchResults.length > 0 && (
          <div className="search-results-container">
            <h3 className="search-results-text">Search Results</h3>
            <div className="scroll-container">
              <ul>
                {searchResults.map((book) => (
                  <div key={book.id} className="search-result-book">
                    <div className="book-info">
                      <p className="title-text">Title: {book.title}</p>
                      <p>
                        Availability:{" "}
                        {book.Availability ? "Available" : "Not Available"}
                      </p>
                    </div>
                    <div className="isbn-checkbox">
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
            <div className="reserve-return-container">
              <button
                className="reserve-book-button"
                onClick={handleReserveClick}
                disabled={!selectedBook}
              >
                Reserve
              </button>
              <button className="return-button" onClick={handleReturnClick}>
                Return
              </button>
            </div>
          </div>
        )}
        {userBooks && view === "details" && (
          <div className="user-books-container">
            <h3>Reserved Books</h3>
            <div className="reservation-button-container">
              <button
                className="unreserve-button"
                onClick={handleUnreserveClick}
                disabled={isUnreserveButtonDisabled}
              >
                Unreserve
              </button>
              <button className="add-button" onClick={handleAddClick}>
                +
              </button>
            </div>
            <ul>
              {userBooks.map((book) => (
                <div key={book.isbn} className="reserved-book">
                  <p className="title-text">Title: {book.title}</p>
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
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
