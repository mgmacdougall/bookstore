import { useState } from "react";
import BookList from "../components/BookList";
import AddBookComponent from "../components/AddBookComponent";
import DeleteBookComponent from "../components/DeleteBookComponent";
import UpdateBookComponent from "../components/UpdateBookComponent";
import LeftNavBarComponent from "../components/LeftNavBarComponent";
import "./Admin.css";

function Admin() {
  const [updateKey, setUpdateKey] = useState(0);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);

  const refreshBooks = () => {
    setUpdateKey((prevKey) => prevKey + 1); // Increment the key to trigger re-render
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <LeftNavBarComponent />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="container my-4">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Admin Page</h4>
              </div>

              <section className="card-body">
                <div className="row g-3">
                  <AddBookComponent
                    onBookAdded={refreshBooks}
                    addMode={isAddMode}
                    onToggle={() => setIsAddMode((prev) => !prev)}
                  />
                  <DeleteBookComponent
                    onBookDelete={refreshBooks}
                    deleteMode={isDeleteMode}
                    onToggle={() => setIsDeleteMode((prev) => !prev)}
                  />
                  <UpdateBookComponent
                    onBookUpdate={refreshBooks}
                    updateMode={isUpdateMode}
                    onToggle={() => setIsUpdateMode((prev) => !prev)}
                  />
                  <div>
                    <BookList refreshKey={updateKey} />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Admin;
