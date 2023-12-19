const express = require("express");
const router = express.Router();
const connectDB = require("./../models/_db");
const dotenv = require("dotenv");
dotenv.config();

router.post("/", async (req, res) => {
  try {
    const isbn = req.body.isbn;
    const username = req.body.username;

    const conn = connectDB;

    conn.then(async (res1) => {
      const res2 = res1.db("SE_Project").collection("booksFinal");
      const query = {};
      query.isbn = new RegExp(`\\b${isbn}\\b`, "i");
      const cursor = res2.find(query);

      const result = await cursor.toArray();
      console.log(result);

      if (!result || result.length === 0) {
        return res.status(401).json({ error: "Book not found!!" });
      }

      const book = result[0];
      book.no_of_bookings += 1;

      if (book.Availability) {
        await res2.updateOne(
          { isbn: isbn },
          {
            $set: {
              Availability: false,
              user_id: username,
              no_of_bookings: book.no_of_bookings,
            },
          }
        );

        console.log("Book reserved successfully");
        return res
          .status(201)
          .json({ success: true, message: "Book reserved successfully!!" });
      } else {
        console.log("Book Not Available");
        return res
          .status(201)
          .json({ success: false, message: "Book Not Available!!" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/unreserve", async (req, res) => {
  try {
    const { isbns, user_id } = req.body;
    const conn = connectDB;

    conn.then(async (res1) => {
      const res2 = res1.db("SE_Project").collection("booksFinal");

      const userBooksQuery = { user_id: user_id, isbn: { $in: isbns } };
      const userBooksCursor = res2.find(userBooksQuery);
      const userBooksResult = await userBooksCursor.toArray();

      if (!userBooksResult || userBooksResult.length === 0) {
        return res.status(401).json({ error: "User ID or Books not found!!" });
      }

      console.log(userBooksResult);

      for (const book of userBooksResult) {
        if (!book.Availability && book.user_id !== "no user_id") {
          await res2.updateOne(
            { isbn: book.isbn },
            {
              $set: {
                Availability: true,
                user_id: "no user_id",
              },
            }
          );
        }
      }

      console.log("Books unreserved successfully");
      return res.status(201).json({
        success: true,
        message: "Books unreserved successfully!!",
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
