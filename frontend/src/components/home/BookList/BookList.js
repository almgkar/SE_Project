import React from 'react';
import { useGlobalContext } from '../Context';
import Book from './Book';
import Loading from "../Loader";
import coverImg from "../images/cover_not_found.jpg";
import "./BookList.css";
import { useState } from 'react';

const BookList = () => {
    const {books, loading, resultTitle, currentPage, setCurrentPage} = useGlobalContext();
    const [pageNum, setPageNum] = useState(currentPage);

   
    const booksWithCovers = books.map((singleBook) => {
        return {
            ...singleBook,
            cover_img: singleBook.cover_id ? singleBook.cover_id : coverImg
        }
    });

    const booksPerPage = 21; 
  
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
  
    const totalBooks = booksWithCovers.length;
    const totalPages = Math.ceil(totalBooks / booksPerPage);

    if(loading) return <Loading/>;

    const handlePageInputChange = (e) => {
        let value = e.target.value;

        if (value === '' || (value >= 1 && value <= totalPages)) {
            setCurrentPage(value === '' ? 1 : parseInt(value, 10));
            setPageNum(value === '' ? 1 : parseInt(value, 10));
            const resultsSection = document.getElementById('booklist');
            if (resultsSection) {
                resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
        } else {
            setPageNum(currentPage);
        }
      };

    const handlePageInputKeyDown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handlePageInputChange(e);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            setPageNum(currentPage + 1);

            setTimeout(() => {
                const resultsSection = document.getElementById('booklist');
                if (resultsSection) {
                  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 0);
        }
    };
    
    const handlePrevPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
          setPageNum(currentPage - 1);
        }
        setTimeout(() => {
            const resultsSection = document.getElementById('booklist');
            if (resultsSection) {
              resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 0);
      };

    return(
        <section className='booklist' id='booklist'>
            <div className='books-container'>
                <div className='section-title'>
                    <h2>{resultTitle}</h2>
                </div>
                <div className='booklist-content'>
                    {
                        booksWithCovers.slice(startIndex, endIndex).map((item, index) => {
                            return (
                                <Book key = {index} {...item} />
                            )
                        })
                    }
                </div>
                {totalBooks > 0 && (
                    <div className='pagination'>
                        <button onClick={handlePrevPage} disabled={currentPage === 1}>
                        Previous
                        </button>
                        <span className='page-tracker-container'>
                        <label className="page-text">Page</label>
                            <input
                                className='pageInput'
                                id="pageInput"
                                type="text"
                                value={pageNum}
                                onChange={(e) => {setPageNum(e.target.value)}}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      handlePageInputKeyDown(e);
                                    }
                                  }}
                                inputMode="numeric"
                            />
                            <span className='page-tracker'>of {totalPages} | Total Books: {totalBooks}</span>   
                        </span>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Next
                        </button>
                    </div>
                )}
            </div>
        </section>
        
    )
}

export default BookList;