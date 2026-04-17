import React from "react";
import { useState } from "react";
import "./DeleteBookComponent.css";
function DeleteBookComponent({ onBookDelete, deleteMode, onToggle }) {
  const [formData, setFormData] = useState({
    id: "",
  });

  const handleChange = (e) => {
    console.log("Input changed:", e.target.name, e.target.value);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const bookId = e.target.elements.bookId.value;

    await fetch(`http://localhost:5000/api/books/${bookId}`, {
      method: "DELETE",
    });
    console.log("Book deleted with ID:", bookId);

    setFormData({
      id: "",
    });

    onBookDelete();
  };

  const handdleToggle = () => {
    onToggle();
  };
  return (
    <section className="col-md-3 w-100">
      <div class="mb-4">
        <h2 class="fw-bold text-dark mb-1">Delete Book</h2>
        <p class="text-muted">Search for a book by name and delete it.</p>
        <div className="form-check form-switch d-flex justify-content-between align-items-center">
          <label htmlFor="deleteToggle" className="form-label mb-0">
            Show Delete
          </label>
          <input
            id="deleteToggle"
            onClick={handdleToggle}
            type="checkbox"
            className="form-check-input"
          ></input>
        </div>
      </div>
      {deleteMode && (
        <>
          <form action="DELETE" onSubmit={handleDelete}>
            <div className="col-md-3 mb-3 w-100">
              <label htmlFor="bookId" className="form-label">
                Book ID
              </label>
              <input
                type="text"
                className="form-control"
                id="bookId"
                name="id"
                placeholder="Enter Book ID"
                value={formData.id}
                onChange={handleChange}
              />
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button type="submit" className="btn btn-danger">
                Delete Book
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  );
}

export default DeleteBookComponent;
