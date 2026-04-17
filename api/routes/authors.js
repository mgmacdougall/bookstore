import express from "express";
import * as authorsController from "../controllers/authorsController.js";

const router = express.Router();

// Get all authors
router.get("/", authorsController.getAllAuthors);

// Get author by ID
router.get("/:id", authorsController.getAuthorById);

// Create a new author
router.post("/", authorsController.createAuthor);

// Update an author
router.put("/:id", authorsController.updateAuthor);

// Delete an author
router.delete("/:id", authorsController.deleteAuthor);

export default router;
