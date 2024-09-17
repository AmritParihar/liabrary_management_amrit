const express = require('express');
const router = express.Router();
const authenticate = require('../Middleware/Auth')
const { register, login } = require('../Controller/userController');
const { addBook, getBooks, updateBook, deleteBook } = require('../Controller/BookController');
const { getAllStudents, createStudent, updateStudent, deleteStudent } = require('../Controller/studentController')
const { assignBook, returnBook, getBookHistory } = require('../Controller/AssigmentController');

// User Routes
router.post('/register', register);
router.post('/login', login);

// Book Routes
router.post('/books', authenticate,addBook);
router.get('/getbooks', authenticate,getBooks);
router.put('/books/:id',authenticate, updateBook);
router.delete('/books/:id',authenticate, deleteBook);

// Student Routes
router.post('/students',authenticate,createStudent );
router.get('/students', authenticate,getAllStudents);
router.put('/students/:id',authenticate,updateStudent);
router.delete('/students/:id', authenticate,deleteStudent);

// Assignment Routes
router.post('/assignments',authenticate, assignBook);
router.put('/assignments/:id/return',authenticate,returnBook);
router.get('/books/:id/history',authenticate,getBookHistory);

module.exports = router;
