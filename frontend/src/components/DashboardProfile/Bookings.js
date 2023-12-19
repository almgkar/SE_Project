import "./Bookings.css";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userSession from "../LoginSingup/userSession";
import axios from "axios";

const url = process.env.REACT_APP_API_URL || "http://localhost:3001";
const params = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};

const Bookings = () => {
  const userId = userSession.getUserId();
  console.log("Inside Bookings");
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const [bookAvailability, setBookAvailability] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    async function getBookDetails() {
      try {
        const response = await fetch(
          `${url}/search?term=${userId}&field=all%20fields`,
          params
        );
        const data = await response.json();

        if (data) {
          const {
            longDescription,
            title,
            thumbnailUrl,
            publishedDate,
            categories,
            Availability,
          } = data[0];

          const newBook = {
            description: longDescription
              ? longDescription
              : "No description found",
            title: title,
            cover_img: thumbnailUrl,
            published: publishedDate,
            subjects: categories ? categories.join(", ") : "No subject foud",
            Availability: Availability,
          };

          setBookAvailability(newBook.Availability);
          setBook(newBook);
          await axios.post(`${url}/search/increment-search/${userId}`);
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
  });

  return (
    <section className="book-details" id="book-details">
      <div className="book-container">
        <div className="book-details-content">
          <div className="book-details-img">
            <img src={book?.cover_img} alt="cover img" />
          </div>
          <div className="book-details-info">
            <div className="book-details-item title">
              <span className="book-title">{book?.title}</span>
            </div>
            <div className="book-details-item description">
              <span className="book-description">{book?.description}</span>
            </div>
            <div className="book-details-item published">
              <span className="book-published-text">Publish Date: </span>
              <span className="book-published">{book?.published}</span>
            </div>
            <div className="book-details-item subjects">
              <span className="book-subjects-text">Subjects: </span>
              <span>{book?.subjects}</span>
            </div>
          </div>
        </div>
        <div className="reserve-button-holder"></div>
      </div>
    </section>
  );
};

export default Bookings;
