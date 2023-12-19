const express =require("express");
var mongoose = require('mongoose');
const connectDB = require("./../models/_db");
const router = express.Router();

router.get('/', async (req, res) => {
    console.log("here in Search");
    try {
        console.log("here in try");
        const searchTerm = req.query.term;
        const selectedField = req.query.field;

        console.log(searchTerm)
       

        const conn = connectDB;
        conn.then((res1)=>{
            
            const res2 = res1.db('SE_Project').collection('booksFinal');
            
            const query = {};

            if (selectedField === 'title') {
                query.title = new RegExp(`\\b${searchTerm}\\b`, 'i');
              } else if (selectedField === 'author') {
                query.authors = new RegExp(`\\b${searchTerm}\\b`, 'i');
              } else if (selectedField === 'all fields') {
                query.$or = [
                  { title: new RegExp(`\\b${searchTerm}\\b`, 'i') },
                  { authors: new RegExp(`\\b${searchTerm}\\b`, 'i') },
                  { isbn: new RegExp(`\\b${searchTerm}\\b`, 'i') },
                ];
              }
            const cursor = res2.find(query);
            const result = cursor.toArray();
            result.then((rest)=>{
                //console.log("setttt")
                // console.log(rest)
                res.status(200).json(rest)
            })
            // return result;
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}); 

router.get('/top-books', async (req, res) => {
    try {
        const conn = connectDB;
        conn.then(async (client) => {
            const db = client.db('SE_Project');
            const collection = db.collection('booksFinal');

            const cursor = collection.find().sort({ no_of_bookings: -1 }).limit(10);

            const result = await cursor.toArray();

            res.status(200).json(result);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/top-searched-books', async (req, res) => {
    try {
        const conn = connectDB;
        conn.then(async (client) => {
            const db = client.db('SE_Project');
            const collection = db.collection('booksFinal');

            const cursor = collection.find().sort({ no_of_searches: -1 }).limit(10);

            const result = await cursor.toArray();

            res.status(200).json(result);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/increment-search/:isbn', async (req, res) => {
    try {
        const isbn = req.params.isbn;

        const conn = connectDB;
        conn.then(async (client) => {
            const db = client.db('SE_Project');
            const collection = db.collection('booksFinal');
            const book = await collection.findOne({ isbn });

            if (!book) {
                return res.status(404).json({ error: 'Book not found' });
            }

            book.no_of_searches += 1;
            await collection.updateOne({ isbn }, { $set: { no_of_searches: book.no_of_searches } });

            res.status(200).json({ message: 'Search count incremented successfully', book });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/increment-search/:isbn', async (req, res) => {
    try {
        const isbn = req.params.isbn;

        const conn = connectDB;
        conn.then(async (client) => {
            const db = client.db('SE_Project');
            const collection = db.collection('booksFinal');

            const book = await collection.findOne({ isbn });

            if (!book) {
                return res.status(404).json({ error: 'Book not found' });
            }

            book.no_of_bookings += 1;
            await collection.updateOne({ isbn }, { $set: { no_of_bookings: book.no_of_bookings } });

            res.status(200).json({ message: 'Search count incremented successfully', book });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/count-books', async (req, res) => {
    try {
      const conn = connectDB;
      conn.then(async (client) => {
        const db = client.db('SE_Project');
        const collection = db.collection('booksFinal');

        const count = await collection.countDocuments();
        const availableBooks = await collection.countDocuments({ Availability: true });
  
        res.status(200).json({ count, availableBooks });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/total-book-reservations', async (req, res) => {
    try {
      const conn = connectDB;
      conn.then(async (client) => {
        const db = client.db('SE_Project');
        const collection = db.collection('booksFinal');
  
        const cursor = collection.find();
        const books = await cursor.toArray();
        const totalBookReservations = books.reduce((total, book) => total + (book.no_of_bookings || 0), 0);
  
        res.status(200).json({ totalBookReservations });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.get('/user-books/:userName', async (req, res) => {
    try {
        const userName = req.params.userName;

        const conn = connectDB;
        conn.then(async (client) => {
            const db = client.db('SE_Project');
            const collection = db.collection('booksFinal');

            const cursor = collection.find({ 'user_id': userName }, { projection: { _id: 0, title: 1, isbn: 1 } })
                                      .sort({ title: 1 });

            const result = await cursor.toArray();

            res.status(200).json(result);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});



module.exports = router;
