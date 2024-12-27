const Book = require('../models/bookModel');
const { indexBook, updateIndex, deleteIndex } = require('../utils/elasticsearch');

// Create Book
exports.createBook = async (req, res) => {
    try {
        const newBook = await Book.create(req.body);
        console.log("books....", newBook);
        await indexBook(newBook);
        res.status(201).json({ message: "Book added successfully", book: newBook });
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(400).json({ message: error.message });
    }
};


// Get All Books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Book by ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Book
exports.updateBook = async (req, res) => {
    try {
        console.log("edit......")
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).json({ message: "Book not found" });
        await updateIndex(book);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Book
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        await deleteIndex(book._id);
        res.status(200).json({ message: "Book deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
