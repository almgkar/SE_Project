import React, { useState, useEffect, useLocation } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loader";
import ReactGA from "react-ga4";
import axios from "axios";
import "./BookDetails.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../LoginSingup/Context";
import userSession from "../../LoginSingup/userSession";

const url = process.env.REACT_APP_API_URL || "http://localhost:3001";
const params = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};

const BookDetails = () => {
  // const { state } = useLocation();
  // const user_id = state.userId;
  // console.log("User ID Test:", user_id);
  const userId = userSession.getUserId();

  console.log("User_id is below");
  console.log(userId);

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const [bookAvailability, setBookAvailability] = useState(true);
  const navigate = useNavigate();
  const button_text = bookAvailability ? "Reserve" : "Unavailable";

  console.log("current id: " + id);

  // const { state: authState } = useAuth();
  // const userId = authState.user ? authState.user : null;

  // console.log(userId);

  useEffect(() => {
    setLoading(true);

    async function getBookDetails() {
      try {
        const response = await fetch(
          `${url}/search?term=${id}&field=all%20fields`,
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
          await axios.post(`${url}/search/increment-search/${id}`);
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
    setTimeout(() => {
      const resultsSection = document.getElementById("book-details");
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 650);
  }, [id]);

  useEffect(() => {
    if (book && book.title) {
      ReactGA.send({
        hitType: "event",
        eventCategory: "Book",
        eventAction: "Book_Viewed",
        eventLabel: book.title,
      });
    }
  }, [book]);

  const handleReserve = async () => {
    userSession.setRequestArea("Book");
    userSession.setbookId(id);
    if (!userId) {
      navigate("/LoginSignup");
    } else {
      try {
        const response = await fetch(`${url}/reserve`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isbn: id,
            username: userId,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setBookAvailability(false);
          console.log("Book reserved successfully:", data.message);
        } else {
          console.error("Failed to reserve book:", data.error);
        }
      } catch (error) {
        console.error("Error during reservation:", error);
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <section className="book-details" id="book-details">
      <div className="book-container">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/book")}
        >
          <FaArrowLeft size={22} />
          <span className="back-button-text">Go Back</span>
        </button>

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
        <div className="reserve-button-holder">
          <button
            type="button"
            className="reserve-button"
            disabled={!bookAvailability}
            onClick={handleReserve}
          >
            {button_text}
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
