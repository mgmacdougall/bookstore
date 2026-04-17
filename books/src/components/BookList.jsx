import { useState, useEffect } from "react";
import "./BookList.css";

function BookList({ refreshKey }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, [refreshKey]);
  console.log("Books in BookList:", books);
  return (
    <section className="book-list-section">
      <h2>Book List</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>Availability</th>
            </tr>
          </thead>

          <tbody>
            {books.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.year}</td>
                <td>
                  {console.log("Book availability:", b.available)}
                  <span
                    className={`badge ${b.available ? "bg-success" : "bg-secondary"}`}
                  >
                    {b.available ? "Available" : "Checked Out"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default BookList;
