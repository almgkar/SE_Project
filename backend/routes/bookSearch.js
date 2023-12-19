const express = require('express');
const router = express.Router();
const Book = require('../models/bookDb');

router.get('/', async (req, res) => {
    try {
        const searchString = req.query.search;
        let query = {};

        if (searchString) {
            query = {
                $or: [
                    { name: { $regex: searchString, $options: 'i' } },
                    { Author: { $regex: searchString, $options: 'i' } }
                ]
            };
        }

        const books = await Book.find(query);
        res.json(books);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new book
router.post('/', async (req, res) => {
    const aNewBook = new Book({
        name: req.body.name,
        Author: req.body.Author,
    });
    try {
        const newBook = await aNewBook.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a book
router.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found." });
        }
        
        await Book.deleteOne({ _id: req.params.id });
        res.json({ message: "Book deleted successfully." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;
