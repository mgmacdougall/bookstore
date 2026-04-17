import { useEffect, useState } from "react";
import "./AddBookComponent.css";

function AddBookComponent({ onBookAdded, addMode, onToggle }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
    available: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = () => {
    onToggle();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setFormData({
      title: "",
      author: "",
      year: "",
      available: true,
    });
    onBookAdded();
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then((response) => response.json())
      .then((data) => console.log("Books fetched:", data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <section className="col-md-3 w-100">
      <div className="form-check form-switch d-flex justify-content-between align-items-center">
        <label className="form-form-label mb-0" htmlFor="addToggle">
          Add Book Form
        </label>
        <input
          className="form-check-input"
          id="addToggle"
          type="checkbox"
          onClick={handleToggle}
        ></input>
      </div>

      {addMode && (
        <>
          <div class="mb-4">
            <h2 class="fw-bold text-dark mb-1">Add Book</h2>
            <p class="text-muted">Add a new book to the library.</p>
          </div>
          <form action="get" onSubmit={handleSubmit}>
            <div className="col-md-3 mb-3 w-100">
              <label htmlFor="title" className="form-label">
                Book Name
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                placeholder="Enter book title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3 w-100 mb-3">
              <label htmlFor="author">Author Name</label>
              <input
                type="text"
                id="author"
                className="form-control"
                name="author"
                value={formData.author}
                placeholder="Enter author name"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3 w-100 mb-3">
              <label htmlFor="year">Book Year</label>
              <input
                type="text"
                id="year"
                className="form-control"
                name="year"
                placeholder="Enter book year"
                value={formData.year}
                onChange={handleChange}
              />
            </div>
            <>
              {formData.title ? (
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <p>{formData.title}</p>
                </div>
              ) : null}
            </>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button type="submit" className="btn btn-primary">
                Add Book
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  );
}

export default AddBookComponent;
