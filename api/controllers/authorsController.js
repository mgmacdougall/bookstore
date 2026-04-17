import { v4 as uuidv4 } from "uuid";
import { db } from "../db.js";

const getAllAuthors = async (req, res) => {
  try {
    await db.read();
    res.json(db.data.authors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch authors" });
  }
};

const getAuthorById = async (req, res) => {
  try {
    await db.read();
    const author = db.data.authors.find((a) => a.id === req.params.id);
    if (!author) return res.status(404).json({ error: "Author not found" });
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch author" });
  }
};

const createAuthor = async (req, res) => {
  try {
    const { name, birth_year, country } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    await db.read();
    const newAuthor = { id: uuidv4(), name, birth_year, country };
    db.data.authors.push(newAuthor);
    await db.write();
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ error: "Failed to create author" });
  }
};

const updateAuthor = async (req, res) => {
  try {
    await db.read();
    const author = db.data.authors.find((a) => a.id === req.params.id);
    if (!author) return res.status(404).json({ error: "Author not found" });

    const { name, birth_year, country } = req.body;
    if (name) author.name = name;
    if (birth_year) author.birth_year = birth_year;
    if (country) author.country = country;

    await db.write();
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: "Failed to update author" });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    await db.read();
    const index = db.data.authors.findIndex((a) => a.id === req.params.id);
    if (index === -1)
      return res.status(404).json({ error: "Author not found" });

    const deletedAuthor = db.data.authors.splice(index, 1);
    await db.write();
    res.json(deletedAuthor[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete author" });
  }
};

export {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
