import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";
const url = process.env.REACT_APP_API_URL || "http://localhost:3001";
const AppContext = React.createContext();
console.log(process.env);
console.log('the: ', process.env.REACT_APP_API_URL);

const params = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};

const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("title");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultTitle, setResultTitle] = useState("");
  const [initialLoad, setInitialLoad] = useState(true); 
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasFetchedData, setHasFetchedData] = useState(false);

  const fetchBooks = useCallback(async () => {
    if (shouldFetchData) {
      setLoading(true);
      try {
        const response = await fetch(
          `${url}/search?term=${searchTerm}&field=${selectedField}`,
          params
        );
        const data = await response.json();

        if (data) {
          const newBooks = data.map((bookSingle) => {
            const {
              _id,
              authors,
              thumbnailUrl,
              publishedDate,
              longDescription,
              title,
              isbn,
            } = bookSingle;

            return {
              id: _id,
              isbn_num: isbn,
              author: authors,
              cover_id: thumbnailUrl,
              published_date: publishedDate,
              title: title,
              description: longDescription,
            };
          });

          setBooks(newBooks);

          if (hasFetchedData === false) {
            console.log("hasFetchedData is false");
            if (newBooks.length >= 1) {
              setResultTitle("All books");
            } else {
              setResultTitle("No Search Result Found!");
            }
            setHasFetchedData(true);
          } else {
            console.log("hasFetchedData is true");
            if (newBooks.length >= 1) {
              setResultTitle("Your Search Result");
            } else {
              setResultTitle("No Search Result Found!");
            }
          }
        } else {
          setBooks([]);
          setResultTitle("No Search Result Found!");
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  }, [searchTerm, selectedField, shouldFetchData, hasFetchedData]);

  useEffect(() => {
    if (initialLoad && !hasFetchedData) {
      setInitialLoad(false);
      setShouldFetchData(true);
    }
  }, [initialLoad, hasFetchedData]);

  useEffect(() => {
    if (searchTerm) {
      setShouldFetchData(false); 
    }
  }, [searchTerm]);

  useEffect(() => {
    if (initialLoad || shouldFetchData) {
      fetchBooks();
    }
  }, [searchTerm, selectedField, initialLoad, shouldFetchData, fetchBooks]);

  useEffect(() => {
    if (books && books.length > 0) {
      if (searchTerm) {
        setResultTitle("Your search results");
      } else {
        setResultTitle("All books");
      }
    } else {
      setResultTitle("No search result found!");
    }
  }, [books, searchTerm]);

  return (
    <AppContext.Provider
      value={{
        loading,
        books,
        setSearchTerm,
        resultTitle,
        setResultTitle,
        selectedField,
        setSelectedField,
        setShouldFetchData,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
