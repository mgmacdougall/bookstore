import React from "react";
// import { useState } from "react";
import "./LeftNavBarComponent.css";
function LeftNavBarComponent() {
  return (
    // <div className="row">
    <nav
      id="left-navbar"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              Books
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Inventory
            </a>
          </li>
        </ul>
      </div>
    </nav>
    // </div>
  );
}

export default LeftNavBarComponent;
