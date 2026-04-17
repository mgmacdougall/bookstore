import { v4 as uuidv4 } from "uuid";
import { db } from "../db.js";

const getAllBooks = async (req, res) => {
  try {
    await db.read();
    res.json(db.data.books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

const getBookById = async (req, res) => {
  try {
    await db.read();
    const book = db.data.books.find((b) => b.id === req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book" });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author, year, available } = req.body;
    if (!title || !author)
      return res.status(400).json({ error: "Title and author are required" });

    await db.read();
    const newBook = { id: uuidv4(), title, author, year, available };
    console.log(newBook);
    db.data.books.push(newBook);
    await db.write();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to create book" });
  }
};

const updateBook = async (req, res) => {
  console.log("Incoming available:", req.body.available);
  try {
    await db.read();
    const book = db.data.books.find((b) => b.id === req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    const { title, author, year, available } = req.body;
    if (title) book.title = title;
    if (author) book.author = author;
    if (year) book.year = year;
    if (typeof available !== "undefined") {
      book.available = available === true || available === "true";
    }

    await db.write();
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Failed to update book" });
  }
};

const deleteBook = async (req, res) => {
  try {
    await db.read();
    const index = db.data.books.findIndex((b) => b.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Book not found" });

    const deletedBook = db.data.books.splice(index, 1);
    await db.write();
    res.json(deletedBook[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book" });
  }
};

export { getAllBooks, getBookById, createBook, updateBook, deleteBook };
