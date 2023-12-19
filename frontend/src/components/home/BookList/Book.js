import React from "react";
import { Link } from "react-router-dom";
import "./BookList.css";

const auth = "Authors: ";
const Book = (book) => {
  return (
    <div className="book-item">
      <Link className="link-to-book" to={`/book/${book.isbn_num}`} {...book}>
        <div className="book-item-img">
          <img src={book.cover_img} alt="cover" loading="lazy"></img>
        </div>
      </Link>
      <div className="book-item-info">
        <Link className="link-to-book" to={`/book/${book.isbn_num}`} {...book}>
          <div className="book-item-info-item title">
            <span>{book.title}</span>
          </div>
        </Link>
        <div className="book-item-info-item author">
          <span className="author-sec">{auth}</span>
          <span>{book.author.join(", ")}</span>
        </div>
        <div className="book-item-info-item isbn">
          <span className="isbn-sec">ISBN: </span>
          <span>{book.isbn_num}</span>
        </div>
      </div>
    </div>
  );
};

export default Book;
