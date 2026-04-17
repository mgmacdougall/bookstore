import express from "express";
import * as booksController from "../controllers/booksController.js";

const router = express.Router();

// Get all books
router.get("/", booksController.getAllBooks);

// Get book by ID
router.get("/:id", booksController.getBookById);

// Create a new book
router.post("/", booksController.createBook);

// Update a book
router.put("/:id", booksController.updateBook);

// Delete a book
router.delete("/:id", booksController.deleteBook);

export default router;
