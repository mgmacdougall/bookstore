import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, "db.json");
const adapter = new JSONFile(dbPath);
const db = new Low(adapter, { books: [], authors: [] });

// Initialize database with default data
const initDB = async () => {
  await db.read();

  if (!db.data.books.length) {
    db.data = {
      books: [
        {
          id: uuidv4(),
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          year: 1925,
        },
        { id: uuidv4(), title: "1984", author: "George Orwell", year: 1949 },
      ],
      authors: [
        {
          id: uuidv4(),
          name: "F. Scott Fitzgerald",
          birth_year: 1896,
          country: "USA",
        },
        {
          id: uuidv4(),
          name: "George Orwell",
          birth_year: 1903,
          country: "UK",
        },
      ],
    };
    await db.write();
  }
};

export { db, initDB };
