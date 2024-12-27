const express = require("express");
const router = express.Router();
const { searchBooks } = require("../controllers/searchController"); // Import searchBooks controller
const { getAllBooks, createBook, updateBook, deleteBook } = require("../controllers/booksController");


// CRUD routes
router.get("/", getAllBooks);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

// Search route
router.get("/search", searchBooks);

module.exports = router;
