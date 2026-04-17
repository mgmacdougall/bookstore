import { useState } from "react";
import "./UpdateBookComponent.css";
function UpdateBookComponent({ onBookUpdate, updateMode, onToggle }) {
  const [bookId, setBookId] = useState("");
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [available, setAvailable] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleUpdateToggle = () => {
    onToggle();
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/books?title=${searchName}`,
      );
      const data = await response.json();

      if (data.length > 0) {
        const book = data[0];
        setBookId(book.id);
        setBookName(book.title);
        setAuthor(book.author);
        setAvailable(book.available === true || book.available === "true");
        setIsUpdate(true);
      }
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  const handleBookIdChange = (event) => {
    setBookId(event.target.value);
  };

  const handleBookNameChange = (event) => {
    setBookName(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically send the updated book details to your backend
    console.log("Updated Book Details:", {
      id: bookId,
      title: bookName,
      author: author,
      available: available,
    });
    fetch(`http://localhost:5000/api/books/${bookId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: bookId,
        title: bookName,
        author: author,
        available: available,
      }),
    })
      .then((response) => response.json())
      .then((updatedBook) => {
        console.log("Book updated:", updatedBook);
        setSearchName("");
        setBookId("");
        setBookName("");
        setAuthor("");
        setAvailable(false);
        isUpdate(false);
        onBookUpdate();
      })
      .catch((error) => {
        console.error("Error updating book:", error);
      });

    // Call the parent function to refresh the book list
  };

  return (
    <>
      <section className="col-md-3 w-100">
        <div class="mb-4">
          <h2 class="fw-bold text-dark mb-1">Update Book</h2>
          <p class="text-muted">
            Search for a book by name and update its details.
          </p>
          <div className="form-check form-switch d-flex justify-content-between align-items-center">
            <label className="form-label" htmlFor="updateToggle">
              Show Update
            </label>
            <input
              type="checkbox"
              id="updateToggle"
              className="form-check-input mb-0"
              onClick={handleUpdateToggle}
            ></input>
          </div>
        </div>
        {updateMode && (
          <>
            {/* <button onClick={handleUpdateToggle}>Hide Update</button> */}

            <div className="col-md-3 mb-3 w-100">
              {/** Search for a book by ID and update its details **/}
              <input
                className="form-control"
                type="text"
                value={searchName}
                onChange={handleSearchNameChange}
                placeholder="Enter Name"
              />
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button onClick={handleSearch} className="btn btn-primary">
                  Search
                </button>
              </div>
              {/** Edit form  */}
              {isUpdate && (
                <>
                  <div class="mb-4">
                    <h2 class="fw-bold text-dark mb-1">Update Book details</h2>
                    <p class="text-muted">
                      Edit the details for a book by name and update.
                    </p>
                  </div>

                  <form action="" method="get" onSubmit={handleSubmit}>
                    <div className="col-md-3 mb-3 w-100">
                      <label htmlFor="bookId" className="form-label">
                        Book Id
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="bookId"
                        name="bookId"
                        value={bookId}
                        required
                        onChange={handleBookIdChange}
                      />
                    </div>
                    <div className="col-md-3 mb-3 w-100">
                      <label htmlFor="bookName" className="form-label">
                        Book Name
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="bookName"
                        name="bookName"
                        value={bookName}
                        required
                        onChange={handleBookNameChange}
                      />
                    </div>
                    <div className="col-md-3 mb-3 w-100">
                      <label htmlFor="author" className="form-label">
                        Author
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="author"
                        name="author"
                        value={author}
                        required
                        onChange={handleAuthorChange}
                      />
                    </div>
                    <div className="col-md-3 mb-3 w-100">
                      <label htmlFor="available" className="form-label">
                        Available
                      </label>
                      <input
                        className="form-control"
                        type="checkbox"
                        id="available"
                        name="available"
                        checked={available}
                        onChange={(e) => setAvailable(e.target.checked)}
                      />
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button type="submit" className="btn btn-primary">
                        Update Book
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </>
        )}

        {/* </div> */}
      </section>
    </>
  );
}

export default UpdateBookComponent;
