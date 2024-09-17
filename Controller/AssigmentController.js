const Assignment = require('../Model/assign');
const Book = require('../Model/Book');
const Student = require('../Model/Student');

// Assign a book to a student
const assignBook = async (req, res) => {
    const { studentId, bookId } = req.body;
    try {
        const book = await Book.findByPk(bookId);
        if (!book || book.status !== 'available') {
            return res.status(400).json({ message: 'Book is not available' });
        }
        const assignment = await Assignment.create({ studentId, bookId });
        res.status(201).json(assignment);
    } catch (err) {
        console.log("assignBook: ",err)
        res.status(500).json({ message: 'Error assigning book' });
    }
};

// Return a book
const returnBook = async (req, res) => {
    const { id } = req.params;
    try {
        const assignment = await Assignment.findByPk(id);
        if (!assignment || assignment.status === 'returned') {
            return res.status(404).json({ message: 'Assignment not found or already returned' });
        }
        await assignment.update({ status: 'returned', returnedAt: new Date() });
        const book = await Book.findByPk(assignment.bookId);
        await book.update({ status: 'available' });
        res.json(assignment);
    } catch (err) {
        res.status(500).json({ message: 'Error returning book' });
    }
};

// Get history of a particular book
const getBookHistory = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByPk(id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        const history = await Assignment.findAll({
            where: { bookId: id },
            include: [Student]
        });
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching book history' });
    }
};

module.exports = { assignBook, returnBook, getBookHistory };
