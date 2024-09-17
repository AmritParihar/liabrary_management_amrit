const Book = require('../Model/Book');

// Add a book
const addBook = async (req, res) => {
    const { title, author, status } = req.body;
    try {

        const book = await Book.create({ title, author, status });
        res.status(201).json(book);
    } catch (err) {
        console.log("errorAddbook",err)
        res.status(500).json({ message: 'Error adding book' });
    }
};

// Get all books
const getBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching books' });
    }
};

// Update a book
const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, status } = req.body;
    try {
        const book = await Book.findByPk(id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        await book.update({ title, author, status });
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: 'Error updating book' });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByPk(id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        await book.destroy();
        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting book' });
    }
};

module.exports = { addBook, getBooks, updateBook, deleteBook };
